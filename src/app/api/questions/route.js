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

    // Fetch dynamic question counts per year
    const rawYearCounts = await prisma.question.groupBy({
      by: ['year'],
      where: { status: "APPROVED" },
      _count: { id: true }
    });

    // Normalize and aggregate counts by stringified year to handle DB inconsistencies
    const yearCounts = {};
    let totalQuestions = 0;
    rawYearCounts.forEach(group => {
      if (!group.year) return;
      const normalizedYear = String(group.year);
      yearCounts[normalizedYear] = (yearCounts[normalizedYear] || 0) + group._count.id;
      totalQuestions += group._count.id;
    });
    
    // Add 'All' count
    yearCounts['All'] = totalQuestions;

    return NextResponse.json({ questions: formattedQuestions, yearCounts });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
