import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sanitizeString, validateString, collectErrors, LIMITS } from "@/lib/validation";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { questionId, description } = await req.json();

    const error = collectErrors(
      validateString(questionId, 'questionId'),
      validateString(description, 'description', { maxLength: LIMITS.COMMENT })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const cleanDescription = sanitizeString(description, LIMITS.COMMENT);
    if (!cleanDescription) {
      return NextResponse.json({ error: "Description cannot be empty" }, { status: 400 });
    }

    const report = await prisma.report.create({
      data: {
        questionId,
        description: cleanDescription,
        userId: session?.user?.id || null, // Associate user if logged in
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Failed to submit report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
