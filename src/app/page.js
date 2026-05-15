"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import UserMenu from "../components/UserMenu";

export default function IITJamPrepPlatform() {
  const { data: session } = useSession();
  const cursorRef = useRef(null);

  useEffect(() => {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {

      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (cursorRef.current) {

        cursorRef.current.style.transform =
          `translate(${currentX}px, ${currentY}px)`;

      }

      requestAnimationFrame(animate);

    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };

  }, []);

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden cursor-none">

      {/* SMOOTH CURSOR */}

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* NAVBAR */}

      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="rounded-2xl"
            />

          </div>

          <div className="flex gap-3 items-center">

            <UserMenu session={session} />

            <Link
              href="/questions"
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

          <div className="mt-12 flex justify-center">

            <Link
              href="/questions"
              className="px-8 py-4 rounded-3xl bg-white text-black text-xl font-bold hover:scale-105 transition"
            >
              Explore Questions
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}