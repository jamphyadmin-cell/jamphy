const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    });
    console.log("ALL USERS:", users);

    const follows = await prisma.follow.findMany({
      include: {
        follower: { select: { name: true } },
        following: { select: { name: true } }
      }
    });
    console.log("ALL FOLLOWS:", follows);

    const attempts = await prisma.attempt.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: { select: { name: true } }
      }
    });
    console.log("RECENT ATTEMPTS:", attempts);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
check();
