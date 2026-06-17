"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";

export default function Navbar({ session, actionButton, title }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={140}
                className="rounded-xl sm:rounded-2xl w-24 sm:w-[140px] md:w-[200px]"
              />
            </Link>
            {title && (
              <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-500 hidden sm:block">
                {title}
              </span>
            )}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex gap-3 items-center">
            {actionButton}
            <UserMenu session={session} />
          </div>

          {/* Mobile Actions: UserMenu + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <UserMenu session={session} />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 p-4 space-y-3">
          {actionButton && (
            <div className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              {actionButton}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
