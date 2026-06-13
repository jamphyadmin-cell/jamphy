import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q || q.length < 3) {
      return NextResponse.json({ users: [] });
    }

    // Search users by name case-insensitive
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        image: true,
        currentLeague: true
      },
      take: 10
    });

    let follows = [];
    if (userId) {
      follows = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true }
      });
    }

    const followingSet = new Set(follows.map(f => f.followingId));

    const results = users.map(u => ({
      ...u,
      isFollowing: followingSet.has(u.id),
      isSelf: u.id === userId
    }));

    return NextResponse.json({ users: results });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
