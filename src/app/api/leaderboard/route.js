import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const { searchParams } = new URL(req.url);
    const time = searchParams.get('time') || 'weekly'; // 'weekly' or 'allTime'
    const league = searchParams.get('league') || 'All'; // 'All', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'

    const orderByField = time === 'weekly' ? 'weeklyPoints' : 'allTimePoints';
    
    let where = {};
    if (league === 'Following') {
      if (!userId) {
        return NextResponse.json({ error: "Must be logged in" }, { status: 401 });
      }
      const follows = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true }
      });
      const followingIds = follows.map(f => f.followingId);
      followingIds.push(userId); // include self in the following leaderboard
      where.userId = { in: followingIds };
    } else if (league !== 'All') {
      where.currentLeague = league;
    }

    const topUsers = await prisma.userScore.findMany({
      where,
      orderBy: { [orderByField]: 'desc' },
      take: 50,
      include: {
        user: {
          select: { name: true, image: true, username: true }
        }
      }
    });

    // Fetch the list of users the current user follows so UI knows who is followed
    let myFollows = [];
    if (userId) {
      const follows = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true }
      });
      myFollows = follows.map(f => f.followingId);
    }

    let currentUserRank = null;
    let currentUserScore = null;

    if (userId) {
      currentUserScore = await prisma.userScore.findUnique({
        where: { userId },
        include: {
          user: {
            select: { name: true, image: true, username: true }
          }
        }
      });

      if (currentUserScore) {
        // Find rank
        const higherScoresCount = await prisma.userScore.count({
          where: {
            ...where,
            [orderByField]: { gt: currentUserScore[orderByField] }
          }
        });
        currentUserRank = higherScoresCount + 1;
      }
    }

    return NextResponse.json({
      leaderboard: topUsers,
      myFollows,
      currentUser: currentUserScore ? {
        ...currentUserScore,
        rank: currentUserRank
      } : null
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
