import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { sanitizeString, validateString, collectErrors, LIMITS } from '@/lib/validation';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    // Validate required fields
    const error = collectErrors(
      validateString(title, 'title', { maxLength: LIMITS.TITLE }),
      validateString(slug, 'slug', { maxLength: LIMITS.SHORT }),
      validateString(content, 'content', { maxLength: LIMITS.CONTENT }),
      validateString(excerpt, 'excerpt', { maxLength: LIMITS.EXCERPT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    if (tags !== undefined && !Array.isArray(tags)) {
      return NextResponse.json({ error: 'tags must be an array' }, { status: 400 });
    }

    // Sanitise user-submitted text
    const cleanTitle   = sanitizeString(title, LIMITS.TITLE);
    const cleanContent = sanitizeString(content, LIMITS.CONTENT);
    const cleanExcerpt = sanitizeString(excerpt, LIMITS.EXCERPT);
    const cleanSlug    = sanitizeString(slug, LIMITS.SHORT).toLowerCase().replace(/[^a-z0-9-]/g, '');
    const cleanTags    = Array.isArray(tags) ? tags.map(t => sanitizeString(String(t), LIMITS.SHORT)).filter(Boolean) : [];

    // Check if slug is unique
    const existing = await prisma.post.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const post = await prisma.post.create({
      data: {
        title:    cleanTitle,
        slug:     cleanSlug,
        content:  cleanContent,
        excerpt:  cleanExcerpt,
        tags:     cleanTags,
        coverImage,
        authorId: session.user.id,
        status:   "PENDING"
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
