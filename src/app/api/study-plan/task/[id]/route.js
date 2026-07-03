import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskId = params.id;
    const body = await req.json();
    const { completed } = body;

    // Verify task belongs to user's plan
    const task = await prisma.studyTask.findUnique({
      where: { id: taskId },
      include: { plan: true }
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task.plan.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedTask = await prisma.studyTask.update({
      where: { id: taskId },
      data: {
        completed,
        completedAt: completed ? new Date() : null
      }
    });

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Task Update Error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
