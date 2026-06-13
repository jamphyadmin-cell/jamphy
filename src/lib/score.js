import { prisma } from './prisma';

export async function updateUserScore(userId, attempts) {
  // attempts can be a single object or an array of objects
  const attemptArray = Array.isArray(attempts) ? attempts : [attempts];
  if (attemptArray.length === 0) return;

  let pointsDelta = 0;
  let correctCount = 0;

  for (const attempt of attemptArray) {
    if (attempt.isCorrect) {
      pointsDelta += 10;
      correctCount += 1;
    } else {
      pointsDelta -= 3;
    }
  }

  // Handle streak bonus (+5 points for every 5 consecutive correct answers)
  // For Sprint mode (batch of 10), we can just check within the batch
  // For single attempts, we'd need to check the database.
  // To keep it simple and performant, we'll check the db for single attempts,
  // and for batches we'll check within the batch.
  if (attemptArray.length === 1) {
    if (attemptArray[0].isCorrect) {
      const last4 = await prisma.attempt.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 4
      });
      if (last4.length === 4 && last4.every(a => a.isCorrect)) {
        pointsDelta += 5;
      }
    }
  } else {
    // For batch (e.g. Sprint of 10 questions)
    let currentStreak = 0;
    for (const attempt of attemptArray) {
      if (attempt.isCorrect) {
        currentStreak++;
        if (currentStreak === 5) {
          pointsDelta += 5;
        }
        if (currentStreak === 10) {
          pointsDelta += 5; // another 5 for 10-streak
        }
      } else {
        currentStreak = 0;
      }
    }
  }

  // Fetch or create UserScore
  let userScore = await prisma.userScore.findUnique({
    where: { userId }
  });

  if (!userScore) {
    userScore = await prisma.userScore.create({
      data: {
        userId,
        totalPoints: 0,
        weeklyPoints: 0,
        allTimePoints: 0,
        questionsAttempted: 0,
        correctAnswers: 0,
      }
    });
  }

  const newTotal = userScore.totalPoints + pointsDelta;
  // Calculate league
  let newLeague = "Bronze";
  if (newTotal > 15000) newLeague = "Diamond";
  else if (newTotal > 5000) newLeague = "Platinum";
  else if (newTotal > 2000) newLeague = "Gold";
  else if (newTotal > 500) newLeague = "Silver";

  await prisma.userScore.update({
    where: { userId },
    data: {
      totalPoints: { increment: pointsDelta },
      weeklyPoints: { increment: pointsDelta },
      allTimePoints: { increment: pointsDelta },
      questionsAttempted: { increment: attemptArray.length },
      correctAnswers: { increment: correctCount },
      currentLeague: newLeague,
    }
  });
}
