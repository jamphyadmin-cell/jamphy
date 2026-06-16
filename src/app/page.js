"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import UserMenu from "../components/UserMenu";
import ActivityRing from "@/components/ActivityRing";
import GoalSettingsModal from "@/components/GoalSettingsModal";

export default function IITJamPrepPlatform() {
  const { data: session, status } = useSession();
  const cursorRef = useRef(null);
  const [goalData, setGoalData] = useState({ target: 50, completed: 0, percentage: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendsActivity, setFriendsActivity] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/goals/today")
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setGoalData(data);
          }
        })
        .catch(console.error);

      fetch("/api/friends/activity")
        .then(res => res.json())
        .then(data => {
          if (data.activities) {
            setFriendsActivity(data.activities);
          }
        }).catch(console.error);
    }
    const timer = setTimeout(() => setCurrentTime(Date.now()), 0);
    return () => clearTimeout(timer);
  }, [status]);

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

          <div className="mt-12 flex justify-center gap-4 flex-wrap">

            <Link
              href="/questions"
              className="px-8 py-4 rounded-3xl bg-white text-black text-xl font-bold hover:scale-105 transition"
            >
              Explore Questions
            </Link>

            <Link
              href="/sprint"
              className="px-8 py-4 rounded-3xl bg-zinc-900 border border-zinc-700 text-white text-xl font-bold hover:bg-zinc-800 hover:border-zinc-500 hover:scale-105 transition"
            >
              Sprint Mode
            </Link>

            <Link
              href="/analytics"
              className="px-8 py-4 rounded-3xl bg-zinc-900 border border-zinc-700 text-cyan-400 text-xl font-bold hover:bg-zinc-800 hover:border-zinc-500 hover:scale-105 transition"
            >
              Analytics
            </Link>

          </div>

        </div>

      </section>

      {/* DASHBOARD WIDGETS */}
      {status === "authenticated" && (
        <section className="pb-24 px-6 flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
          {/* YOUR PROGRESS TODAY */}
          <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-10 flex flex-col items-center flex-1 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">Your Progress Today</h3>
            <div className="mb-4">
              <ActivityRing 
                percentage={goalData.percentage} 
                size={160} 
                onClick={() => setIsModalOpen(true)} 
              />
            </div>
            <p className="text-zinc-400 text-center mt-4 mb-2 text-sm">
              You&apos;ve completed <strong className="text-white">{goalData.completed}</strong> out of <strong className="text-white">{goalData.target}</strong> questions.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-wider transition-colors"
            >
              Edit Daily Goal
            </button>
          </div>
          
          {/* FRIENDS ACTIVITY */}
          <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-10 flex flex-col flex-1 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Friends Activity</h3>
              <Link href="/friends" className="text-cyan-400 text-sm font-bold hover:underline">View All</Link>
            </div>
            
            {friendsActivity.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="text-4xl mb-4">👥</div>
                <p className="text-zinc-500 text-sm mb-4">No friends have practiced today yet, or you aren&apos;t following anyone.</p>
                <Link href="/leaderboard" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-bold hover:bg-zinc-800 transition">
                  Find Friends
                </Link>
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                {friendsActivity.map(friend => (
                  <div key={friend.id} className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 relative flex-shrink-0">
                      {friend.image ? (
                        <Image src={friend.image} alt={friend.name} fill className="object-cover" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold bg-gradient-to-br from-indigo-500 to-purple-500 text-sm">
                          {friend.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white line-clamp-1">{friend.name}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Practiced {currentTime ? Math.round((currentTime - new Date(friend.lastActive).getTime()) / 60000) : 0}m ago</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-white">{friend.todayTotal}</div>
                      <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Qs</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {isModalOpen && (
        <GoalSettingsModal
          currentTarget={goalData.target}
          onClose={() => setIsModalOpen(false)}
          onSave={(newTarget) => {
            setIsModalOpen(false);
            setGoalData(prev => ({
              ...prev,
              target: newTarget,
              percentage: (prev.completed / newTarget) * 100
            }));
          }}
        />
      )}

    </div>
  );
}