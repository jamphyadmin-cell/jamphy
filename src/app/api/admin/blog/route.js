import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { validateString, collectErrors, LIMITS } from '@/lib/validation';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching admin blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch admin blog posts" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();

    const error = collectErrors(
      validateString(id, 'id'),
      validateString(status, 'status', { maxLength: LIMITS.SHORT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const post = await prisma.post.update({
      where: { id },
      data: {
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error updating blog post status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
