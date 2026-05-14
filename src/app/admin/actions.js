"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export async function updateReportStatus(reportId, newStatus) {
  try {
    await prisma.report.update({
      where: { id: reportId },
      data: { status: newStatus }
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Failed to update report:", error);
  }
}
