import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    
    // Thirty days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const attempts = await prisma.attempt.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    if (attempts.length === 0) {
      return NextResponse.json({
        totalAttempts: 0,
        totalCorrect: 0,
        avgTimeTaken: 0,
        dailyAccuracy: [],
        subjectAccuracy: [],
        streak: 0,
        weakTopics: []
      });
    }

    const totalAttempts = attempts.length;
    const totalCorrect = attempts.filter(a => a.isCorrect).length;
    
    // Average Time Taken (exclude 0s from tests)
    const times = attempts.map(a => a.timeTaken).filter(t => t > 0);
    const avgTimeTaken = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

    // Daily Accuracy (last 30 days)
    const dailyMap = new Map();
    // Pre-fill last 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyMap.set(dateStr, { total: 0, correct: 0 });
    }

    attempts.forEach(a => {
      if (a.createdAt >= thirtyDaysAgo) {
        const dateStr = a.createdAt.toISOString().split('T')[0];
        if (dailyMap.has(dateStr)) {
          const stats = dailyMap.get(dateStr);
          stats.total++;
          if (a.isCorrect) stats.correct++;
        }
      }
    });

    const dailyAccuracy = Array.from(dailyMap.entries()).map(([date, stats]) => {
      // Format date nicely like "May 23"
      const d = new Date(date);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        date: label,
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
      };
    });

    // Subject Accuracy
    const subjectMap = new Map();
    attempts.forEach(a => {
      if (!subjectMap.has(a.subject)) {
        subjectMap.set(a.subject, { total: 0, correct: 0 });
      }
      const stats = subjectMap.get(a.subject);
      stats.total++;
      if (a.isCorrect) stats.correct++;
    });

    const subjectAccuracy = Array.from(subjectMap.entries()).map(([subject, stats]) => ({
      subject,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      totalAttempts: stats.total
    }));

    // Weak Topics (bottom 3 by accuracy with at least 5 attempts)
    const weakTopics = [...subjectAccuracy]
      .filter(s => s.totalAttempts >= 5)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3)
      .map(s => s.subject);

    // If no topics with >= 5 attempts, just take lowest
    if (weakTopics.length === 0) {
      weakTopics.push(...[...subjectAccuracy].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map(s => s.subject));
    }

    // Streak tracker
    let streak = 0;
    const getISTDateStr = (d) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    
    const uniqueDays = new Set(attempts.map(a => getISTDateStr(a.createdAt)));
    const todayStr = getISTDateStr(new Date());
    
    const getPrevDateStr = (dateStr) => {
      const d = new Date(dateStr + "T12:00:00Z");
      d.setUTCDate(d.getUTCDate() - 1);
      return d.toISOString().split('T')[0];
    };

    let checkDateStr = todayStr;
    if (uniqueDays.has(checkDateStr)) {
      streak = 1;
      checkDateStr = getPrevDateStr(checkDateStr);
    } else {
      checkDateStr = getPrevDateStr(todayStr);
      if (uniqueDays.has(checkDateStr)) {
        streak = 1;
        checkDateStr = getPrevDateStr(checkDateStr);
      }
    }

    while (streak > 0 && uniqueDays.has(checkDateStr)) {
      streak++;
      checkDateStr = getPrevDateStr(checkDateStr);
    }

    return NextResponse.json({
      totalAttempts,
      totalCorrect,
      avgTimeTaken,
      dailyAccuracy,
      subjectAccuracy,
      streak,
      weakTopics: [...new Set(weakTopics)]
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
