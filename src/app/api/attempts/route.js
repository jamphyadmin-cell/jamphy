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

    const { questionId, selectedAnswer, isCorrect, timeTaken, subject } = await req.json();

    if (!questionId || selectedAnswer === undefined || typeof isCorrect !== 'boolean' || typeof timeTaken !== 'number') {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const userId = session.user.id;

    // Convert selectedAnswer to string in case it's an array or number
    let formattedAnswer = selectedAnswer;
    if (Array.isArray(selectedAnswer)) {
      formattedAnswer = selectedAnswer.sort().join(',');
    } else {
      formattedAnswer = String(selectedAnswer);
    }

    const attempt = await prisma.attempt.create({
      data: {
        userId,
        questionId: String(questionId),
        subject: subject || "Unknown",
        selectedAnswer: formattedAnswer,
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
