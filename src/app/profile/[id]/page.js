"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { useTransitionContext } from "@/components/TransitionProvider";
import Navbar from "@/components/Navbar";
import FollowListModal from "@/components/FollowListModal";

export default function PublicProfilePage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { navigateWithTransition } = useTransitionContext();

  const [profileData, setProfileData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followModal, setFollowModal] = useState({ isOpen: false, tab: "followers" });

  useEffect(() => {
    if (!id) return;
    
    fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setProfileData(data);
          setIsFollowing(data.isFollowing);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id, status]);

  const toggleFollow = async () => {
    if (status !== "authenticated") {
      alert("Please sign in to follow users.");
      return;
    }
    
    // Optimistic update
    setIsFollowing(!isFollowing);
    setProfileData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        followersCount: prev.stats.followersCount + (isFollowing ? -1 : 1)
      }
    }));
    
    try {
      const res = await fetch("/api/friends/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: id, action: isFollowing ? "unfollow" : "follow" })
      });
      
      if (!res.ok) {
        // Revert on error
        setIsFollowing(isFollowing);
        setProfileData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            followersCount: prev.stats.followersCount + (isFollowing ? 1 : -1)
          }
        }));
      }
    } catch (e) {
      console.error(e);
      // Revert on error
      setIsFollowing(isFollowing);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profileData?.user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">User not found</h1>
        <Link href="/" className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold">Go Home</Link>
      </div>
    );
  }

  const { user, stats, heatmap, breakdown, recentActivity } = profileData;

  // Don't show public profile if viewing own profile, redirect to /profile
  if (session?.user?.id === user.id) {
    router.replace("/profile");
    return null;
  }

  const hasStats = stats.totalQuestions !== undefined;
  const hasStreak = stats.currentStreak !== undefined;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <Navbar session={session} />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* HERO CARD */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-800 relative shadow-xl border-4 border-black">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" sizes="128px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500">
                  {user.name?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black mb-6">{user.name}</h1>
              
              <div className="flex justify-center md:justify-start gap-8 mb-8">
                <button 
                  onClick={() => setFollowModal({ isOpen: true, tab: "followers" })}
                  className="hover:scale-105 transition"
                >
                  <div className="text-2xl font-black text-white">{stats.followersCount}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Followers</div>
                </button>
                <button 
                  onClick={() => setFollowModal({ isOpen: true, tab: "following" })}
                  className="hover:scale-105 transition"
                >
                  <div className="text-2xl font-black text-white">{stats.followingCount}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Following</div>
                </button>
              </div>
              
              <button 
                onClick={toggleFollow}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                  isFollowing 
                  ? "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white" 
                  : "bg-cyan-600 hover:bg-cyan-500 text-white"
                }`}
              >
                {isFollowing ? (
                  <><span>Following</span> <span className="text-sm">✓</span></>
                ) : (
                  "Follow"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hasStats ? (
            <>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2 text-center">Total Questions</div>
                <div className="text-4xl font-mono text-white font-black">{stats.totalQuestions}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2 text-center">Correct</div>
                <div className="text-4xl font-mono text-emerald-400 font-black">{stats.totalCorrect}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
                <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2 text-center">Accuracy</div>
                <div className="text-4xl font-mono text-cyan-400 font-black">{stats.accuracy}%</div>
              </div>
            </>
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 col-span-2 md:col-span-3 text-center text-zinc-500 text-sm font-medium py-8 flex items-center justify-center">
              Stats are private.
            </div>
          )}

          {hasStreak ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-orange-500/5" />
              <div className="relative z-10 text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-orange-500">🔥</span> Streak
              </div>
              <div className="relative z-10 text-4xl font-mono text-orange-400 font-black">{stats.currentStreak} d</div>
            </div>
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex items-center justify-center text-center text-zinc-500 text-sm font-medium py-8 relative overflow-hidden">
              Streak is private.
            </div>
          )}
        </div>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* HEATMAP */}
            {user.showHeatmapPublicly ? (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-6">Activity Calendar (Last 90 Days)</h3>
                <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-fit">
                  {Array.from({ length: 91 }).map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (90 - i));
                    const dStr = d.toISOString().split('T')[0];
                    const entry = heatmap?.find(h => h.date === dStr);
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
            ) : (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-500 text-sm font-medium py-12">
                Activity calendar is private.
              </div>
            )}

            {/* SUBJECTS ACCURACY */}
            {user.showSubjectsPublicly ? (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-6">Subject Accuracy</h3>
                <div className="space-y-4">
                  {!breakdown || breakdown.length === 0 ? (
                    <p className="text-zinc-500 italic">No subject data yet.</p>
                  ) : (
                    breakdown.map((subject, idx) => (
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
            ) : (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-500 text-sm font-medium py-12">
                Subject accuracy breakdown is private.
              </div>
            )}
          </div>

          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-1">
            {user.showActivityPublicly ? (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-full min-h-[300px]">
                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {!recentActivity || recentActivity.length === 0 ? (
                    <p className="text-zinc-500 italic">No recent activity.</p>
                  ) : (
                    recentActivity.map((attempt) => (
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
            ) : (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 h-full flex items-center justify-center text-center text-zinc-500 text-sm font-medium py-12">
                Recent activity is private.
              </div>
            )}
          </div>
        </div>
      </main>

      <FollowListModal 
        isOpen={followModal.isOpen} 
        onClose={() => setFollowModal(prev => ({ ...prev, isOpen: false }))} 
        userId={user.id} 
        initialTab={followModal.tab} 
      />
    </div>
  );
}
