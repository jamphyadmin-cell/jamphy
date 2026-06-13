"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvitesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const menuRef = useRef(null);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setInvites(data.invites || []);
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Check every 10s
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

  const handleDismissNotification = async (notificationId) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId })
      });
      if (res.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalCount = invites.length + notifications.length;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right transition-all">
          <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-950">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Notifications</p>
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {totalCount === 0 ? (
              <div className="p-4 text-center text-sm text-zinc-500">
                No new notifications
              </div>
            ) : (
              <>
                {/* Render Warnings */}
                {notifications.map(notification => (
                  <div key={notification.id} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-2 last:mb-2 border-zinc-800/50">
                    <div className="flex justify-between items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-extrabold text-red-400 bg-red-950/40 px-2 py-0.5 rounded uppercase tracking-wider">
                        Warning
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 mb-3 leading-normal font-medium">
                      {notification.message}
                    </p>
                    <button 
                      onClick={() => handleDismissNotification(notification.id)}
                      className="w-full py-1.5 text-xs font-bold text-zinc-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                    >
                      Dismiss
                    </button>
                  </div>
                ))}

                {/* Render Game Invites */}
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
                        className="flex-1 py-1.5 text-xs font-bold text-black bg-white rounded-lg hover:bg-zinc-200 transition"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
