import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roomId } = await req.json();

    const room = await prisma.liveRoom.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    if (room.status !== "LOBBY") {
      return Response.json({ error: "Room is already active or finished" }, { status: 400 });
    }

    // Upsert participant so if they join twice it doesn't crash
    await prisma.roomParticipant.upsert({
      where: {
        roomId_userId: {
          roomId: roomId,
          userId: session.user.id
        }
      },
      update: {},
      create: {
        roomId: roomId,
        userId: session.user.id
      }
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Room join error:", error);
    return Response.json({ error: "Failed to join room" }, { status: 500 });
  }
}
