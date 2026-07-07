import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { examDate, hoursPerDay, targetRank, preferences, subjectConfidence } = body;

    // Fetch user's actual attempts to ground the AI's understanding
    const attempts = await prisma.attempt.findMany({
      where: { userId: session.user.id },
      select: { subject: true, isCorrect: true }
    });

    // Calculate actual accuracy per subject based on attempts
    const subjectStats = {};
    attempts.forEach(attempt => {
      if (!attempt.subject) return;
      if (!subjectStats[attempt.subject]) {
        subjectStats[attempt.subject] = { total: 0, correct: 0 };
      }
      subjectStats[attempt.subject].total++;
      if (attempt.isCorrect) subjectStats[attempt.subject].correct++;
    });

    const actualPerformance = Object.keys(subjectStats).map(subject => ({
      subject,
      accuracy: Math.round((subjectStats[subject].correct / subjectStats[subject].total) * 100),
      totalAttempts: subjectStats[subject].total
    }));

    // Replace slow AI call with a fast deterministic algorithm
    const today = new Date();
    const targetDate = new Date(examDate);
    let daysRemaining = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    if (daysRemaining <= 0) daysRemaining = 30; // fallback
    const weeksRemaining = Math.max(1, Math.ceil(daysRemaining / 7));

    // Determine weak subjects based on confidence and accuracy
    const allSubjects = Object.keys(subjectConfidence);
    const subjectScores = allSubjects.map(sub => {
      let score = parseInt(subjectConfidence[sub], 10) || 3;
      const perf = actualPerformance.find(p => p.subject === sub);
      if (perf && perf.accuracy < 60) score -= 1; 
      return { name: sub, score };
    });
    // Sort ascending by score (lowest score = weakest = studied first)
    subjectScores.sort((a, b) => a.score - b.score);

    const generatedData = { weeks: [] };
    const qPerHour = 10; // Assume 10 questions per hour

    for (let w = 1; w <= weeksRemaining; w++) {
      // Cycle through subjects based on the week, prioritizing weaker ones early
      const focusSubject = subjectScores[(w - 1) % subjectScores.length].name;
      
      const dailyTasks = [];
      for (let d = 1; d <= 7; d++) {
        const estTime = hoursPerDay * 60; // minutes
        // Mix in other subjects on weekends or specific days
        const currentTopic = (d === 6 || d === 7) 
          ? subjectScores[Math.floor(Math.random() * subjectScores.length)].name 
          : focusSubject;

        dailyTasks.push({
          day: d,
          topic: currentTopic,
          questionTarget: hoursPerDay * qPerHour,
          estimatedTime: estTime
        });
      }

      generatedData.weeks.push({
        weekNumber: w,
        focus: `Mastering ${focusSubject} concepts and problem solving`,
        dailyTasks
      });
    }

    // Save to Database
    const newPlan = await prisma.studyPlan.create({
      data: {
        userId: session.user.id,
        examDate: new Date(examDate),
        hoursPerDay: parseInt(hoursPerDay, 10),
        targetRank,
        preferences,
        generatedPlan: generatedData
      }
    });

    const tasksToCreate = [];
    generatedData.weeks.forEach(week => {
      week.dailyTasks.forEach(task => {
        tasksToCreate.push({
          planId: newPlan.id,
          weekNumber: week.weekNumber,
          day: task.day,
          topic: task.topic,
          questionTarget: task.questionTarget,
          estimatedTime: task.estimatedTime
        });
      });
    });

    await prisma.studyTask.createMany({
      data: tasksToCreate
    });

    return NextResponse.json({ success: true, planId: newPlan.id });
  } catch (error) {
    console.error("Study Plan Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate study plan" }, { status: 500 });
  }
}
