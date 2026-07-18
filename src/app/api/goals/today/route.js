import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { validateNumber } from '@/lib/validation';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get or create today's goal
    let goal = await prisma.dailyGoal.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        }
      }
    });

    if (!goal) {
      goal = await prisma.dailyGoal.create({
        data: {
          userId,
          date: today,
          targetQuestions: 20,
        }
      });
    }

    // Get attempts for today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const completed = await prisma.attempt.count({
      where: {
        userId,
        createdAt: {
          gte: today,
          lt: tomorrow,
        }
      }
    });

    const target = goal.targetQuestions;
    const percentage = target > 0 ? (completed / target) * 100 : 100;

    return NextResponse.json({
      target,
      completed,
      percentage: Math.min(percentage, 100),
    });

  } catch (error) {
    console.error("Error fetching daily goal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetQuestions } = await req.json();
    const error = validateNumber(targetQuestions, 'targetQuestions', { min: 1 });
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const userId = session.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const goal = await prisma.dailyGoal.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        }
      },
      update: {
        targetQuestions,
      },
      create: {
        userId,
        date: today,
        targetQuestions,
      }
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error updating daily goal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
