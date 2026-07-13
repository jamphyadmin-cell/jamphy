const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting year cleanup...');
  const questions = await prisma.question.findMany({
    where: {
      year: {
        not: ''
      }
    }
  });

  let updatedCount = 0;

  for (const q of questions) {
    if (!q.year) continue;
    
    const originalYear = String(q.year);
    // Extract only digits
    const cleanedYear = originalYear.replace(/\D/g, '');
    
    // Only update if it actually changed and has a valid 4-digit year
    if (cleanedYear && cleanedYear !== originalYear && cleanedYear.length >= 4) {
      // Just take the first 4 digits just in case
      const finalYear = cleanedYear.substring(0, 4);
      await prisma.question.update({
        where: { id: q.id },
        data: { year: finalYear }
      });
      console.log(`Updated Question ID ${q.id}: '${originalYear}' -> '${finalYear}'`);
      updatedCount++;
    }
  }

  console.log(`Cleanup complete. Updated ${updatedCount} records.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
