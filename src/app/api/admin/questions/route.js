import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { sanitizeString, validateString, validateNumber, validateBoolean, collectErrors, LIMITS } from '@/lib/validation';

export async function POST(req) {
  try {
    const { questions } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "No questions provided" }, { status: 400 });
    }

    const validatedQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const error = collectErrors(
        validateString(q.question, `questions[${i}].question`, { maxLength: LIMITS.CONTENT }),
        validateString(q.subject, `questions[${i}].subject`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.type, `questions[${i}].type`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.year, `questions[${i}].year`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.natAnswer, `questions[${i}].natAnswer`, { required: false, maxLength: LIMITS.SHORT }),
        validateString(q.solution, `questions[${i}].solution`, { required: false, maxLength: LIMITS.CONTENT })
      );
      if (error) return NextResponse.json({ error }, { status: 400 });

      if (q.options !== undefined && !Array.isArray(q.options)) {
        return NextResponse.json({ error: `questions[${i}].options must be an array` }, { status: 400 });
      }
      if (q.correctAnswers !== undefined && !Array.isArray(q.correctAnswers)) {
        return NextResponse.json({ error: `questions[${i}].correctAnswers must be an array` }, { status: 400 });
      }

      const cleanQuestion = sanitizeString(q.question, LIMITS.CONTENT);
      const cleanSubject = q.subject ? sanitizeString(q.subject, LIMITS.SHORT) : "Mixed";
      const cleanType = q.type ? sanitizeString(q.type, LIMITS.SHORT) : "MCQ";
      const cleanYear = q.year ? sanitizeString(q.year, LIMITS.SHORT) : String(new Date().getFullYear());
      const cleanOptions = Array.isArray(q.options) ? q.options.map(opt => sanitizeString(String(opt), LIMITS.COMMENT)).filter(Boolean) : [];
      const cleanNatAnswer = q.natAnswer !== undefined ? sanitizeString(String(q.natAnswer), LIMITS.SHORT) : null;
      const cleanSolution = q.solution ? sanitizeString(q.solution, LIMITS.CONTENT) : null;

      validatedQuestions.push({
        year: cleanYear,
        subject: cleanSubject,
        type: cleanType,
        question: cleanQuestion,
        options: cleanOptions,
        correctAnswer: q.correctAnswer !== undefined && typeof q.correctAnswer === 'number' ? q.correctAnswer : null,
        correctAnswers: Array.isArray(q.correctAnswers) ? q.correctAnswers.map(Number) : [],
        natAnswer: cleanNatAnswer,
        hasImage: !!q.hasImage,
        solution: cleanSolution,
        status: "APPROVED"
      });
    }

    // Save to DB
    const created = await prisma.question.createMany({
      data: validatedQuestions
    });

    return NextResponse.json({ success: true, count: created.count });
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
