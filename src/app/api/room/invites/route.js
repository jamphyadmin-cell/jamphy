import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invites = await prisma.roomInvite.findMany({
      where: {
        receiverId: session.user.id,
        status: "PENDING"
      },
      include: {
        sender: {
          select: { name: true, username: true }
        }
      }
    });

    return Response.json({ invites });

  } catch (error) {
    console.error("Fetch invites error:", error);
    return Response.json({ error: "Failed to fetch invites" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { inviteId, action } = await req.json(); // action: "ACCEPT" | "DECLINE"

    if (!inviteId || !action) {
      return Response.json({ error: "Missing inviteId or action" }, { status: 400 });
    }

    const invite = await prisma.roomInvite.findUnique({
      where: { id: inviteId }
    });

    if (!invite) {
      return Response.json({ error: "Invite not found" }, { status: 404 });
    }

    if (invite.receiverId !== session.user.id) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (action === "DECLINE") {
      await prisma.roomInvite.update({
        where: { id: inviteId },
        data: { status: "DECLINED" }
      });
      return Response.json({ success: true });
    } 
    
    if (action === "ACCEPT") {
      await prisma.roomInvite.update({
        where: { id: inviteId },
        data: { status: "ACCEPTED" }
      });
      
      // Also join the room
      await prisma.roomParticipant.upsert({
        where: {
          roomId_userId: {
            roomId: invite.roomId,
            userId: session.user.id
          }
        },
        update: {},
        create: {
          roomId: invite.roomId,
          userId: session.user.id
        }
      });

      return Response.json({ success: true, roomId: invite.roomId });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Invite action error:", error);
    return Response.json({ error: "Failed to process invite" }, { status: 500 });
  }
}
