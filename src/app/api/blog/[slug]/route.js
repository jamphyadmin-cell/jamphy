import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { sanitizeString, validateString, collectErrors, LIMITS } from '@/lib/validation';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    const isAdmin = session.user.role === 'ADMIN';
    if (post.authorId !== session.user.id && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, excerpt, content, tags, coverImage } = body;

    // Validate required fields
    const error = collectErrors(
      validateString(title, 'title', { required: false, maxLength: LIMITS.TITLE }),
      validateString(excerpt, 'excerpt', { required: false, maxLength: LIMITS.EXCERPT }),
      validateString(content, 'content', { required: false, maxLength: LIMITS.CONTENT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    if (tags !== undefined && !Array.isArray(tags)) {
      return NextResponse.json({ error: 'tags must be an array' }, { status: 400 });
    }

    // Sanitise user-submitted text
    const cleanTitle   = title   ? sanitizeString(title,   LIMITS.TITLE)   : undefined;
    const cleanContent = content ? sanitizeString(content, LIMITS.CONTENT) : undefined;
    const cleanExcerpt = excerpt ? sanitizeString(excerpt, LIMITS.EXCERPT) : undefined;
    const cleanTags    = Array.isArray(tags) ? tags.map(t => sanitizeString(String(t), LIMITS.SHORT)).filter(Boolean) : undefined;

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title:    cleanTitle,
        excerpt:  cleanExcerpt,
        content:  cleanContent,
        tags:     cleanTags,
        coverImage
      }
    });

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
