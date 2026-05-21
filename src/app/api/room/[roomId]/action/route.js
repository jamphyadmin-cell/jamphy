import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roomId } = params;
    const { action, progress, score, isFinished } = await req.json();

    const room = await prisma.liveRoom.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    if (action === "START") {
      if (room.hostId !== session.user.id) {
        return Response.json({ error: "Only host can start the room" }, { status: 403 });
      }
      
      await prisma.liveRoom.update({
        where: { id: roomId },
        data: { status: "ACTIVE" }
      });
      
      return Response.json({ success: true });
    }

    if (action === "PROGRESS") {
      // User is updating their progress
      await prisma.roomParticipant.update({
        where: {
          roomId_userId: {
            roomId: roomId,
            userId: session.user.id
          }
        },
        data: {
          progress: progress ?? undefined,
          score: score ?? undefined,
          isFinished: isFinished ?? undefined
        }
      });
      
      // If everyone is finished, host might close it or we can auto-close.
      // We will keep it simple.
      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Room action error:", error);
    return Response.json({ error: "Failed to perform action" }, { status: 500 });
  }
}
