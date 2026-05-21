import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roomId, username } = await req.json();

    if (!roomId || !username) {
      return Response.json({ error: "Missing roomId or username" }, { status: 400 });
    }

    const receiver = await prisma.user.findUnique({
      where: { username }
    });

    if (!receiver) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (receiver.id === session.user.id) {
      return Response.json({ error: "Cannot invite yourself" }, { status: 400 });
    }

    // Check if room exists
    const room = await prisma.liveRoom.findUnique({ where: { id: roomId } });
    if (!room) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if invite already exists
    const existingInvite = await prisma.roomInvite.findFirst({
      where: {
        roomId,
        receiverId: receiver.id,
        status: "PENDING"
      }
    });

    if (existingInvite) {
      return Response.json({ error: "User already invited" }, { status: 400 });
    }

    // Create invite
    await prisma.roomInvite.create({
      data: {
        roomId,
        senderId: session.user.id,
        receiverId: receiver.id,
        status: "PENDING"
      }
    });

    return Response.json({ success: true, message: "Invite sent successfully" });

  } catch (error) {
    console.error("Invite error:", error);
    return Response.json({ error: "Failed to send invite" }, { status: 500 });
  }
}
