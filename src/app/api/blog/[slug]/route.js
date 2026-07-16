import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true, image: true, username: true }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // Check if user is author or admin
    const post = await prisma.post.findUnique({ where: { slug }, include: { author: true } });
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isAdmin = session.user.email === "jamphy.admin@gmail.com";
    if (post.authorId !== session.user.id && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, excerpt, content, tags, coverImage } = body;

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        excerpt,
        content,
        tags,
        coverImage
      }
    });

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

