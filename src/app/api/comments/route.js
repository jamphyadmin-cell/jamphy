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
