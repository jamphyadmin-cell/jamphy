import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StudyPlanClient from "./StudyPlanClient";

export const metadata = {
  title: 'My Study Plan - Jamphy',
};

export default async function StudyPlanPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const plan = await prisma.studyPlan.findUnique({
    where: { userId: session.user.id },
    include: {
      tasks: {
        orderBy: [
          { weekNumber: 'asc' },
          { day: 'asc' }
        ]
      }
    }
  });

  return <StudyPlanClient initialPlan={plan} />;
}
