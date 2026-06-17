import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const resolvedParams = await params;
    const targetUserId = resolvedParams.id;
    const currentUserId = session?.user?.id;

    if (!targetUserId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // Fetch the target user's followers
    const followersData = await prisma.follow.findMany({
      where: { followingId: targetUserId },
      include: {
        follower: {
          select: { id: true, name: true, username: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Fetch who the target user is following
    const followingData = await prisma.follow.findMany({
      where: { followerId: targetUserId },
      include: {
        following: {
          select: { id: true, name: true, username: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // We need a list of IDs the current user is following to check status
    let currentUserFollowingIds = new Set();
    if (currentUserId) {
      const currentUserFollowing = await prisma.follow.findMany({
        where: { followerId: currentUserId },
        select: { followingId: true }
      });
      currentUserFollowing.forEach(f => currentUserFollowingIds.add(f.followingId));
    }

    const mapUser = (u) => ({
      ...u,
      isFollowing: currentUserFollowingIds.has(u.id)
    });

    const followers = followersData.map(f => mapUser(f.follower));
    const following = followingData.map(f => mapUser(f.following));

    return NextResponse.json({ followers, following });
  } catch (error) {
    console.error("GET /api/user/[id]/network error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
