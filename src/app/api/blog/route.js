import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: { name: true, image: true, username: true }
        }
      }
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, content, excerpt, tags, coverImage } = body;

    if (!title || !slug || !content || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug is unique
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        tags: tags || [],
        coverImage,
        authorId: session.user.id,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
