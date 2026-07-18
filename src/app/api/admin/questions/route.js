import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { sanitizeString, validateString, validateNumber, validateBoolean, collectErrors, LIMITS } from '@/lib/validation';

export async function POST(req) {
  try {
    const body = await req.json();

    // Authenticate via x-api-key OR session
    const apiKey = req.headers.get('x-api-key');
    const isValidApiKey = process.env.JAMPHY_API_KEY && apiKey === process.env.JAMPHY_API_KEY;

    if (!isValidApiKey) {
      const session = await getServerSession(authOptions);
      if (!session || session.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Standardize input into an array
    let questions = [];
    let isSingle = false;

    if (body.questions && Array.isArray(body.questions)) {
      questions = body.questions;
    } else if (body.question) {
      questions = [body];
      isSingle = true;
    } else {
      return NextResponse.json({ error: "No questions provided" }, { status: 400 });
    }

    // Process questions
    const validatedQuestions = [];
    const skippedIndices = new Set();

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      // Perform idempotency check
      const prefix = q.question ? q.question.substring(0, 100) : "";
      const existing = await prisma.question.findFirst({
        where: {
          year: String(q.year),
          subject: q.subject,
          question: {
            startsWith: prefix
          }
        }
      });

      if (existing) {
        if (isSingle) {
          return NextResponse.json({ skipped: true });
        }
        skippedIndices.add(i);
        continue;
      }

      const error = collectErrors(
        validateString(q.question, `questions[${i}].question`, { maxLength: LIMITS.CONTENT }),
        validateString(q.subject, `questions[${i}].subject`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.type, `questions[${i}].type`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.year, `questions[${i}].year`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.natAnswer, `questions[${i}].natAnswer`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.solution, `questions[${i}].solution`, { required: false, maxLength: LIMITS.CONTENT })
      );
      if (error) return NextResponse.json({ error }, { status: 400 });

      if (q.options !== undefined && q.options !== null && !Array.isArray(q.options)) {
        return NextResponse.json({ error: `questions[${i}].options must be an array or null` }, { status: 400 });
      }
      if (q.correctAnswers !== undefined && q.correctAnswers !== null && !Array.isArray(q.correctAnswers)) {
        return NextResponse.json({ error: `questions[${i}].correctAnswers must be an array or null` }, { status: 400 });
      }

      const cleanQuestion = sanitizeString(q.question, LIMITS.CONTENT);
      const cleanSubject = q.subject ? sanitizeString(q.subject, LIMITS.SHORT) : "Mixed";
      const cleanType = q.type ? sanitizeString(q.type, LIMITS.SHORT) : "MCQ";
      const cleanYear = q.year ? sanitizeString(String(q.year), LIMITS.SHORT) : String(new Date().getFullYear());
      const cleanOptions = Array.isArray(q.options) ? q.options.map(opt => sanitizeString(String(opt), LIMITS.COMMENT)).filter(Boolean) : [];
      const cleanNatAnswer = q.natAnswer !== undefined && q.natAnswer !== null ? sanitizeString(String(q.natAnswer), LIMITS.SHORT) : null;
      const cleanSolution = q.solution ? sanitizeString(q.solution, LIMITS.CONTENT) : null;

      validatedQuestions.push({
        year: cleanYear,
        subject: cleanSubject,
        type: cleanType,
        question: cleanQuestion,
        options: cleanOptions,
        correctAnswer: q.correctAnswer !== undefined && q.correctAnswer !== null && typeof q.correctAnswer === 'number' ? q.correctAnswer : null,
        correctAnswers: Array.isArray(q.correctAnswers) ? q.correctAnswers.map(Number) : [],
        natAnswer: cleanNatAnswer,
        hasImage: !!q.hasImage,
        solution: cleanSolution,
        status: "APPROVED"
      });
    }

    let createdCount = 0;
    if (validatedQuestions.length > 0) {
      const created = await prisma.question.createMany({
        data: validatedQuestions
      });
      createdCount = created.count;
    }

    if (isSingle) {
      return NextResponse.json({ success: true, count: createdCount });
    }

    return NextResponse.json({
      success: true,
      count: createdCount,
      skipped: skippedIndices.size
    });
  } catch (error) {
    console.error("Error saving questions:", error);
    return NextResponse.json({ error: "Failed to save questions" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
