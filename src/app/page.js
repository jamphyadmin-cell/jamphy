"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function IITJamPrepPlatform() {

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {

    const moveCursor = (e) => {

      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };

  }, []);

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* SMOOTH CURSOR */}

      <div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150"
        style={{
          transform: `translate(${cursorPosition.x - 12}px, ${cursorPosition.y - 12}px)`,
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

          <div className="flex gap-3">

            <button
              onClick={() =>
                alert("Login system coming soon")
              }
              className="px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition"
            >
              Login
            </button>

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

            <span className="group relative inline-block cursor-default">

              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text transition-all duration-500 group-hover:italic group-hover:tracking-widest group-hover:scale-110">
                smarter.
              </span>

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