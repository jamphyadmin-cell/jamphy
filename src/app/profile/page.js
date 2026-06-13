"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import EditProfileModal from "@/components/EditProfileModal";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: profileData, error, isLoading } = useSWR(
    status === "authenticated" ? "/api/profile/stats" : null,
    fetcher,
    { revalidateOnFocus: true }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) return null;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={148} height={40} className="rounded-xl object-contain" priority />
            </Link>
            <span className="font-bold text-xl tracking-tight text-zinc-500 hidden sm:block">
              Profile
            </span>
          </div>
          <UserMenu session={session} />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        
        {/* HERO CARD */}
        <div className="bg-zinc-950 border border-white/10 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 md:gap-10 relative overflow-hidden break-words">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-900/20 to-cyan-900/20" />
          
          <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center text-4xl font-bold shrink-0">
            {session.user.image ? (
              <Image src={session.user.image} alt={session.user.name} fill className="object-cover" sizes="96px" />
            ) : (
              session.user.name ? session.user.name[0].toUpperCase() : "U"
            )}
          </div>
          
          <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3 w-full">
            <h1 className="text-3xl font-black truncate w-full max-w-full">{session.user.name}</h1>
            <p className="text-zinc-400 truncate w-full max-w-full">{session.user.email}</p>
            {profileData?.stats && (
              <div className="flex items-center gap-4 text-sm font-bold mt-2">
                <span className="text-zinc-300">
                  <span className="text-white text-lg">{profileData.stats.followersCount}</span> Followers
                </span>
                <span className="text-zinc-300">
                  <span className="text-white text-lg">{profileData.stats.followingCount}</span> Following
                </span>
              </div>
            )}
          </div>
          
          <div className="relative z-10 mt-6 md:mt-0 shrink-0">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-white text-black font-bold hover:scale-105 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {profileData && (
          <>
            {/* STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Total Questions</div>
                <div className="text-4xl font-mono text-white font-black">{profileData.stats.totalQuestions}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Correct</div>
                <div className="text-4xl font-mono text-emerald-400 font-black">{profileData.stats.totalCorrect}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Accuracy</div>
                <div className="text-4xl font-mono text-cyan-400 font-black">{profileData.stats.accuracy}%</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-500/5" />
                <div className="relative z-10 text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="text-orange-500">🔥</span> Streak
                </div>
                <div className="relative z-10 text-4xl font-mono text-orange-400 font-black">{profileData.stats.currentStreak} d</div>
              </div>
            </div>

            {/* TWO COLUMNS: Heatmap + Subjects on Left, Recent Activity on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">
                {/* CALENDAR HEATMAP */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-6">Activity Calendar (Last 90 Days)</h3>
                  <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-fit">
                    {/* Render a simple grid of squares for the last 91 days (13 weeks) */}
                    {Array.from({ length: 91 }).map((_, i) => {
                      const d = new Date();
                      d.setDate(d.getDate() - (90 - i));
                      const dStr = d.toISOString().split('T')[0];
                      const entry = profileData.heatmap.find(h => h.date === dStr);
                      const count = entry ? entry.count : 0;
                      
                      let bgClass = "bg-zinc-900 border border-zinc-800/50";
                      if (count > 0 && count <= 5) bgClass = "bg-[#0e4429] border border-[#006d32]/50";
                      else if (count > 5 && count <= 15) bgClass = "bg-[#006d32] border border-[#26a641]/50";
                      else if (count > 15) bgClass = "bg-[#39d353] border border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.3)]";

                      return (
                        <div 
                          key={i} 
                          title={`${dStr}: ${count} questions`}
                          className={`w-[11px] h-[11px] rounded-[2px] ${bgClass}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-zinc-500 justify-end">
                    <span>Less</span>
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-zinc-900 border border-zinc-800/50" />
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-[#0e4429] border border-[#006d32]/50" />
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-[#006d32] border border-[#26a641]/50" />
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-[#39d353] border border-[#39d353]" />
                    <span>More</span>
                  </div>
                </div>

                {/* SUBJECT BREAKDOWN */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-6">Subject Accuracy</h3>
                  <div className="space-y-4">
                    {profileData.breakdown.length === 0 ? (
                      <p className="text-zinc-500 italic">No subject data yet.</p>
                    ) : (
                      profileData.breakdown.map((subject, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold text-zinc-300">{subject.subject || "Mixed"}</span>
                            <span className="text-zinc-500">{subject.accuracy}% ({subject.correct}/{subject.total})</span>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-cyan-400"
                              style={{ width: `${subject.accuracy}%` }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-full">
                  <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {profileData.recentActivity.length === 0 ? (
                      <p className="text-zinc-500 italic">No recent activity.</p>
                    ) : (
                      profileData.recentActivity.map((attempt) => (
                        <div key={attempt.id} className="flex items-start gap-4 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                          <div className={`mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full ${attempt.isCorrect ? "bg-emerald-400" : "bg-red-400"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-zinc-200 truncate">
                              {attempt.subject || "Question Practice"}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">
                              {new Date(attempt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                            </div>
                          </div>
                          <div className="text-xs font-mono text-zinc-600 bg-zinc-950 px-2 py-1 rounded">
                            {attempt.timeTaken}s
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {isEditModalOpen && <EditProfileModal onClose={() => setIsEditModalOpen(false)} />}
    </div>
  );
}
