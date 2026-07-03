import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    
    // Get all attempts for the user
    const attempts = await prisma.attempt.findMany({
      where: { userId },
      select: { questionId: true, subject: true, createdAt: true }
    });

    // Create a Set of attempted question IDs
    const attemptedIds = [...new Set(attempts.map(a => a.questionId))];

    // Find subjects practiced today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayAttempts = attempts.filter(a => new Date(a.createdAt) >= today);
    const todaySubjects = [...new Set(todayAttempts.map(a => a.subject))];

    return NextResponse.json({ 
      attemptedIds,
      todaySubjects 
    });
  } catch (error) {
    console.error("Error fetching attempt stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
