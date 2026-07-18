import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sanitizeString, validateString, collectErrors, LIMITS } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json({ error: "questionId is required" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { questionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { allowed, retryAfter } = rateLimit(`comments_${session.user.id}`, 20, 60000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Too many comments. Please try again later." }), {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'Content-Type': 'application/json'
        }
      });
    }

    const { questionId, text } = await req.json();

    const error = collectErrors(
      validateString(questionId, 'questionId'),
      validateString(text, 'text', { maxLength: LIMITS.COMMENT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const cleanText = sanitizeString(text, LIMITS.COMMENT);
    if (!cleanText) {
      return NextResponse.json({ error: "Comment text cannot be empty" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        questionId,
        text: cleanText,
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json({ comment });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { allowed, retryAfter } = rateLimit(`comments_${session.user.id}`, 20, 60000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Too many comments. Please try again later." }), {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'Content-Type': 'application/json'
        }
      });
    }

    const { commentId, text } = await req.json();

    const error = collectErrors(
      validateString(commentId, 'commentId'),
      validateString(text, 'text', { maxLength: LIMITS.COMMENT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const cleanText = sanitizeString(text, LIMITS.COMMENT);
    if (!cleanText) {
      return NextResponse.json({ error: "Comment text cannot be empty" }, { status: 400 });
    }

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check ownership
    if (comment.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to edit this comment" }, { status: 403 });
    }

    // Check 5 minutes limit
    const now = new Date();
    const diffMinutes = (now - new Date(comment.createdAt)) / 1000 / 60;
    if (diffMinutes > 5) {
      return NextResponse.json({ error: "You can only edit your comments within 5 minutes of posting" }, { status: 403 });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { text: cleanText },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json({ comment: updatedComment });
  } catch (error) {
    console.error("PUT /api/comments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('id');

    if (!commentId) {
      return NextResponse.json({ error: "commentId is required" }, { status: 400 });
    }

    const isAdmin = session.user.role === 'ADMIN';

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Delete comment if admin OR (owner and within 5 minutes limit)
    if (isAdmin) {
      await prisma.comment.delete({ where: { id: commentId } });
      return NextResponse.json({ success: true });
    }

    if (comment.userId === session.user.id) {
      const now = new Date();
      const diffMinutes = (now - new Date(comment.createdAt)) / 1000 / 60;
      if (diffMinutes > 5) {
        return NextResponse.json({ error: "You can only delete your comments within 5 minutes of posting" }, { status: 403 });
      }

      await prisma.comment.delete({ where: { id: commentId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unauthorized to delete this comment" }, { status: 403 });
  } catch (error) {
    console.error("DELETE /api/comments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
