import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { adminLogout, updateReportStatus } from "./actions";
import AdminTabs from "./AdminTabs";
import AdminLogoLink from "@/components/AdminLogoLink";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch users
  const users = await prisma.user.findMany({
    orderBy: {
      id: 'desc'
    },
    include: {
      accounts: true,
    }
  });

  // Fetch reports
  const reports = await prisma.report.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: true,
    }
  });

  // Serialize data to prevent Server Component serialization errors with Date objects
  const serializedUsers = JSON.parse(JSON.stringify(users));
  const serializedReports = JSON.parse(JSON.stringify(reports));

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AdminLogoLink />
            <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-500 hidden sm:block">Admin</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="px-4 py-2 text-sm rounded-xl border border-zinc-700 hover:bg-zinc-800 transition">
              Back to App
            </Link>
            <form action={adminLogout}>
              <button type="submit" className="px-4 py-2 text-sm rounded-xl bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 transition">
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AdminTabs reports={serializedReports} users={serializedUsers} />
      </main>
    </div>
  );
}
