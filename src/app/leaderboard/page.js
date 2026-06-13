"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const LEAGUE_COLORS = {
  Bronze: "#cd7f32",
  Silver: "#c0c0c0",
  Gold: "#ffd700",
  Platinum: "#e5e4e2",
  Diamond: "#b9f2ff",
};

const LEAGUE_THRESHOLDS = {
  Bronze: 0,
  Silver: 501,
  Gold: 2001,
  Platinum: 5001,
  Diamond: 15000
};

const LEAGUES = ["All", "Following", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export default function LeaderboardPage() {
  const { data: session, status } = useSession();
  const [timeTab, setTimeTab] = useState("weekly");
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [myFollows, setMyFollows] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsSearching(true);
      const timer = setTimeout(async () => {
        try {
          const res = await fetch(`/api/users/search?q=${searchQuery}`);
          const data = await res.json();
          setSearchResults(data.users || []);
          setShowSearchDropdown(true);
        } catch (e) {
          console.error(e);
        } finally {
          setIsSearching(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?time=${timeTab}&league=${selectedLeague}`);
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
      setCurrentUser(data.currentUser || null);
      if (data.myFollows) {
        setMyFollows(new Set(data.myFollows));
      }
      
      if (selectedLeague === "All" && data.currentUser && data.currentUser.currentLeague && !window.hasAutoSelectedLeague) {
        window.hasAutoSelectedLeague = true;
        setSelectedLeague(data.currentUser.currentLeague);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeTab, selectedLeague, status]);

  const getPointsField = () => timeTab === "weekly" ? "weeklyPoints" : "allTimePoints";

  const toggleFollow = async (targetUserId) => {
    const isFollowing = myFollows.has(targetUserId);
    try {
      const res = await fetch("/api/friends/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, action: isFollowing ? "unfollow" : "follow" })
      });
      if (res.ok) {
        setMyFollows(prev => {
          const next = new Set(prev);
          if (isFollowing) next.delete(targetUserId);
          else next.add(targetUserId);
          return next;
        });
        if (selectedLeague === "Following" && isFollowing) {
          // Refetch to remove unfollowed user
          fetchLeaderboard();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderPromotionBanner = () => {
    if (!currentUser) return null;
    const pts = currentUser.totalPoints;
    let nextLeague = null;
    let required = 0;

    if (pts < LEAGUE_THRESHOLDS.Silver) { nextLeague = "Silver"; required = LEAGUE_THRESHOLDS.Silver; }
    else if (pts < LEAGUE_THRESHOLDS.Gold) { nextLeague = "Gold"; required = LEAGUE_THRESHOLDS.Gold; }
    else if (pts < LEAGUE_THRESHOLDS.Platinum) { nextLeague = "Platinum"; required = LEAGUE_THRESHOLDS.Platinum; }
    else if (pts < LEAGUE_THRESHOLDS.Diamond) { nextLeague = "Diamond"; required = LEAGUE_THRESHOLDS.Diamond; }

    if (nextLeague && (required - pts) <= 100) {
      return (
        <div className="mb-8 p-4 rounded-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="animate-pulse w-2 h-2 rounded-full bg-green-500 block"></span>
              Promotion Imminent!
            </h4>
            <p className="text-zinc-400 text-sm mt-1">
              You are just <strong className="text-white">{required - pts} points</strong> away from <span style={{color: LEAGUE_COLORS[nextLeague]}}>{nextLeague}</span> league. Keep practicing!
            </p>
          </div>
          <Link href="/questions" className="px-4 py-2 bg-white text-black text-sm font-bold rounded-xl hover:scale-105 transition">
            Practice
          </Link>
        </div>
      );
    }
    return null;
  };

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Leaderboard</h1>
          <p className="text-zinc-400 mb-6">Compete with other aspirants. +10 for correct, -3 for incorrect.</p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto z-40">
            <input 
              type="text" 
              placeholder="Search users to follow..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchQuery.length >= 3) setShowSearchDropdown(true); }}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-cyan-500/50 transition-colors"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
            )}
            
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-64 overflow-y-auto text-left">
                {searchResults.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border-b border-zinc-800/50 hover:bg-zinc-800 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 relative flex-shrink-0">
                        {user.image ? (
                          <Image src={user.image} alt={user.name} fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-indigo-500 to-purple-500">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <Link href={`/profile/${user.id}`} className="font-bold text-white hover:text-cyan-400 transition">{user.name}</Link>
                        <div className="text-xs text-zinc-500" style={{color: LEAGUE_COLORS[user.currentLeague]}}>{user.currentLeague}</div>
                      </div>
                    </div>
                    {!user.isSelf && (
                      <button 
                        onClick={() => toggleFollow(user.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition ${
                          myFollows.has(user.id) 
                          ? "border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700" 
                          : "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                        }`}
                      >
                        {myFollows.has(user.id) ? "Following" : "Follow"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {showSearchDropdown && searchQuery.length >= 3 && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center text-zinc-500 shadow-2xl">
                No users found
              </div>
            )}
          </div>
        </div>

        {renderPromotionBanner()}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-zinc-900 p-1 rounded-2xl flex gap-1 border border-zinc-800">
            <button 
              onClick={() => setTimeTab("weekly")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors ${timeTab === "weekly" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeTab("allTime")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors ${timeTab === "allTime" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Leagues */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {LEAGUES.map(league => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              style={selectedLeague === league && league !== "All" ? { borderColor: LEAGUE_COLORS[league], color: LEAGUE_COLORS[league] } : {}}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                selectedLeague === league 
                  ? (league === "All" || league === "Following") ? "border-white text-white bg-white/10" : "bg-zinc-900/50" 
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
              }`}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Board */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <div className="flex flex-col min-w-[500px]">
                <div className="grid grid-cols-[60px_1fr_100px_80px] md:grid-cols-[80px_1fr_120px_100px] p-4 border-b border-zinc-900 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <div className="text-center">Rank</div>
                  <div>User</div>
                  <div className="text-right">Points</div>
                  <div className="text-right">Accuracy</div>
                </div>

              <div className="flex flex-col relative z-10">
                <AnimatePresence>
                  {leaderboard.length === 0 && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-8 text-center text-zinc-500 font-medium">
                      No scores yet — start practicing to appear here.
                    </motion.div>
                  )}
                  {leaderboard.map((user, idx) => {
                    const acc = user.questionsAttempted > 0 ? Math.round((user.correctAnswers / user.questionsAttempted) * 100) : 0;
                    const isMe = currentUser && currentUser.userId === user.userId;
                    return (
                      <motion.div 
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`grid grid-cols-[60px_1fr_100px_80px] md:grid-cols-[80px_1fr_120px_100px] p-4 items-center border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors ${isMe ? "bg-zinc-900/50" : ""}`}
                      >
                        <div className="text-center font-bold text-zinc-400">
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                        </div>
                        <div className="flex items-center gap-3 overflow-hidden">
                          {user.user.image ? (
                            <Image src={user.user.image} alt={user.user.name || "User"} width={36} height={36} className="rounded-full" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">
                              {user.user.name ? user.user.name[0].toUpperCase() : "U"}
                            </div>
                          )}
                          <div className="truncate">
                            <div className="font-bold text-sm md:text-base text-zinc-200 truncate flex items-center gap-2">
                              {user.user.name || "Anonymous"}
                              {isMe && <span className="text-[10px] bg-white text-black px-1.5 py-0.5 rounded uppercase tracking-wider">You</span>}
                            </div>
                            <div className="text-xs text-zinc-500 truncate" style={{color: LEAGUE_COLORS[user.currentLeague]}}>
                              {user.currentLeague}
                            </div>
                          </div>
                        </div>
                        <div className="text-right font-mono font-bold text-cyan-400">
                          {user[getPointsField()].toLocaleString()}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="text-right text-sm text-zinc-400">
                            {acc}% Acc
                          </div>
                          {session?.user && !isMe && (
                            <button
                              onClick={() => toggleFollow(user.userId)}
                              className={`text-xs px-3 py-1 rounded-full font-bold border ${
                                myFollows.has(user.userId)
                                  ? "bg-zinc-800 text-white border-zinc-700 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
                                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20"
                              }`}
                            >
                              {myFollows.has(user.userId) ? "Following" : "Follow"}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Current User Rank */}
      {currentUser && (
        <div className="fixed bottom-0 left-0 w-full border-t border-zinc-800 bg-zinc-950/90 backdrop-blur z-40">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white">
                #{currentUser.rank || "-"}
              </div>
              <div>
                <div className="font-bold text-white text-sm">Your Current Rank</div>
                <div className="text-xs font-bold" style={{color: LEAGUE_COLORS[currentUser.currentLeague]}}>
                  {currentUser.currentLeague} League
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-cyan-400 text-lg">{currentUser[getPointsField()].toLocaleString()} pts</div>
              <div className="text-xs text-zinc-500">
                {currentUser.questionsAttempted > 0 ? Math.round((currentUser.correctAnswers / currentUser.questionsAttempted) * 100) : 0}% Accuracy
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
