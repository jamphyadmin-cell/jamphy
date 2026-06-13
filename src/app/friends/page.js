"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "@/components/UserMenu";
import { LEAGUE_COLORS } from "@/lib/constants";

export default function FriendsPage() {
  const { data: session, status } = useSession();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/friends/list")
        .then(res => res.json())
        .then(data => {
          setFriends(data.friends || []);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Friends</h1>
        <p className="text-zinc-400 mb-8">Sign in to see what your friends are doing.</p>
        <Link href="/" className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={160} height={160} className="rounded-2xl" />
          </Link>
          <UserMenu session={session} />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Friends</h1>
            <p className="text-zinc-400">Follow other aspirants and stay motivated.</p>
          </div>
          <Link href="/leaderboard" className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl font-bold hover:bg-zinc-800 transition">
            Find Friends
          </Link>
        </div>

        {friends.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl">
            <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">👋</div>
            <h3 className="text-2xl font-bold mb-2">It's quiet here</h3>
            <p className="text-zinc-400 mb-8 max-w-sm mx-auto">Follow users from the leaderboard to track their daily progress and streaks.</p>
            <Link href="/leaderboard" className="px-8 py-4 bg-cyan-600 text-white rounded-2xl font-bold text-lg hover:bg-cyan-500 transition">
              Find people to follow
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {friends.map((friend, index) => (
              <div key={friend.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6 hover:border-zinc-700 transition">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-xl font-black text-zinc-700 w-6 text-center">{index + 1}</div>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 relative flex-shrink-0">
                    {friend.image ? (
                      <Image src={friend.image} alt={friend.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500">
                        {friend.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <Link href={`/profile/${friend.id}`} className="font-bold text-xl text-white hover:text-cyan-400 transition">{friend.name}</Link>
                    <div className="text-sm font-bold mt-1" style={{color: LEAGUE_COLORS[friend.league]}}>{friend.league} League</div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                  <div className="text-center">
                    <div className="text-2xl font-black flex items-center gap-1 justify-center">
                      <span className="text-orange-500">🔥</span>
                      {friend.streak}
                    </div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Streak</div>
                  </div>
                  
                  <div className="w-px h-10 bg-zinc-800"></div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{friend.todayTotal}</div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Today</div>
                  </div>
                  
                  <div className="w-px h-10 bg-zinc-800"></div>
                  
                  <div className="text-center">
                    <div className={`text-2xl font-black ${friend.accuracy >= 80 ? 'text-green-400' : friend.accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {friend.accuracy}%
                    </div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Accuracy</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
