import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { roomId } = resolvedParams;

    const room = await prisma.liveRoom.findUnique({
      where: { id: roomId },
      include: {
        participants: {
          include: {
            user: {
              select: { name: true, username: true, image: true }
            }
          },
          orderBy: { score: 'desc' }
        }
      }
    });

    if (!room) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    // Only allow participants to sync
    const isParticipant = room.participants.some(p => p.userId === session.user.id);
    if (!isParticipant) {
      return Response.json({ error: "Not a participant" }, { status: 403 });
    }

    // Don't send exact answers/questions config to participants in LOBBY state if we want to hide it
    // But since it's just questions IDs, it's fine.
    
    return Response.json({
      room: {
        id: room.id,
        status: room.status,
        hostId: room.hostId,
        config: JSON.parse(room.config),
        questions: room.status === "ACTIVE" ? JSON.parse(room.questions) : null,
      },
      participants: room.participants.map(p => ({
        id: p.userId,
        name: p.user.name,
        username: p.user.username,
        image: p.user.image,
        progress: p.progress,
        score: p.score,
        isFinished: p.isFinished
      }))
    });

  } catch (error) {
    console.error("Room sync error:", error);
    return Response.json({ error: "Failed to sync room" }, { status: 500 });
  }
}
