import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validPassword) {
      console.error("ADMIN_PASSWORD is not set in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (username === validUsername && password === validPassword) {
      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set({
        name: "admin_session",
        value: "authenticated",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
