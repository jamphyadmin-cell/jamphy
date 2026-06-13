import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const { questions, adminPassword } = await req.json();

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "No questions provided" }, { status: 400 });
    }

    // Save to DB
    const created = await prisma.question.createMany({
      data: questions.map(q => ({
        year: String(q.year || new Date().getFullYear()),
        subject: q.subject || "Mixed",
        type: q.type || "MCQ",
        question: q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : null,
        correctAnswers: q.correctAnswers || [],
        natAnswer: q.natAnswer !== undefined ? String(q.natAnswer) : null,
        hasImage: !!q.hasImage,
        solution: q.solution || null,
        status: "APPROVED"
      }))
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
    const adminPassword = searchParams.get('adminPassword');

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
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
