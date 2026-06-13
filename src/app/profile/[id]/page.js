"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { LEAGUE_COLORS } from "@/lib/constants";

export default function PublicProfilePage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profileData, setProfileData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <Link href="/leaderboard" className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold">Return to Leaderboard</Link>
      </div>
    );
  }

  const { user, stats } = profileData;

  // Don't show public profile if viewing own profile, redirect to /profile
  if (session?.user?.id === user.id) {
    router.replace("/profile");
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={148} height={40} className="rounded-xl object-contain" priority />
          </Link>
          <UserMenu session={session} />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background glow based on league */}
          <div 
            className="absolute top-0 left-0 right-0 h-32 opacity-20"
            style={{ background: `linear-gradient(to bottom, ${LEAGUE_COLORS[user.currentLeague] || '#0a84ff'}, transparent)` }}
          ></div>
          
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
              <h1 className="text-3xl md:text-4xl font-black mb-2">{user.name}</h1>
              <div className="text-sm font-bold mb-6" style={{color: LEAGUE_COLORS[user.currentLeague]}}>
                {user.currentLeague} League
              </div>
              
              <div className="flex justify-center md:justify-start gap-8 mb-8">
                <div>
                  <div className="text-2xl font-black text-white">{stats.followersCount}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stats.followingCount}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Following</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400">{stats.totalPoints}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">XP</div>
                </div>
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
      </main>
    </div>
  );
}
