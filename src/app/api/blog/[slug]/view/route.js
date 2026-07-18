import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const updated = await prisma.post.update({
      where: { slug },
      data: {
        views: { increment: 1 }
      },
      select: { views: true }
    });

    return NextResponse.json({ success: true, views: updated.views });
  } catch (error) {
    console.error("Error updating views:", error);
    // Even if it fails, we don't want to break the client, just return 200 or 500 quietly
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
