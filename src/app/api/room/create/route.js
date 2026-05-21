import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { questions } from "@/data/questions";
import { syllabus } from "@/data/syllabus";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const config = await req.json();

    // Replicate logic from TestManager.js to generate questions on server
    let filtered = questions.filter(q => {
      // 1. Types
      if (!config.types.includes(q.type)) return false;

      // 2. Years
      if (config.yearMode !== "All") {
        if (config.yearMode === "Last 3") {
          if (q.year < 2024) return false;
        } else if (config.yearMode === "Last 5") {
          if (q.year < 2022) return false;
        } else if (config.yearMode === "Last 10") {
          if (q.year < 2017) return false;
        } else if (config.yearMode === "Custom") {
          if (q.year < config.customYearStart || q.year > config.customYearEnd) return false;
        }
      }

      // 3. Syllabus
      if (config.syllabusMode === "specific") {
        const allowedSubtopics = syllabus
          .filter(s => config.selectedChapters.includes(s.id))
          .flatMap(s => s.subtopics);
        if (!allowedSubtopics.includes(q.subject)) return false;
      }

      return true;
    });

    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const finalQuestions = shuffled.slice(0, config.numQuestions);

    if (finalQuestions.length === 0) {
      return Response.json({ error: "No questions found matching criteria." }, { status: 400 });
    }

    const questionIds = finalQuestions.map(q => q.id);

    // Create the room
    const room = await prisma.liveRoom.create({
      data: {
        hostId: session.user.id,
        status: "LOBBY",
        config: JSON.stringify(config),
        questions: JSON.stringify(questionIds),
        participants: {
          create: {
            userId: session.user.id
          }
        }
      }
    });

    return Response.json({ roomId: room.id });

  } catch (error) {
    console.error("Room creation error:", error);
    return Response.json({ error: "Failed to create room" }, { status: 500 });
  }
}
