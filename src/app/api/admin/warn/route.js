import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const adminCookie = req.cookies.get("admin_session");
    const isCookieAdmin = adminCookie && adminCookie.value === "authenticated";

    const session = await getServerSession(authOptions);
    const isGoogleAdmin = session?.user?.email === "jamphy.admin@gmail.com";

    if (!isCookieAdmin && !isGoogleAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, message } = await req.json();

    if (!userId || !message || message.trim() === "") {
      return NextResponse.json({ error: "Missing userId or warning message" }, { status: 400 });
    }

    // Create a warning notification for the target user
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: "WARNING",
        message: message.trim()
      }
    });

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error("POST /api/admin/warn error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
