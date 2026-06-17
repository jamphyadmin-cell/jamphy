import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const resolvedParams = await params;
    const targetUserId = resolvedParams.id;

    if (!targetUserId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        name: true,
        image: true,
        showStreakPublicly: true,
        showStatsPublicly: true,
        showHeatmapPublicly: true,
        showActivityPublicly: true,
        showSubjectsPublicly: true,
        _count: {
          select: {
            followers: true,
            following: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let isFollowing = false;
    if (session?.user?.id) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: targetUserId
          }
        }
      });
      isFollowing = !!follow;
    }

    // Initialize return stats with default public counts
    const stats = {
      followersCount: user._count.followers,
      followingCount: user._count.following,
    };

    // 1. Stats row (questions, correct, accuracy)
    if (user.showStatsPublicly) {
      const totalQuestions = await prisma.attempt.count({ where: { userId: targetUserId }});
      const totalCorrect = await prisma.attempt.count({ where: { userId: targetUserId, isCorrect: true }});
      const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      
      stats.totalQuestions = totalQuestions;
      stats.totalCorrect = totalCorrect;
      stats.accuracy = accuracy;
    }

    // 2. Heatmap & Streak
    let heatmap = [];
    if (user.showHeatmapPublicly || user.showStreakPublicly) {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const attemptsLast90Days = await prisma.attempt.findMany({
        where: {
          userId: targetUserId,
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

      if (user.showHeatmapPublicly) {
        heatmap = Object.keys(heatmapMap).map(date => ({
          date,
          count: heatmapMap[date]
        })).sort((a,b) => a.date.localeCompare(b.date));
      }

      if (user.showStreakPublicly) {
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
        
        stats.currentStreak = currentStreak;
      }
    }

    // 3. Subject accuracy breakdown
    let breakdown = [];
    if (user.showSubjectsPublicly) {
      const subjectStats = await prisma.attempt.groupBy({
        by: ['subject'],
        where: { userId: targetUserId },
        _count: { isCorrect: true }
      });
      
      const correctSubjectStats = await prisma.attempt.groupBy({
        by: ['subject'],
        where: { userId: targetUserId, isCorrect: true },
        _count: { isCorrect: true }
      });

      breakdown = subjectStats.map(stat => {
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
    }

    // 4. Recent activity
    let recentActivity = [];
    if (user.showActivityPublicly) {
      recentActivity = await prisma.attempt.findMany({
        where: { userId: targetUserId },
        orderBy: { createdAt: 'desc' },
        take: 10
      });
    }

    return NextResponse.json({
      user,
      isFollowing,
      stats,
      heatmap,
      breakdown,
      recentActivity
    });

  } catch (error) {
    console.error("Public Profile API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
