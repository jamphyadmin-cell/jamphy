import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const { questions } = await req.json();

    const apiKey = req.headers.get("x-api-key");
    const validApiKey = process.env.JAMPHY_API_KEY;
    const isApiKeyValid = apiKey && validApiKey && apiKey === validApiKey;

    const adminCookie = req.cookies.get("admin_session");
    const isCookieAdmin = adminCookie && adminCookie.value === "authenticated";

    const session = await getServerSession(authOptions);
    const isGoogleAdmin = session?.user?.email === "jamphy.admin@gmail.com";

    if (!isGoogleAdmin && !isCookieAdmin && !isApiKeyValid) {
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

    const adminCookie = req.cookies.get("admin_session");
    const isCookieAdmin = adminCookie && adminCookie.value === "authenticated";

    const session = await getServerSession(authOptions);
    const isGoogleAdmin = session?.user?.email === "jamphy.admin@gmail.com";

    if (!isGoogleAdmin && !isCookieAdmin) {
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
