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

    const userId = session.user.id;
    const body = await req.json();
    
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload, expected array" }, { status: 400 });
    }

    const attemptsData = [];
    for (let i = 0; i < body.length; i++) {
      const attempt = body[i];
      let formattedAnswer = attempt.selectedAnswer;
      if (Array.isArray(attempt.selectedAnswer)) {
        formattedAnswer = attempt.selectedAnswer.sort().join(',');
      } else if (attempt.selectedAnswer !== undefined && attempt.selectedAnswer !== null) {
        formattedAnswer = String(attempt.selectedAnswer);
      }

      const error = collectErrors(
        validateString(attempt.questionId, `item[${i}].questionId`),
        validateString(formattedAnswer, `item[${i}].selectedAnswer`, { maxLength: LIMITS.SHORT }),
        validateBoolean(attempt.isCorrect, `item[${i}].isCorrect`),
        validateNumber(attempt.timeTaken, `item[${i}].timeTaken`),
        validateString(attempt.subject, `item[${i}].subject`, { required: false, maxLength: LIMITS.SHORT })
      );
      if (error) return NextResponse.json({ error }, { status: 400 });

      const cleanSubject = attempt.subject ? sanitizeString(attempt.subject, LIMITS.SHORT) : "Unknown";
      const cleanAnswer = sanitizeString(formattedAnswer, LIMITS.SHORT);

      attemptsData.push({
        userId,
        questionId: String(attempt.questionId),
        subject: cleanSubject,
        selectedAnswer: cleanAnswer,
        isCorrect: attempt.isCorrect,
        timeTaken: attempt.timeTaken,
      });
    }

    await prisma.attempt.createMany({
      data: attemptsData
    });

    // Update Vault for incorrect answers
    const now = new Date();
    for (const attempt of attemptsData) {
      if (!attempt.isCorrect) {
        const existing = await prisma.vault.findUnique({
          where: {
            userId_questionId: { userId, questionId: attempt.questionId }
          }
        });

        const newInterval = 1;
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
        
        await prisma.vault.upsert({
          where: {
            userId_questionId: { userId, questionId: attempt.questionId }
          },
          update: {
            reviewInterval: newInterval,
            nextReviewDate,
            lastAttemptedAt: now,
            totalAttempts: existing ? existing.totalAttempts + 1 : 1,
            correctStreak: 0,
          },
          create: {
            userId,
            questionId: attempt.questionId,
            reviewInterval: newInterval,
            nextReviewDate,
            lastAttemptedAt: now,
            totalAttempts: 1,
            correctStreak: 0,
          }
        });
      }
    }

    return NextResponse.json({ success: true, count: attemptsData.length });
  } catch (error) {
    console.error("Error submitting sprint attempts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
