"use client";

import Link from "next/link";

export default function IITJamPrepPlatform() {

  const features = [
    "Chapter-wise PYQs",
    "Real CBT Exam Interface",
    "Bookmarks & Revision",
    "Detailed Solutions",
    "Performance Analytics",
    "Custom Mock Tests",
  ];

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      {/* NAVBAR */}

      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold tracking-tight">
              JAM Physics Hub
            </h1>

            <p className="text-zinc-400 text-sm">
              IIT JAM Physics Preparation Platform
            </p>

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

      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="max-w-4xl mx-auto text-center">

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

          <div className="grid grid-cols-3 gap-8 mt-20">

            <div>

              <h3 className="text-4xl font-black">
                8.5k+
              </h3>

              <p className="text-zinc-400 mt-2">
                Physics PYQs
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black">
                20+
              </h3>

              <p className="text-zinc-400 mt-2">
                Years Covered
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black">
                24/7
              </h3>

              <p className="text-zinc-400 mt-2">
                Practice Access
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-black">
            Everything for IIT JAM Physics
          </h2>

          <p className="text-zinc-400 mt-4 text-lg">
            Focused entirely on IIT JAM Physics preparation.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature, idx) => (

            <div
              key={idx}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:bg-zinc-800/70 transition"
            >

              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl mb-5">
                {idx + 1}
              </div>

              <h3 className="text-xl font-bold">
                {feature}
              </h3>

              <p className="text-zinc-400 mt-3 leading-relaxed">
                Prepare smarter with structured practice,
                analytics, and realistic CBT-style exams.
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>

  );
}