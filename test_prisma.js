const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  console.log("Does Comment exist?", !!prisma.comment);
}
check();
