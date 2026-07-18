import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { validateString, collectErrors } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

// Initialize Gemini
const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    const { base64Data, mimeType } = await req.json();

    const error = collectErrors(
      validateString(base64Data, 'base64Data'),
      validateString(mimeType, 'mimeType')
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    // Validate size (10MB limit = ~13.7M base64 chars)
    if (base64Data.length > 15000000) {
      return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitKey = `extract_${session.user.id}`;
    const { allowed, retryAfter } = rateLimit(rateLimitKey, 5, 60000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'Content-Type': 'application/json'
        }
      });
    }



    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json({ error: "Gemini API key is missing or invalid in the .env file. Please add a valid GEMINI_API_KEY." }, { status: 500 });
    }

    // Clean base64 string if it contains the data url prefix
    const base64Clean = base64Data.replace(/^data:.*?;base64,/, "");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            totalQuestionsFound: { type: SchemaType.INTEGER, description: "First, count the total number of questions across ALL pages in the document." },
            questions: {
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
          },
          required: ["totalQuestionsFound", "questions"]
        }
      }
    });

    const prompt = `
You are an expert at extracting physics and math questions from exam papers.
The attached file is a MULTI-PAGE PDF containing MULTIPLE questions. 
Carefully scan EVERY SINGLE PAGE from start to finish and extract EVERY SINGLE QUESTION you see into the JSON array.
Do NOT stop at the first question. If there are 10 questions across the pages, you must extract all 10.

CRITICAL INSTRUCTIONS:
1. Extract ALL questions from EVERY PAGE of this document. 
2. For the "question" and "options" fields, preserve all LaTeX perfectly using \\( ... \\) for inline and \\[ ... \\] for block math.
3. For the "solution" field, extract it from the document ONLY if it is already provided. Do NOT generate new solutions from scratch (leave as null).
4. For "type", use "MCQ" for single choice, "MSQ" for multiple choice, and "NAT" for numerical answer type.
5. You must output the total questions found, and then provide the full array of all questions.
6. Extract the correct answer and put it in 'correctAnswer' (index 0-3), 'correctAnswers' (array of indices), or 'natAnswer' (string). If the answer is already marked, use that. Otherwise, try to solve the question yourself and provide the correct answer. If you are completely unable to figure it out, leave it as null.
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
      const parsed = JSON.parse(text);
      if (parsed && parsed.questions && Array.isArray(parsed.questions)) {
        questions = parsed.questions;
      } else if (Array.isArray(parsed)) {
        questions = parsed;
      } else {
        throw new Error("Invalid schema");
      }
    } catch (parseError) {
      console.log("JSON parse failed, attempting fallback repair...");
      partial = true;
      try {
        const matches = text.matchAll(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
        for (const match of matches) {
          try {
            const obj = JSON.parse(match[0]);
            if (obj.question && obj.year) {
              questions.push(obj);
            } else if (obj.questions && Array.isArray(obj.questions)) {
              questions.push(...obj.questions);
            }
          } catch (e) {
            continue;
          }
        }
      } catch (e) {
        console.error("Fallback repair failed:", e);
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
