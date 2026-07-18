import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { validateString, validateBoolean, collectErrors } from "@/lib/validation";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vaultItems = await prisma.vault.findMany({
      where: { userId: session.user.id },
      orderBy: { nextReviewDate: 'asc' }
    });

    const dueItems = vaultItems.filter(item => new Date(item.nextReviewDate) <= new Date());

    const questionIds = vaultItems.map(item => item.questionId);
    const dbQuestions = await prisma.question.findMany({
      where: { id: { in: questionIds } }
    });

    return NextResponse.json({ vaultItems, dueItems, questions: dbQuestions });
  } catch (error) {
    console.error("GET /api/vault error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { questionId, isCorrect } = await req.json();

    const error = collectErrors(
      validateString(questionId, 'questionId'),
      validateBoolean(isCorrect, 'isCorrect')
    );
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const userId = session.user.id;

    // Find existing
    const existing = await prisma.vault.findUnique({
      where: {
        userId_questionId: { userId, questionId }
      }
    });

    const now = new Date();
    let newInterval = 1;
    let nextReviewDate = new Date();
    let correctStreak = 0;

    if (existing) {
      if (isCorrect) {
        newInterval = Math.round(existing.reviewInterval * 2.5);
        correctStreak = existing.correctStreak + 1;
      } else {
        newInterval = 1;
        correctStreak = 0;
      }
    } else {
      if (isCorrect) {
        newInterval = 3;
        correctStreak = 1;
      } else {
        newInterval = 0; // 0 means nextReviewDate = today
        correctStreak = 0;
      }
    }

    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

    const upserted = await prisma.vault.upsert({
      where: {
        userId_questionId: { userId, questionId }
      },
      update: {
        reviewInterval: newInterval,
        nextReviewDate,
        lastAttemptedAt: now,
        totalAttempts: existing ? existing.totalAttempts + 1 : 1,
        correctStreak,
      },
      create: {
        userId,
        questionId,
        reviewInterval: newInterval,
        nextReviewDate,
        lastAttemptedAt: now,
        totalAttempts: 1,
        correctStreak,
      }
    });

    return NextResponse.json({ vaultItem: upserted });
  } catch (error) {
    console.error("POST /api/vault error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json({ error: "questionId is required" }, { status: 400 });
    }

    await prisma.vault.delete({
      where: {
        userId_questionId: {
          userId: session.user.id,
          questionId
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/vault error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
