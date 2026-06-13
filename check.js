const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.question.count().then(c => console.log('Total questions:', c)).catch(e => console.log(e)).finally(() => prisma.$disconnect());
