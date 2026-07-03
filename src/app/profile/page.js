"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import Navbar from "@/components/Navbar";
import EditProfileModal from "@/components/EditProfileModal";
import { useTransitionContext } from "@/components/TransitionProvider";
import FollowListModal from "@/components/FollowListModal";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { navigateWithTransition } = useTransitionContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [followModal, setFollowModal] = useState({ isOpen: false, tab: "followers" });
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
      <div className="min-h-screen bg-obsidian-deep text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-electric-violet rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) return null;

  return (
    <div className="min-h-screen bg-obsidian-deep text-white pb-24">
      <Navbar session={session} title="Profile" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        
        {/* HERO CARD */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 relative overflow-hidden break-words">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-electric-violet/20 to-cyber-green/20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-electric-violet via-cyber-green to-warning-amber" />
          
          <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-obsidian-deep bg-white/10 flex items-center justify-center text-4xl font-bold shrink-0 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            {session.user.image ? (
              <Image src={session.user.image} alt={session.user.name} fill className="object-cover" sizes="128px" />
            ) : (
              <span className="bg-gradient-to-br from-electric-violet to-cyber-green bg-clip-text text-transparent">
                {session.user.name ? session.user.name[0].toUpperCase() : "U"}
              </span>
            )}
          </div>
          
          <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3 w-full">
            <h1 className="text-3xl sm:text-4xl font-black truncate w-full max-w-full text-white">{session.user.name}</h1>
            <p className="text-on-surface-variant truncate w-full max-w-full text-sm">{session.user.email}</p>
            {profileData?.stats && (
              <div className="flex items-center gap-6 text-sm font-bold mt-2">
                <button 
                  onClick={() => setFollowModal({ isOpen: true, tab: "followers" })}
                  className="text-on-surface-variant hover:text-white transition"
                >
                  <span className="text-white text-lg font-black">{profileData.stats.followersCount}</span> Followers
                </button>
                <button 
                  onClick={() => setFollowModal({ isOpen: true, tab: "following" })}
                  className="text-on-surface-variant hover:text-white transition"
                >
                  <span className="text-white text-lg font-black">{profileData.stats.followingCount}</span> Following
                </button>
              </div>
            )}
          </div>
          
          <div className="relative z-10 mt-4 md:mt-0 shrink-0">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-electric-violet text-white font-bold hover:bg-inverse-primary transition-colors active:scale-95"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {profileData && profileData.stats && (
          <>
            {/* STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center">
                <div className="text-[10px] text-electric-violet font-mono-label tracking-widest uppercase mb-3 font-bold">Total Questions</div>
                <div className="text-3xl sm:text-4xl font-mono text-white font-black">{profileData.stats.totalQuestions}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center">
                <div className="text-[10px] text-cyber-green font-mono-label tracking-widest uppercase mb-3 font-bold">Correct</div>
                <div className="text-3xl sm:text-4xl font-mono text-cyber-green font-black">{profileData.stats.totalCorrect}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center">
                <div className="text-[10px] text-electric-violet font-mono-label tracking-widest uppercase mb-3 font-bold">Accuracy</div>
                <div className="text-3xl sm:text-4xl font-mono text-electric-violet font-black">{profileData.stats.accuracy}%</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-warning-amber/5" />
                <div className="relative z-10 text-[10px] text-warning-amber font-mono-label tracking-widest uppercase mb-3 font-bold flex items-center gap-2">
                  <span>🔥</span> Streak
                </div>
                <div className="relative z-10 text-3xl sm:text-4xl font-mono text-warning-amber font-black">{profileData.stats.currentStreak} d</div>
              </div>
            </div>

            {/* TWO COLUMNS: Heatmap + Subjects on Left, Recent Activity on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 space-y-6">
                {/* CALENDAR HEATMAP */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Activity Calendar</h3>
                    <span className="text-[10px] text-on-surface-variant font-mono-label tracking-widest uppercase font-bold">Last 90 Days</span>
                  </div>
                  <div className="overflow-x-auto w-full pb-4 custom-scrollbar">
                    <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-fit min-w-max">
                      {Array.from({ length: 91 }).map((_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() - (90 - i));
                        const dStr = d.toISOString().split('T')[0];
                        const entry = profileData.heatmap.find(h => h.date === dStr);
                        const count = entry ? entry.count : 0;
                        
                        let bgClass = "bg-white/5 border border-white/5";
                        if (count > 0 && count <= 5) bgClass = "bg-cyber-green/20 border border-cyber-green/30";
                        else if (count > 5 && count <= 15) bgClass = "bg-cyber-green/50 border border-cyber-green/60";
                        else if (count > 15) bgClass = "bg-cyber-green border border-cyber-green shadow-[0_0_8px_rgba(16,185,129,0.3)]";

                        return (
                          <div 
                            key={i} 
                            title={`${dStr}: ${count} questions`}
                            className={`w-[11px] h-[11px] rounded-[2px] ${bgClass}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-on-surface-variant justify-end">
                    <span>Less</span>
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-white/5 border border-white/5" />
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-cyber-green/20 border border-cyber-green/30" />
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-cyber-green/50 border border-cyber-green/60" />
                    <div className="w-[11px] h-[11px] rounded-[2px] bg-cyber-green border border-cyber-green" />
                    <span>More</span>
                  </div>
                </div>

                {/* SUBJECT BREAKDOWN */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-6 text-white">Subject Accuracy</h3>
                  <div className="space-y-5">
                    {profileData.breakdown.length === 0 ? (
                      <p className="text-on-surface-variant italic text-sm">No subject data yet.</p>
                    ) : (
                      profileData.breakdown.map((subject, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-white">{subject.subject || "Mixed"}</span>
                            <span className="text-on-surface-variant font-mono text-xs">{subject.accuracy}% ({subject.correct}/{subject.total})</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-electric-violet to-cyber-green rounded-full transition-all duration-500"
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                  <h3 className="text-lg font-bold mb-6 text-white">Recent Activity</h3>
                  <div className="space-y-3">
                    {profileData.recentActivity.length === 0 ? (
                      <p className="text-on-surface-variant italic text-sm">No recent activity.</p>
                    ) : (
                      profileData.recentActivity.map((attempt) => (
                        <div key={attempt.id} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className={`mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full ${attempt.isCorrect ? "bg-cyber-green shadow-[0_0_6px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white truncate">
                              {attempt.subject || "Question Practice"}
                            </div>
                            <div className="text-xs text-on-surface-variant mt-1">
                              {new Date(attempt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                            </div>
                          </div>
                          <div className="text-xs font-mono text-on-surface-variant bg-white/5 px-2 py-1 rounded-md">
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
      <FollowListModal 
        isOpen={followModal.isOpen} 
        onClose={() => setFollowModal(prev => ({ ...prev, isOpen: false }))} 
        userId={session.user.id} 
        initialTab={followModal.tab} 
      />
    </div>
  );
}
