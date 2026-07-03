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

    // Prepare Prompt for Gemini
    const prompt = `
      You are an expert IIT JAM Physics tutor. 
      Generate a structured, week-by-week personalized study plan.
      
      User Profile:
      - Exam Date: ${examDate}
      - Daily Study Hours: ${hoursPerDay}
      - Target: ${targetRank}
      - Study Preference: ${preferences}
      
      Self-Rated Confidence (1-5, 5 is best): 
      ${JSON.stringify(subjectConfidence)}
      
      Actual Performance from Attempt History:
      ${JSON.stringify(actualPerformance)}
      
      Instructions:
      1. Prioritize weak subjects. A subject is weak if self-rated confidence is low OR actual accuracy is low (under 60%).
      2. Plan should cover the remaining weeks until the exam date. (Assume today is ${new Date().toISOString().split('T')[0]}).
      3. Distribute tasks logically across 7 days per week.
      4. Output MUST be valid JSON in the following format exactly, with no markdown formatting or extra text outside the JSON:
      {
        "weeks": [
          {
            "weekNumber": 1,
            "focus": "Brief description of this week's goals",
            "dailyTasks": [
              {
                "day": 1,
                "topic": "Topic Name",
                "questionTarget": 20,
                "estimatedTime": 120
              }
            ]
          }
        ]
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let textResponse = result.response.text();
    
    // Clean up potential markdown formatting from Gemini response
    if (textResponse.startsWith('\`\`\`json')) {
      textResponse = textResponse.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (textResponse.startsWith('\`\`\`')) {
      textResponse = textResponse.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }

    const generatedData = JSON.parse(textResponse);

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
