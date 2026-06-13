import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
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

    const { questionId, text } = await req.json();

    if (!questionId || !text || text.trim() === "") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        questionId,
        text,
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

    const { commentId, text } = await req.json();

    if (!commentId || !text || text.trim() === "") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
      data: { text: text.trim() },
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
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('id');

    if (!commentId) {
      return NextResponse.json({ error: "commentId is required" }, { status: 400 });
    }

    // Check if requester is admin (via cookie or next-auth session email)
    const adminCookie = req.cookies.get("admin_session");
    const isCookieAdmin = adminCookie && adminCookie.value === "authenticated";

    const session = await getServerSession(authOptions);
    const isGoogleAdmin = session?.user?.email === "jamphy.admin@gmail.com";
    const isAdmin = isCookieAdmin || isGoogleAdmin;

    if (!isAdmin && !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Delete comment if admin OR (owner and within 5 minutes limit)
    if (isAdmin) {
      await prisma.comment.delete({
        where: { id: commentId }
      });
      return NextResponse.json({ success: true });
    }

    if (comment.userId === session.user.id) {
      const now = new Date();
      const diffMinutes = (now - new Date(comment.createdAt)) / 1000 / 60;
      if (diffMinutes > 5) {
        return NextResponse.json({ error: "You can only delete your comments within 5 minutes of posting" }, { status: 403 });
      }

      await prisma.comment.delete({
        where: { id: commentId }
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unauthorized to delete this comment" }, { status: 403 });
  } catch (error) {
    console.error("DELETE /api/comments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
