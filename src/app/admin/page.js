import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminLogout, updateReportStatus } from "./actions";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // We already have middleware, but we can do an extra check here if we want
  
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

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Jamphy Admin Logo"
              width={160}
              height={160}
              className="rounded-2xl"
            />
            <span className="font-bold text-xl tracking-tight text-zinc-500 hidden sm:block">Admin</span>
          </div>
          <div className="flex items-center gap-4">
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

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* Reports Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black">Reported Questions</h2>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-medium">
              {reports.length} Total
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">
              No reports yet. Everything looks good!
            </div>
          ) : (
            <div className="grid gap-4">
              {reports.map(report => {
                const approveAction = updateReportStatus.bind(null, report.id, "APPROVED");
                const declineAction = updateReportStatus.bind(null, report.id, "DECLINED");
                
                return (
                <div key={report.id} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">
                        {report.questionId}
                      </span>
                      <span className="text-zinc-500 text-sm">
                        {new Date(report.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      {report.status === "PENDING" ? (
                        <div className="flex items-center gap-2">
                          <form action={approveAction}>
                            <button type="submit" className="px-3 py-1 text-sm bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 transition">
                              Approve
                            </button>
                          </form>
                          <form action={declineAction}>
                            <button type="submit" className="px-3 py-1 text-sm bg-zinc-800 text-zinc-400 rounded-full hover:bg-zinc-700 transition">
                              Decline
                            </button>
                          </form>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 text-sm rounded-full font-bold ${
                          report.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 'bg-zinc-800 text-zinc-500'
                        }`}>
                          {report.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-zinc-300 mb-4 whitespace-pre-wrap">{report.description}</p>
                  
                  {report.user && (
                    <div className="flex items-center gap-2 pt-4 border-t border-zinc-800 mt-4">
                      {report.user.image ? (
                        <img src={report.user.image} alt={report.user.name} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 bg-zinc-800 rounded-full" />
                      )}
                      <span className="text-sm text-zinc-400">Reported by {report.user.name || report.user.email}</span>
                    </div>
                  )}
                </div>
              )})}
            </div>
          )}
        </section>

        {/* Users Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black">Registered Users</h2>
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-medium">
              {users.length} Total
            </span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="p-4 text-sm font-medium text-zinc-500">User</th>
                    <th className="p-4 text-sm font-medium text-zinc-500">Email</th>
                    <th className="p-4 text-sm font-medium text-zinc-500">Provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-8 text-center text-zinc-500">No users found.</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="hover:bg-zinc-900/50 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                            ) : (
                              <div className="w-8 h-8 bg-zinc-800 rounded-full" />
                            )}
                            <span className="font-medium">{user.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="p-4 text-zinc-400">{user.email}</td>
                        <td className="p-4 text-zinc-400">
                          {user.accounts.map(acc => acc.provider).join(', ') || 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
