import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        dob: true,
        college: true,
        year: true,
        course: true,
        showStreakPublicly: true,
        showStatsPublicly: true,
        showHeatmapPublicly: true,
        showActivityPublicly: true,
        showSubjectsPublicly: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { 
      username, name, image, dob, college, year, course,
      showStreakPublicly, showStatsPublicly, showHeatmapPublicly, showActivityPublicly, showSubjectsPublicly
    } = data;

    const cleanUsername = username ? username.trim().toLowerCase().replace(/[^a-z0-9_.]/g, '') : undefined;

    // Check if username is taken by another user
    if (cleanUsername) {
      const existing = await prisma.user.findFirst({
        where: {
          username: cleanUsername,
          id: { not: session.user.id },
        },
      });
      if (existing) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        username: cleanUsername,
        image,
        dob,
        college,
        year,
        course,
        showStreakPublicly,
        showStatsPublicly,
        showHeatmapPublicly,
        showActivityPublicly,
        showSubjectsPublicly,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("PUT /api/user/profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
