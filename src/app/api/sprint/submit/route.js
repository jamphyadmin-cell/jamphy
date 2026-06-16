import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload, expected array" }, { status: 400 });
    }

    const attemptsData = body.map(attempt => ({
      userId,
      questionId: String(attempt.questionId),
      subject: attempt.subject || "Unknown",
      selectedAnswer: Array.isArray(attempt.selectedAnswer) 
        ? attempt.selectedAnswer.sort().join(',') 
        : String(attempt.selectedAnswer),
      isCorrect: attempt.isCorrect,
      timeTaken: attempt.timeTaken,
    }));

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
