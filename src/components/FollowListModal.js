"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then(res => res.json());

export default function FollowListModal({ isOpen, onClose, userId, initialTab = "followers" }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [localNetwork, setLocalNetwork] = useState({ followers: [], following: [] });

  const { data, error, isLoading } = useSWR(
    isOpen && userId ? `/api/user/${userId}/network` : null,
    fetcher
  );

  useEffect(() => {
    if (data && !data.error) {
      setLocalNetwork({
        followers: data.followers || [],
        following: data.following || []
      });
    }
  }, [data]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const currentUserId = session?.user?.id;

  const handleFollowToggle = async (targetUser) => {
    if (!currentUserId) return; // Prompt login or handle unauthenticated
    const isCurrentlyFollowing = targetUser.isFollowing;
    const action = isCurrentlyFollowing ? "unfollow" : "follow";

    // Optimistically update UI
    const updateList = (list) =>
      list.map(u => u.id === targetUser.id ? { ...u, isFollowing: !isCurrentlyFollowing } : u);

    setLocalNetwork(prev => ({
      followers: updateList(prev.followers),
      following: updateList(prev.following)
    }));

    try {
      const res = await fetch("/api/friends/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: targetUser.id, action })
      });
      if (!res.ok) throw new Error("Failed to follow/unfollow");
    } catch (err) {
      // Revert optimistic update
      setLocalNetwork(prev => ({
        followers: updateList(prev.followers).map(u => u.id === targetUser.id ? { ...u, isFollowing: isCurrentlyFollowing } : u),
        following: updateList(prev.following).map(u => u.id === targetUser.id ? { ...u, isFollowing: isCurrentlyFollowing } : u)
      }));
    }
  };

  const usersToDisplay = (activeTab === "followers" ? localNetwork.followers : localNetwork.following) || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Network</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800">
          <button
            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === "followers" ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          <button
            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === "following" ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">Failed to load users</div>
          ) : usersToDisplay.length === 0 ? (
            <div className="text-center text-zinc-500 py-12">
              {activeTab === "followers" ? "No followers yet." : "Not following anyone."}
            </div>
          ) : (
            usersToDisplay.map(u => (
              <div key={u.id} className="flex items-center justify-between gap-3 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800/50">
                <Link href={`/profile/${u.id}`} onClick={onClose} className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                    {u.image ? (
                      <Image src={u.image} alt={u.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        {u.name ? u.name[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-white text-sm truncate">{u.name}</span>
                    <span className="text-xs text-zinc-500 truncate">@{u.username || u.id.substring(0,8)}</span>
                  </div>
                </Link>
                
                {currentUserId && currentUserId !== u.id && (
                  <button
                    onClick={() => handleFollowToggle(u)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                      u.isFollowing 
                        ? "bg-zinc-800 text-white hover:bg-red-500 hover:text-white border border-zinc-700 hover:border-red-500" 
                        : "bg-white text-black hover:scale-105"
                    }`}
                  >
                    {u.isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
