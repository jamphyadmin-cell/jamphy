import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { validateString, collectErrors, LIMITS } from '@/lib/validation';
import { cookies } from 'next/headers';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'ADMIN') return true;
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_session");
  return adminCookie?.value === "authenticated";
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true, email: true, username: true, image: true }
        }
      }
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching admin blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch admin blog posts" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();

    const error = collectErrors(
      validateString(id, 'id'),
      validateString(status, 'status', { maxLength: LIMITS.SHORT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const post = await prisma.post.update({
      where: { id },
      data: {
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error updating blog post status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
