"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvitesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const menuRef = useRef(null);
  const router = useRouter();

  const fetchInvites = async () => {
    try {
      const res = await fetch("/api/room/invites");
      if (res.ok) {
        const data = await res.json();
        setInvites(data.invites || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvites();
    const interval = setInterval(fetchInvites, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = async (inviteId, action) => {
    try {
      const res = await fetch("/api/room/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId, action })
      });
      const data = await res.json();
      
      if (res.ok) {
        setInvites(invites.filter(inv => inv.id !== inviteId));
        setIsOpen(false);
        if (action === "ACCEPT" && data.roomId) {
          router.push(`/room/${data.roomId}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (invites.length === 0) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {invites.length}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right transition-all">
          <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-950">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Pending Invites</p>
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {invites.map(invite => (
              <div key={invite.id} className="p-3 bg-black/40 rounded-xl mb-2 last:mb-0 border border-zinc-800/50">
                <p className="text-sm text-zinc-300 mb-3">
                  <span className="font-bold text-white">{invite.sender?.name || invite.sender?.username}</span> invited you to a Live Room
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAction(invite.id, "DECLINE")}
                    className="flex-1 py-1.5 text-xs font-bold text-zinc-400 bg-zinc-800 rounded-lg hover:bg-zinc-700 hover:text-white transition"
                  >
                    Decline
                  </button>
                  <button 
                    onClick={() => handleAction(invite.id, "ACCEPT")}
                    className="flex-1 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
