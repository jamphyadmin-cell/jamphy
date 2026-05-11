"use client";

import { useState } from "react";
import Link from "next/link";

export default function IITJamPrepPlatform() {

  const [showMockTest, setShowMockTest] =
    useState(false);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [showSolution, setShowSolution] =
    useState(false);

  const subjects = [
    {
      name: "Mathematical Physics",
      questions: "1,250+ Questions",
      color: "from-blue-500 to-cyan-400",
    },

    {
      name: "Quantum Mechanics",
      questions: "1,480+ Questions",
      color: "from-purple-500 to-pink-400",
    },

    {
      name: "Electrodynamics",
      questions: "920+ Questions",
      color: "from-green-500 to-emerald-400",
    },

    {
      name: "Thermodynamics",
      questions: "870+ Questions",
      color: "from-orange-500 to-yellow-400",
    },
  ];

  const features = [
    "Chapter-wise PYQs",
    "Real CBT Exam Interface",
    "Bookmarks & Revision",
    "Detailed Solutions",
    "Performance Analytics",
    "Custom Mock Tests",
  ];

  const mockStats = [
    {
      title: "Questions Solved",
      value: "12,430",
    },

    {
      title: "Mock Tests",
      value: "186",
    },

    {
      title: "Physics Chapters",
      value: "9",
    },
  ];

  const chapters = [
    "Classical Mechanics",
    "Quantum Mechanics",
    "Electrodynamics",
    "Thermodynamics",
    "Electronics",
    "Mathematical Physics",
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

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 mb-6">
              Built for IIT JAM Physics Aspirants
            </div>

            <h2 className="text-5xl lg:text-6xl font-black leading-tight">

              Practice IIT JAM Physics

              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                smarter.
              </span>

            </h2>

            <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
              Solve chapter-wise previous year questions,
              attempt realistic CBT mock tests,
              and improve with detailed analytics.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/questions"
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold hover:opacity-90 transition inline-block"
              >
                Explore Questions
              </Link>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">

              <div>

                <h3 className="text-3xl font-black">
                  8.5k+
                </h3>

                <p className="text-zinc-400">
                  Physics PYQs
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-black">
                  20+
                </h3>

                <p className="text-zinc-400">
                  Years Covered
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-black">
                  24/7
                </h3>

                <p className="text-zinc-400">
                  Practice Access
                </p>

              </div>

            </div>

          </div>

          {/* DASHBOARD CARD */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h3 className="font-bold text-xl">
                  Physics Dashboard
                </h3>

                <p className="text-zinc-400 text-sm">
                  Your current preparation status
                </p>

              </div>

              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                78% Accuracy
              </div>

            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">

              {mockStats.map((item, idx) => (

                <div
                  key={idx}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                >

                  <p className="text-zinc-400 text-sm">
                    {item.title}
                  </p>

                  <h3 className="text-2xl font-black mt-2">
                    {item.value}
                  </h3>

                </div>

              ))}

            </div>

            <div className="space-y-4">

              {chapters.map((chapter, idx) => (

                <div
                  key={idx}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                >

                  <div className="flex items-center justify-between mb-2">

                    <p className="font-medium">
                      {chapter}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {60 + idx * 5}%
                    </p>

                  </div>

                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{
                        width: `${60 + idx * 5}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* SUBJECT MODULES */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-black">
              Physics Modules
            </h2>

            <p className="text-zinc-400 mt-2">
              Master every IIT JAM Physics chapter.
            </p>

          </div>

          <Link
            href="/questions"
            className="border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-900 transition"
          >
            View All
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {subjects.map((subject, idx) => (

            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:-translate-y-1 transition duration-300"
            >

              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${subject.color}`}
              />

              <div className="relative z-10">

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.color} mb-6`}
                />

                <h3 className="text-2xl font-bold">
                  {subject.name}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {subject.questions}
                </p>

                <Link
                  href="/questions"
                  className="mt-6 w-full bg-white text-black font-semibold py-3 rounded-xl hover:opacity-90 transition block text-center"
                >
                  Practice Now
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );
}