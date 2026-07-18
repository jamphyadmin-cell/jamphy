import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sanitizeString, validateString, collectErrors, LIMITS } from "@/lib/validation";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, message } = await req.json();

    const error = collectErrors(
      validateString(userId, 'userId'),
      validateString(message, 'message', { maxLength: LIMITS.COMMENT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const cleanMessage = sanitizeString(message, LIMITS.COMMENT);
    if (!cleanMessage) {
      return NextResponse.json({ error: "Warning message cannot be empty" }, { status: 400 });
    }

    // Create a warning notification for the target user
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "WARNING",
        message: cleanMessage
      }
    });

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error("POST /api/admin/warn error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
