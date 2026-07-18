import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanitizeString, validateString, validateNumber, LIMITS } from "@/lib/validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { examDate, hoursPerDay, targetRank, preferences, subjectConfidence, planType } = body;

    // Validate required fields
    if (!examDate || typeof examDate !== 'string') {
      return NextResponse.json({ error: 'examDate is required and must be a string' }, { status: 400 });
    }
    const hoursErr = validateNumber(hoursPerDay, 'hoursPerDay', { min: 1, max: 16 });
    if (hoursErr) return NextResponse.json({ error: hoursErr }, { status: 400 });

    if (targetRank !== undefined) {
      const rankErr = validateString(targetRank, 'targetRank', { required: false, maxLength: LIMITS.SHORT });
      if (rankErr) return NextResponse.json({ error: rankErr }, { status: 400 });
    }
    if (preferences !== undefined) {
      const prefsErr = validateString(preferences, 'preferences', { required: false, maxLength: LIMITS.EXCERPT });
      if (prefsErr) return NextResponse.json({ error: prefsErr }, { status: 400 });
    }
    if (subjectConfidence !== undefined && (typeof subjectConfidence !== 'object' || Array.isArray(subjectConfidence))) {
      return NextResponse.json({ error: 'subjectConfidence must be an object' }, { status: 400 });
    }

    // Sanitise free-text fields
    const cleanTargetRank  = targetRank  ? sanitizeString(targetRank,  LIMITS.SHORT)   : '';
    const cleanPreferences = preferences ? sanitizeString(preferences, LIMITS.EXCERPT) : '';

    // Fetch user's actual attempts to ground the AI's understanding
    const attempts = await prisma.attempt.findMany({
      where: { userId: session.user.id },
      select: { subject: true, isCorrect: true }
    });

    const subjectStats = {};
    attempts.forEach(attempt => {
      if (!attempt.subject) return;
      if (!subjectStats[attempt.subject]) subjectStats[attempt.subject] = { total: 0, correct: 0 };
      subjectStats[attempt.subject].total++;
      if (attempt.isCorrect) subjectStats[attempt.subject].correct++;
    });

    const actualPerformance = Object.keys(subjectStats).map(subject => ({
      subject,
      accuracy: Math.round((subjectStats[subject].correct / subjectStats[subject].total) * 100),
      totalAttempts: subjectStats[subject].total
    }));

    // Common deterministic fallback logic
    const generateDeterministicPlan = () => {
      const today = new Date();
      const targetDate = new Date(examDate);
      let daysRemaining = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      if (daysRemaining <= 0) daysRemaining = 30; 
      // Quick plan is 1 week, otherwise calculate weeks remaining (max 2 weeks for deterministic to be safe)
      const weeksRemaining = planType === 'quick' ? 1 : Math.min(2, Math.max(1, Math.ceil(daysRemaining / 7)));

      let allSubjects = subjectConfidence ? Object.keys(subjectConfidence) : [];
      if (allSubjects.length === 0) allSubjects = ["General Physics", "Mechanics"]; 
      
      const subjectScores = allSubjects.map(sub => {
        let score = parseInt(subjectConfidence?.[sub] || 3, 10);
        const perf = actualPerformance.find(p => p.subject === sub);
        if (perf && perf.accuracy < 60) score -= 1; 
        return { name: sub, score };
      });
      subjectScores.sort((a, b) => a.score - b.score);

      const generatedData = { weeks: [] };
      const qPerHour = 10; 

      for (let w = 1; w <= weeksRemaining; w++) {
        const focusSubject = subjectScores[(w - 1) % subjectScores.length].name;
        const dailyTasks = [];
        for (let d = 1; d <= 7; d++) {
          const estTime = hoursPerDay * 60; 
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
      return generatedData;
    };

    const savePlanToDb = async (generatedData) => {
      const newPlan = await prisma.studyPlan.create({
        data: {
          userId: session.user.id,
          examDate: new Date(examDate),
          hoursPerDay: parseInt(hoursPerDay, 10),
          targetRank: cleanTargetRank,
          preferences: cleanPreferences,
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
      await prisma.studyTask.createMany({ data: tasksToCreate });
      return newPlan.id;
    };

    if (planType === 'quick') {
      const planData = generateDeterministicPlan();
      const planId = await savePlanToDb(planData);
      return NextResponse.json({ success: true, planId, isQuick: true });
    }

    // Full AI Plan with Streaming & Timeout
    const prompt = `
      You are an expert IIT JAM Physics tutor. 
      Generate a structured, personalized 2-week rolling study plan (max 2 weeks to keep it focused).
      
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
      2. Plan should cover ONLY the NEXT 2 WEEKS. (Assume today is ${new Date().toISOString().split('T')[0]}).
      3. Distribute tasks logically across 7 days per week.
      4. Output MUST be valid JSON exactly in this format, with NO markdown formatting, NO backticks, and NO extra text:
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
    
    // We will use a TransformStream to send chunks to the client while saving the full text locally to write to DB
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Fire and forget the generation process so the stream returns immediately
    (async () => {
      let fullJsonText = "";
      let isAborted = false;
      const timeoutId = setTimeout(async () => {
        isAborted = true;
        // If it times out, write the deterministic fallback and close
        const fallbackPlan = generateDeterministicPlan();
        fullJsonText = JSON.stringify(fallbackPlan);
        await writer.write(encoder.encode("[TIMEOUT_FALLBACK]" + fullJsonText));
        await savePlanToDb(fallbackPlan);
        writer.close();
      }, 30000); // 30-second strict timeout

      try {
        const resultStream = await model.generateContentStream(prompt);
        for await (const chunk of resultStream) {
          if (isAborted) break;
          const chunkText = chunk.text();
          fullJsonText += chunkText;
          await writer.write(encoder.encode(chunkText));
        }

        if (!isAborted) {
          clearTimeout(timeoutId);
          // Clean up potential markdown from the stream output just in case
          let cleaned = fullJsonText.trim();
          if (cleaned.startsWith('\`\`\`json')) cleaned = cleaned.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
          else if (cleaned.startsWith('\`\`\`')) cleaned = cleaned.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
          
          try {
            const parsed = JSON.parse(cleaned);
            await savePlanToDb(parsed);
          } catch (e) {
            console.error("Failed to parse Gemini output, saving fallback");
            const fallback = generateDeterministicPlan();
            await savePlanToDb(fallback);
          }
          writer.close();
        }
      } catch (err) {
        if (!isAborted) {
          clearTimeout(timeoutId);
          console.error("Gemini Streaming Error:", err);
          const fallback = generateDeterministicPlan();
          await writer.write(encoder.encode("[ERROR_FALLBACK]" + JSON.stringify(fallback)));
          await savePlanToDb(fallback);
          writer.close();
        }
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("Study Plan Generation API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
