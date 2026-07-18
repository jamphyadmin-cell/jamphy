import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // Authenticate via x-api-key OR session
    const apiKey = req.headers.get('x-api-key');
    const isValidApiKey = process.env.JAMPHY_API_KEY && apiKey === process.env.JAMPHY_API_KEY;

    if (!isValidApiKey) {
      const session = await getServerSession(authOptions);
      if (!session || session.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const now = new Date();
    const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const past7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Queries
    const totalQuestions = await prisma.question.count();
    
    const addedLast24h = await prisma.question.count({
      where: {
        createdAt: {
          gte: past24h
        }
      }
    });

    const addedLast7d = await prisma.question.count({
      where: {
        createdAt: {
          gte: past7d
        }
      }
    });

    // Breakdown by subject
    const subjectBreakdown = await prisma.question.groupBy({
      by: ['subject'],
      _count: {
        id: true
      }
    });

    // Breakdown by year
    const yearBreakdown = await prisma.question.groupBy({
      by: ['year'],
      _count: {
        id: true
      }
    });

    const breakdownBySubject = {};
    subjectBreakdown.forEach(item => {
      breakdownBySubject[item.subject || 'Unknown'] = item._count.id;
    });

    const breakdownByYear = {};
    yearBreakdown.forEach(item => {
      breakdownByYear[item.year || 'Unknown'] = item._count.id;
    });

    return NextResponse.json({
      totalQuestions,
      addedLast24h,
      addedLast7d,
      breakdown: {
        bySubject: breakdownBySubject,
        byYear: breakdownByYear
      }
    });
  } catch (error) {
    console.error("Error fetching pipeline status:", error);
    return NextResponse.json({ error: "Failed to fetch pipeline status" }, { status: 500 });
  }
}
