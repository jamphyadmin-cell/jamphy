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

    // 1. Stats row
    const userScore = await prisma.userScore.findUnique({
      where: { userId }
    });

    const totalQuestions = userScore?.questionsAttempted || 0;
    const totalCorrect = userScore?.correctAnswers || 0;
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    const followersCount = await prisma.follow.count({ where: { followingId: userId } });
    const followingCount = await prisma.follow.count({ where: { followerId: userId } });

    // 2. Recent activity
    const recentActivity = await prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // 3. Subject breakdown
    // We can aggregate attempts by subject
    const subjectStats = await prisma.attempt.groupBy({
      by: ['subject'],
      where: { userId },
      _count: { isCorrect: true },
      _sum: {
        timeTaken: true
      }
    });
    
    // We also need correct count per subject
    // prisma groupBy doesn't easily let us filter inside the aggregate, so we fetch all subjects and correct ones
    const correctSubjectStats = await prisma.attempt.groupBy({
      by: ['subject'],
      where: { userId, isCorrect: true },
      _count: { isCorrect: true }
    });

    const breakdown = subjectStats.map(stat => {
      const correctStat = correctSubjectStats.find(s => s.subject === stat.subject);
      const total = stat._count.isCorrect;
      const correct = correctStat ? correctStat._count.isCorrect : 0;
      return {
        subject: stat.subject || "Unknown",
        total,
        correct,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
      };
    });

    // 4. Streak calendar (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const attemptsLast90Days = await prisma.attempt.findMany({
      where: {
        userId,
        createdAt: { gte: ninetyDaysAgo }
      },
      select: { createdAt: true }
    });

    const getISTDateStr = (d) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

    const heatmapMap = {};
    attemptsLast90Days.forEach(a => {
      const d = getISTDateStr(a.createdAt);
      heatmapMap[d] = (heatmapMap[d] || 0) + 1;
    });

    const heatmap = Object.keys(heatmapMap).map(date => ({
      date,
      count: heatmapMap[date]
    })).sort((a,b) => a.date.localeCompare(b.date));

    // Calculate current streak (days)
    let currentStreak = 0;
    const todayStr = getISTDateStr(new Date());
    
    const getPrevDateStr = (dateStr) => {
      const d = new Date(dateStr + "T12:00:00Z");
      d.setUTCDate(d.getUTCDate() - 1);
      return d.toISOString().split('T')[0];
    };

    let checkDateStr = todayStr;
    if (heatmapMap[checkDateStr]) {
      currentStreak = 1;
      checkDateStr = getPrevDateStr(checkDateStr);
    } else {
      checkDateStr = getPrevDateStr(todayStr);
      if (heatmapMap[checkDateStr]) {
        currentStreak = 1;
        checkDateStr = getPrevDateStr(checkDateStr);
      }
    }

    while (currentStreak > 0 && heatmapMap[checkDateStr]) {
      currentStreak++;
      checkDateStr = getPrevDateStr(checkDateStr);
    }

    return NextResponse.json({
      stats: {
        totalQuestions,
        totalCorrect,
        accuracy,
        currentStreak,
        followersCount,
        followingCount
      },
      breakdown,
      heatmap,
      recentActivity
    });

  } catch (error) {
    console.error("Error fetching profile stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
