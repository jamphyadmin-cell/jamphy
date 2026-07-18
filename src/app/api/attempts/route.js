import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { sanitizeString, validateString, validateNumber, validateBoolean, collectErrors, LIMITS } from '@/lib/validation';
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { allowed, retryAfter } = rateLimit(`attempts_${session.user.id}`, 120, 60000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Too many attempts. Please try again later." }), {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'Content-Type': 'application/json'
        }
      });
    }

    const { questionId, selectedAnswer, isCorrect, timeTaken, subject } = await req.json();

    // Convert selectedAnswer to string first in case it's an array or number
    let formattedAnswer = selectedAnswer;
    if (Array.isArray(selectedAnswer)) {
      formattedAnswer = selectedAnswer.sort().join(',');
    } else if (selectedAnswer !== undefined && selectedAnswer !== null) {
      formattedAnswer = String(selectedAnswer);
    }

    const error = collectErrors(
      validateString(questionId, 'questionId'),
      validateString(formattedAnswer, 'selectedAnswer', { maxLength: LIMITS.SHORT }),
      validateBoolean(isCorrect, 'isCorrect'),
      validateNumber(timeTaken, 'timeTaken'),
      validateString(subject, 'subject', { required: false, maxLength: LIMITS.SHORT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const cleanSubject = subject ? sanitizeString(subject, LIMITS.SHORT) : "Unknown";
    const cleanAnswer = sanitizeString(formattedAnswer, LIMITS.SHORT);

    const userId = session.user.id;



    const attempt = await prisma.attempt.create({
      data: {
        userId,
        questionId: String(questionId),
        subject: cleanSubject,
        selectedAnswer: cleanAnswer,
        isCorrect,
        timeTaken,
      }
    });

    console.log("Successfully saved attempt to database for user:", userId, "Question ID:", questionId);

    return NextResponse.json({ success: true, attemptId: attempt.id });
  } catch (error) {
    console.error("Error logging attempt:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
