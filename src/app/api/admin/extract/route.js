import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// Initialize Gemini
const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const maxDuration = 60; // Set max duration for Vercel just in case

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
    const base64Data = buffer.toString("base64");

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
              question: { type: SchemaType.STRING, description: "The question text, preserving all LaTeX perfectly using \\( ... \\) for inline and \\[ ... \\] for block math. ALWAYS wrap math variables in \\( \\)." },
              options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, nullable: true, description: "Array of exactly 4 strings for MCQ/MSQ, or null if type is NAT. Preserve LaTeX in options." },
              correctAnswer: { type: SchemaType.INTEGER, nullable: true, description: "0-3 for MCQ representing option A,B,C,D. Or null" },
              correctAnswers: { type: SchemaType.ARRAY, items: { type: SchemaType.INTEGER }, nullable: true, description: "Array of integers (0-3) for MSQ, or null" },
              natAnswer: { type: SchemaType.STRING, nullable: true, description: "NAT numerical answer as string, or null" },
              hasImage: { type: SchemaType.BOOLEAN, description: "true if the question refers to a diagram, figure, or graph" },
              solution: { type: SchemaType.STRING, nullable: true, description: "detailed step-by-step solution if provided in the document" },
            },
            required: ["year", "subject", "type", "question", "hasImage"]
          }
        }
      }
    });

    const prompt = `
You are an expert at extracting physics and math questions from exam papers.
The attached document is an exam paper containing multiple questions.
Carefully scan the ENTIRE document from start to finish and extract EVERY SINGLE QUESTION you see into the JSON array.
If there are 60 questions in the document, extract all 60. DO NOT SKIP ANY QUESTIONS.

CRITICAL INSTRUCTIONS:
1. Extract ALL questions from the document.
2. For the "question" and "options" fields, preserve all LaTeX perfectly. Use \\( ... \\) for inline math and \\[ ... \\] for block math. Do NOT use $ or $$.
3. For the "solution" field, extract it from the document ONLY if it is already provided. Do NOT generate new solutions from scratch (leave as null).
4. For "type", use "MCQ" for single choice, "MSQ" for multiple choice, and "NAT" for numerical answer type.
5. If the correct answer is marked or obvious, extract it. Otherwise leave null.
`;

    console.log(`Sending ${mimeType} file to Gemini for extraction...`);
    
    let allQuestions = [];
    let isPartial = false;

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

      const text = result.response.text().trim();
      
      try {
        allQuestions = JSON.parse(text);
      } catch (parseError) {
        console.log("JSON parse failed, attempting fallback repair...");
        isPartial = true;
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
          allQuestions = JSON.parse(text.substring(firstBracket, lastBracket + 1));
        } else {
          throw new Error("Failed to parse JSON array from response.");
        }
      }
    } catch (err) {
      console.error(`Gemini generation failed:`, err.message);
      return NextResponse.json({ error: "Extraction failed: " + err.message }, { status: 500 });
    }

    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      return NextResponse.json({ 
        questions: [], 
        partial: true, 
        error: "0 questions extracted. Please verify the document content." 
      }, { status: 200 });
    }

    console.log(`Successfully extracted ${allQuestions.length} questions.`);
    return NextResponse.json({ questions: allQuestions, partial: isPartial });
  } catch (error) {
    console.error("Extraction API Error:", error.message);
    return NextResponse.json({ error: "Failed to extract questions: " + error.message }, { status: 500 });
  }
}
