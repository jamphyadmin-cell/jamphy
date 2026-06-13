import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Must be logged in" }, { status: 401 });
    }

    const userId = session.user.id;

    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            image: true,
            currentLeague: true,
            userScore: true,
            attempts: {
              where: {
                createdAt: {
                  gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
              }
            }
          }
        }
      }
    });

    // Process stats for each friend
    const friendsStats = following.map(f => {
      const u = f.following;
      
      const todayAttempts = u.attempts || [];
      const todayTotal = todayAttempts.length;
      const todayCorrect = todayAttempts.filter(a => a.isCorrect).length;
      const accuracy = todayTotal > 0 ? Math.round((todayCorrect / todayTotal) * 100) : 0;
      
      return {
        id: u.id,
        name: u.name,
        image: u.image,
        league: u.currentLeague,
        streak: u.userScore?.currentStreak || 0,
        todayTotal,
        accuracy
      };
    });

    // Sort by most active today (todayTotal), then by streak
    friendsStats.sort((a, b) => {
      if (b.todayTotal !== a.todayTotal) return b.todayTotal - a.todayTotal;
      return b.streak - a.streak;
    });

    return NextResponse.json({ friends: friendsStats });

  } catch (error) {
    console.error("Friends API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
