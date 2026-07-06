import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { questions as staticQuestions } from '@/data/questions';
import { syllabus } from '@/data/syllabus';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Aggregate DB questions: get distinct subjects with counts
    const dbAggregates = await prisma.question.groupBy({
      by: ['subject'],
      where: { status: 'APPROVED' },
      _count: { id: true },
    });

    // 2. Also aggregate static questions by subject
    const staticCounts = {};
    for (const q of staticQuestions) {
      if (q.subject) {
        staticCounts[q.subject] = (staticCounts[q.subject] || 0) + 1;
      }
    }

    // 3. Merge DB and static counts into a unified subject → count map
    const subjectCounts = { ...staticCounts };
    for (const row of dbAggregates) {
      if (row.subject) {
        subjectCounts[row.subject] = (subjectCounts[row.subject] || 0) + row._count.id;
      }
    }

    // 4. Map each syllabus module to its question count by summing subtopic counts
    const categories = syllabus.map((module) => {
      const count = module.subtopics.reduce((sum, subtopic) => {
        return sum + (subjectCounts[subtopic] || 0);
      }, 0);
      return {
        id: module.id,
        name: module.name,
        subtopics: module.subtopics,
        count,
        isCustom: false,
      };
    });

    // 5. Find subjects in DB/static that DON'T match any syllabus subtopic → create custom cards
    const allKnownSubtopics = new Set(syllabus.flatMap((m) => m.subtopics));
    const uncategorisedSubjects = Object.entries(subjectCounts)
      .filter(([subject]) => !allKnownSubtopics.has(subject))
      .map(([subject, count]) => ({
        id: `custom-${subject.toLowerCase().replace(/\s+/g, '-')}`,
        name: subject,
        subtopics: [subject],
        count,
        isCustom: true,
      }));

    return NextResponse.json({
      categories: [...categories, ...uncategorisedSubjects],
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
