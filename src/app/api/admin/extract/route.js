import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { PDFDocument } from 'pdf-lib';

// Initialize Gemini
const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const adminPassword = formData.get("adminPassword");

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "Missing file data" }, { status: 400 });
    }

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json({ error: "Gemini API key is missing or invalid in the .env file. Please add a valid GEMINI_API_KEY." }, { status: 500 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || "application/pdf";

    let base64Files = [];

    // Split PDF into individual pages so we don't hit token truncation limits
    if (mimeType === 'application/pdf') {
      try {
        const pdfDoc = await PDFDocument.load(buffer);
        const pageCount = pdfDoc.getPageCount();
        console.log(`PDF has ${pageCount} pages. Splitting into individual pages...`);
        
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(page);
          const newPdfBytes = await newPdf.save();
          base64Files.push(Buffer.from(newPdfBytes).toString("base64"));
        }
      } catch (pdfError) {
        console.error("Error splitting PDF:", pdfError);
        base64Files.push(buffer.toString("base64"));
      }
    } else {
      base64Files.push(buffer.toString("base64"));
    }

    // Using gemini-1.5-pro for much smarter/better reasoning on complex physics
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              year: { type: SchemaType.STRING, description: "e.g. 2024" },
              subject: { type: SchemaType.STRING, description: "e.g., Mechanics, Electromagnetism, Mathematical Methods, etc." },
              type: { type: SchemaType.STRING, enum: ["MCQ", "MSQ", "NAT"] },
              question: { type: SchemaType.STRING, description: "The question text, preserving all LaTeX perfectly using \\( ... \\) for inline and \\[ ... \\] for block math" },
              options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true, description: "Array of 4 strings, or null if type is NAT. Preserve LaTeX in options." },
              correctAnswer: { type: SchemaType.INTEGER, nullable: true, description: "0-3 for MCQ, or null" },
              correctAnswers: { type: SchemaType.ARRAY, items: { type: SchemaType.INTEGER }, nullable: true, description: "Array of integers for MSQ, or null" },
              natAnswer: { type: SchemaType.STRING, nullable: true, description: "NAT answer, or null" },
              hasImage: { type: SchemaType.BOOLEAN, description: "true if the question refers to a diagram or figure" },
              solution: { type: SchemaType.STRING, nullable: true, description: "detailed step-by-step solution if provided in the document" },
            },
            required: ["year", "subject", "type", "question", "hasImage"]
          }
        }
      }
    });

    const prompt = `
You are an expert at extracting physics and math questions from exam papers.
The attached document is ONE PAGE of an exam paper.
Carefully scan the ENTIRE image from top to bottom and extract EVERY SINGLE QUESTION you see into the JSON array.
If there are 10 questions on the page, extract all 10.

CRITICAL INSTRUCTIONS:
1. Extract ALL questions from this page. 
2. For the "question" and "options" fields, preserve all LaTeX perfectly using \\( ... \\) for inline and \\[ ... \\] for block math.
3. For the "solution" field, extract it from the document ONLY if it is already provided. Do NOT generate new solutions from scratch (leave as null).
4. For "type", use "MCQ" for single choice, "MSQ" for multiple choice, and "NAT" for numerical answer type.
5. Extract the correct answer if available, or try to solve it if simple. Otherwise leave null.
`;

    let allQuestions = [];
    let isPartial = false;

    // Process all pages concurrently
    const extractionPromises = base64Files.map(async (base64Data, index) => {
      try {
        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType
            }
          }
        ]);

        let text = result.response.text().trim();
        let pageQuestions = [];

        try {
          pageQuestions = JSON.parse(text);
        } catch (parseError) {
          console.log(`Page ${index + 1} JSON parse failed, attempting fallback repair...`);
          isPartial = true;
          try {
            const firstBracket = text.indexOf('[');
            const lastBracket = text.lastIndexOf(']');
            if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
              pageQuestions = JSON.parse(text.substring(firstBracket, lastBracket + 1));
            } else {
               throw new Error("No array brackets found");
            }
          } catch (fallbackError) {
             console.log(`Page ${index + 1} Fallback failed. Regex extraction...`);
             let bracketDepth = 0;
             let currentObj = "";
             let inString = false;
             let escapeNext = false;
             
             for (let i = 0; i < text.length; i++) {
               const char = text[i];
               if (escapeNext) {
                 currentObj += char;
                 escapeNext = false;
                 continue;
               }
               if (char === '"' && !escapeNext) {
                 inString = !inString;
               }
               if (char === '\\') {
                 escapeNext = true;
               }
               
               if (!inString) {
                 if (char === '{') bracketDepth++;
                 else if (char === '}') bracketDepth--;
               }
               
               if (bracketDepth > 0 || (char === '}' && bracketDepth === 0 && currentObj.length > 0)) {
                 currentObj += char;
                 if (bracketDepth === 0) {
                   try {
                     const parsed = JSON.parse(currentObj);
                     if (parsed && typeof parsed === 'object') {
                       pageQuestions.push(parsed);
                     }
                   } catch(e) {}
                   currentObj = "";
                 }
               }
             }
          }
        }
        return pageQuestions;
      } catch (err) {
        console.error(`Page ${index + 1} extraction failed:`, err.message);
        isPartial = true;
        return [];
      }
    });

    const results = await Promise.all(extractionPromises);
    results.forEach(pageQuestions => {
       allQuestions.push(...pageQuestions);
    });

    if (allQuestions.length === 0) {
      return NextResponse.json({ 
        questions: [], 
        partial: true, 
        error: "0 questions extracted across all pages. Please verify the document content." 
      }, { status: 200 });
    }

    console.log(`Successfully extracted ${allQuestions.length} questions from ${base64Files.length} pages.`);
    return NextResponse.json({ questions: allQuestions, partial: isPartial });
  } catch (error) {
    console.error("Gemini Extraction Error:");
    console.error("  Message:", error.message);
    console.error("  Stack:", error.stack);
    console.error("  GEMINI_API_KEY defined:", !!process.env.GEMINI_API_KEY);
    console.error("  VITE_GEMINI_API_KEY defined:", !!process.env.VITE_GEMINI_API_KEY);
    
    return NextResponse.json({ error: "Failed to extract questions: " + error.message }, { status: 500 });
  }
}
