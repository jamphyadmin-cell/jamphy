import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { questions as staticQuestions } from '../../../../data/questions';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbQuestions = await prisma.question.findMany({
      where: { status: 'APPROVED', type: 'MCQ' }
    });
    
    const staticMCQs = staticQuestions.filter(q => q.type === 'MCQ');

    const allQuestions = [...dbQuestions, ...staticMCQs];

    if (!allQuestions || allQuestions.length === 0) {
      return NextResponse.json({ questions: [] });
    }

    // Fisher-Yates Shuffle
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    // Return 10
    const sprintQuestions = allQuestions.slice(0, 10);

    return NextResponse.json({ questions: sprintQuestions });
  } catch (error) {
    console.error("Error generating sprint questions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
