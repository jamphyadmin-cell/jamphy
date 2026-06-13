"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import UserMenu from "../components/UserMenu";
import InvitesMenu from "../components/InvitesMenu";
import ActivityRing from "@/components/ActivityRing";
import GoalSettingsModal from "@/components/GoalSettingsModal";
import { useTransitionContext } from "../components/TransitionProvider";
import { motion, AnimatePresence } from "framer-motion";

let hasLoadedSplash = false;

export default function IITJamPrepPlatform() {
  const { data: session, status } = useSession();
  const { navigateWithTransition } = useTransitionContext();
  const cursorRef = useRef(null);
  const [showSplash, setShowSplash] = useState(!hasLoadedSplash);

  useEffect(() => {
    if (!hasLoadedSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        hasLoadedSplash = true;
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;

    let currentX = -100;
    let currentY = -100;

    const moveCursor = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

    };

    window.addEventListener("mousemove", moveCursor);

    let animationFrameId;

    const animate = () => {

      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;

      if (cursorRef.current) {

        cursorRef.current.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0)`;

      }

      animationFrameId = requestAnimationFrame(animate);

    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrameId);
    };

  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-10">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src="/logo.png"
                  alt="Jamphy Logo"
                  width={240}
                  height={65}
                  className="object-contain"
                  priority
                />
              </motion.div>
              
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Central subtle orbit path */}
                <div className="absolute w-20 h-20 rounded-full border border-white/5 bg-transparent"></div>
                {/* Orbiting glowing ball */}
                <div className="orbit-ball"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* SMOOTH CURSOR */}

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />

      {/* NAVBAR */}

      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Image
              src="/logo.png"
              alt="Logo"
              width={148}
              height={40}
              className="rounded-xl object-contain"
              priority
            />

          </div>

          <div className="flex gap-3 items-center">

            {session?.user && <InvitesMenu />}

            <UserMenu session={session} />

            <Link
              href="/questions"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/questions");
              }}
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Start Practicing
            </Link>

          </div>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="min-h-[85vh] flex items-center justify-center px-6">

        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 mb-8">
            Built for IIT JAM Physics Aspirants
          </div>

          <h2 className="text-6xl lg:text-8xl font-black leading-tight">

            Practice IIT JAM Physics

            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
              smarter.
            </span>

          </h2>

          <p className="mt-8 text-zinc-400 text-xl leading-relaxed max-w-3xl mx-auto">
            Solve chapter-wise previous year questions,
            practice MCQ/MSQ/NAT formats,
            and prepare with a modern IIT JAM experience.
          </p>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">

            <Link
              href="/questions"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/questions");
              }}
              className="px-8 py-4 rounded-3xl bg-white text-black text-xl font-bold hover:scale-105 transition"
            >
              Explore Questions
            </Link>

          </div>

        </div>

      </section>



    </div>
  </>
  );
}