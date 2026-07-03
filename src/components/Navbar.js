"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";

export default function Navbar({ session, actionButton, title }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  return (
    <>
      <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + Title */}
            <div className="flex items-center gap-3 min-w-0 shrink-0">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="rounded-xl sm:rounded-2xl w-20 sm:w-[120px] md:w-[160px]"
                  priority
                />
              </Link>
              {title && (
                <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-500 hidden sm:block truncate">
                  {title}
                </span>
              )}
            </div>

            {/* Desktop right side */}
            <div className="hidden md:flex gap-4 items-center shrink-0">
              {session && (
                <Link href="/study-plan" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-base leading-none">auto_awesome</span>
                  Study Plan
                </Link>
              )}
              {actionButton}
              <UserMenu session={session} />
            </div>

            {/* Mobile: UserMenu + Hamburger */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              <UserMenu session={session} />
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none active:bg-zinc-800 transition"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-In Drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 md:hidden ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-zinc-950 border-l border-zinc-800 z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <Link href="/" onClick={() => setIsDrawerOpen(false)}>
            <Image src="/logo.png" alt="Logo" width={100} height={40} className="rounded-lg" />
          </Link>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg transition active:bg-zinc-800"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {session && (
            <Link
              href="/study-plan"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-electric-violet">auto_awesome</span>
              My Study Plan
            </Link>
          )}
          {session && (
            <Link
              href="/analytics"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-zinc-400">analytics</span>
              Analytics
            </Link>
          )}
          {session && (
            <Link
              href="/vault"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-zinc-400">bookmark</span>
              Mistakes Vault
            </Link>
          )}
          {session && (
            <Link
              href="/friends"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-zinc-400">group</span>
              Friends
            </Link>
          )}

          {/* Action button if any */}
          {actionButton && (
            <div className="pt-2" onClick={() => setIsDrawerOpen(false)}>
              {actionButton}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
