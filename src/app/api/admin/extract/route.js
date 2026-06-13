import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// Initialize Gemini
const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    const { base64Data, mimeType, adminPassword } = await req.json();

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!base64Data || !mimeType) {
      return NextResponse.json({ error: "Missing file data" }, { status: 400 });
    }

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json({ error: "Gemini API key is missing or invalid in the .env file. Please add a valid GEMINI_API_KEY." }, { status: 500 });
    }

    // Clean base64 string if it contains the data url prefix
    const base64Clean = base64Data.replace(/^data:.*?;base64,/, "");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
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
The attached image may be a screenshot or photo of an exam paper containing MULTIPLE questions. 
Carefully scan the ENTIRE image from top to bottom and extract EVERY SINGLE QUESTION you see into the JSON array.
Do NOT stop at the first question. If there are 10 questions on the page, extract all 10.

CRITICAL INSTRUCTIONS:
1. Extract ALL questions from this document. Return every single question you can find as an array of objects.
2. For the "question" and "options" fields, preserve all LaTeX perfectly using \\( ... \\) for inline and \\[ ... \\] for block math.
3. For the "solution" field, extract it from the document ONLY if it is already provided. Do NOT generate new solutions from scratch (leave as null).
4. For "type", use "MCQ" for single choice, "MSQ" for multiple choice, and "NAT" for numerical answer type.
5. Double check that you haven't missed any questions on the page before finishing.
6. Extract the correct answer and put it in 'correctAnswer' (index 0-3), 'correctAnswers' (array of indices), or 'natAnswer' (string). If the answer is already marked in the image (e.g., ticked, circled, or written), use that. Otherwise, try to solve the question yourself and provide the correct answer. If you are completely unable to figure it out, leave it as null.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Clean,
          mimeType
        }
      }
    ]);

    let text = result.response.text().trim();
    
    let questions = [];
    let partial = false;

    try {
      questions = JSON.parse(text);
    } catch (parseError) {
      console.log("JSON parse failed, attempting fallback repair...");
      partial = true;
      try {
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
          questions = JSON.parse(text.substring(firstBracket, lastBracket + 1));
        } else {
           throw new Error("No array brackets found");
        }
      } catch (fallbackError) {
         console.log("Fallback failed. Regex extraction...");
         const matches = text.matchAll(/\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}/g);
         for (const match of matches) {
           try {
             const obj = JSON.parse(match[0]);
             if (obj && typeof obj === 'object') {
               questions.push(obj);
             }
           } catch (e) {
             // ignore invalid matches
           }
         }
      }
    }

    if (questions.length === 0) {
      console.log("0 questions extracted. Raw text:", text.substring(0, 500));
      return NextResponse.json({ 
        questions: [], 
        partial: true, 
        error: "0 questions extracted. Gemini response: " + text.substring(0, 200) 
      }, { status: 200 }); // Status 200 so frontend can read data.error
    }

    console.log(`Successfully extracted ${questions.length} questions. Total response length: ${text.length} characters.`);
    return NextResponse.json({ questions, partial });
  } catch (error) {
    console.error("Gemini Extraction Error:");
    console.error("  Message:", error.message);
    console.error("  Stack:", error.stack);
    console.error("  GEMINI_API_KEY defined:", !!process.env.GEMINI_API_KEY);
    console.error("  VITE_GEMINI_API_KEY defined:", !!process.env.VITE_GEMINI_API_KEY);
    
    return NextResponse.json({ error: "Failed to extract questions: " + error.message }, { status: 500 });
  }
}
