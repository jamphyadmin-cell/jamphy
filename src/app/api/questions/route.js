import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: 'desc' }
    });
    
    // Format DB questions to match static format if needed
    const formattedQuestions = questions.map(q => ({
      id: q.id,
      year: Number(q.year) || q.year,
      subject: q.subject,
      type: q.type,
      question: q.question,
      options: q.options || [],
      correctAnswer: q.correctAnswer !== null ? Number(q.correctAnswer) : null,
      correctAnswers: q.correctAnswers || [],
      natAnswer: q.natAnswer || null,
      solution: q.solution || null,
      imageUrl: q.imageUrl || null,
    }));

    return NextResponse.json({ questions: formattedQuestions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
