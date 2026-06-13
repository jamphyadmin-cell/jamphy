"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/vault')
        .then(res => res.json())
        .then(data => {
          if (data.vaultItems) {
            const now = new Date();
            const count = data.vaultItems.filter(item => new Date(item.nextReviewDate) <= now).length;
            setDueCount(count);
          }
        })
        .catch(console.error);
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted || status === "loading") {
    return (
      <div className="w-[38px] h-[38px] rounded-full border border-zinc-800 bg-transparent flex items-center justify-center shrink-0">
        <div className="w-4 h-4 border-2 border-zinc-750 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition text-sm font-medium h-[40px] shrink-0"
      >
        Login with
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            width={38}
            height={38}
            className="rounded-full border-2 border-transparent hover:border-zinc-600 transition-all cursor-pointer object-cover"
          />
        ) : (
          <div className="w-[38px] h-[38px] rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border-2 border-transparent hover:border-zinc-600 transition-all cursor-pointer">
            {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </button>
      
      {dueCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 transform origin-top-right transition-all">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-sm font-medium text-white truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-zinc-400 truncate">
              {session.user?.email}
            </p>
          </div>
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Profile
            </Link>
            <Link
              href="/analytics"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-cyan-400 hover:bg-zinc-800 hover:text-cyan-300 transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Leaderboard
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
