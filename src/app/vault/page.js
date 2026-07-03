"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TestInterface from "@/components/test/TestInterface";
import TestResult from "@/components/test/TestResult";
import Navbar from "@/components/Navbar";

export default function VaultPage() {
  const { data: session, status } = useSession();
  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [testState, setTestState] = useState("overview"); // overview, active, result
  const [dueQuestions, setDueQuestions] = useState([]);
  const [answers, setAnswers] = useState(null);
  const [dbQuestions, setDbQuestions] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/vault")
        .then((res) => res.json())
        .then((data) => {
          if (data.vaultItems) {
            setVaultItems(data.vaultItems);
          }
          if (data.questions) {
            setDbQuestions(data.questions);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const { totalItems, dueItems } = useMemo(() => {
    const now = new Date();
    const due = vaultItems.filter((item) => new Date(item.nextReviewDate) <= now);
    return {
      totalItems: vaultItems.length,
      dueItems: due,
    };
  }, [vaultItems]);

  const handleStartReview = () => {
    import("@/data/questions").then((module) => {
      const allQuestions = [...module.questions, ...dbQuestions];
      
      const loaded = dueItems.map(item => {
        const found = allQuestions.find(q => {
          const qStrId = String(q.id);
          const qYearId = `${q.year}-${q.id}`;
          return String(item.questionId) === qStrId || String(item.questionId) === qYearId;
        });
        return found;
      }).filter(Boolean);
      
      setDueQuestions(loaded);
      setTestState("active");
    });
  };

  const handleSubmit = (finalAnswers) => {
    setAnswers(finalAnswers);
    setTestState("result");
  };
  
  const handleClose = () => {
    setTestState("overview");
    setLoading(true);
    fetch("/api/vault")
      .then((res) => res.json())
      .then((data) => {
        if (data.vaultItems) setVaultItems(data.vaultItems);
        setLoading(false);
      });
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-obsidian-deep flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-electric-violet rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-obsidian-deep flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black text-white mb-4">Mistakes Vault</h1>
        <p className="text-on-surface-variant mb-8 max-w-md">
          Log in to track your mistakes and review them using spaced repetition.
        </p>
        <Link href="/" className="px-6 py-3 bg-electric-violet text-white font-bold rounded-xl hover:bg-inverse-primary transition-colors">
          Go Home
        </Link>
      </div>
    );
  }

  if (testState === "active") {
    return (
      <div className="bg-obsidian-deep min-h-screen">
        <TestInterface 
          questions={dueQuestions}
          durationMins={dueQuestions.length * 3} 
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
  
  if (testState === "result") {
    return (
      <div className="bg-obsidian-deep min-h-screen">
        <TestResult 
          questions={dueQuestions}
          answers={answers}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-deep flex flex-col pb-24">
      <Navbar session={session} title="Vault" />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-warning-amber to-electric-violet mb-3">Mistakes Vault</h1>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium">Review your past mistakes and solidify your concepts.</p>
          </div>
          <Link href="/questions" className="text-sm font-bold text-on-surface-variant hover:text-white transition-colors">
            &larr; Back to Questions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[2rem]">
            <div className="text-electric-violet font-mono-label uppercase text-[10px] tracking-widest font-bold mb-3">Total Saved</div>
            <div className="text-5xl sm:text-6xl font-black text-white font-mono">{totalItems}</div>
            <p className="text-sm text-on-surface-variant mt-2 sm:mt-4 font-medium">Questions in your vault</p>
          </div>
          
          <div className="bg-warning-amber/5 border border-warning-amber/20 p-6 sm:p-10 rounded-[2rem] relative overflow-hidden">
            <div className="text-warning-amber font-mono-label uppercase text-[10px] tracking-widest font-bold mb-3">Due for Review</div>
            <div className="text-5xl sm:text-6xl font-black text-warning-amber font-mono">{dueItems.length}</div>
            <p className="text-sm text-warning-amber/70 mt-2 sm:mt-4 font-medium">Ready to be practiced now</p>
            
            {dueItems.length > 0 && (
              <div className="absolute top-0 right-0 w-40 h-40 bg-warning-amber/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            )}
          </div>
        </div>

        {dueItems.length > 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 sm:p-12 md:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4">Ready to Review?</h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
              You have {dueItems.length} questions due. We'll set up a quick practice session for you to review them.
            </p>
            <button
              onClick={handleStartReview}
              className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-warning-amber text-obsidian-deep font-black text-base sm:text-lg rounded-2xl hover:bg-yellow-400 transition transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              Start Review Session
            </button>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12 text-center">
            <div className="w-24 h-24 bg-cyber-green/10 text-cyber-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">All caught up!</h2>
            <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed text-sm sm:text-base">
              You have no questions due for review right now. Check back later or keep practicing to add more.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
