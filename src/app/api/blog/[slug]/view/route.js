import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    await prisma.post.update({
      where: { slug },
      data: {
        views: { increment: 1 }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating views:", error);
    // Even if it fails, we don't want to break the client, just return 200 or 500 quietly
    return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
  }
}
