"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TestInterface from "@/components/test/TestInterface";
import TestResult from "@/components/test/TestResult";

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
          console.log("Raw Vault API Response:", data);
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // We need to load the actual question data for due items
    // Dynamic import to avoid loading massive data on initial render if not needed
    import("@/data/questions").then((module) => {
      const allQuestions = [...module.questions, ...dbQuestions];
      console.log("Sample question id from data:", allQuestions[0]?.id);
      
      const loaded = dueItems.map(item => {
        console.log("Checking vault item questionId:", item.questionId);
        
        // Match the string "year-id" format, e.g., "2024-1" or just "1"
        const found = allQuestions.find(q => {
          const qStrId = String(q.id);
          const qYearId = `${q.year}-${q.id}`;
          return String(item.questionId) === qStrId || String(item.questionId) === qYearId;
        });
        
        if (!found) console.warn("Question not found for vault item:", item.questionId);
        return found;
      }).filter(Boolean); // remove undefined
      
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
    // Reload vault items
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-500 font-medium">Loading Vault...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black text-white mb-4">Mistakes Vault</h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          Log in to track your mistakes and review them using spaced repetition.
        </p>
        <Link href="/" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition">
          Go Home
        </Link>
      </div>
    );
  }

  if (testState === "active") {
    return (
      <div className="bg-black min-h-screen">
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
      <div className="bg-black min-h-screen">
        <TestResult 
          questions={dueQuestions}
          answers={answers}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Mistakes Vault</h1>
            <p className="text-zinc-400">Review your past mistakes and solidify your concepts.</p>
          </div>
          <Link href="/questions" className="text-sm font-bold text-zinc-500 hover:text-white transition">
            &larr; Back to Questions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[32px]">
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-wider mb-2">Total Saved</div>
            <div className="text-5xl font-black text-white">{totalItems}</div>
            <p className="text-sm text-zinc-400 mt-4">Questions in your vault</p>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/30 p-8 rounded-[32px] relative overflow-hidden">
            <div className="text-orange-500/70 font-bold uppercase text-xs tracking-wider mb-2">Due for Review</div>
            <div className="text-5xl font-black text-orange-400">{dueItems.length}</div>
            <p className="text-sm text-orange-500/70 mt-4">Ready to be practiced now</p>
            
            {dueItems.length > 0 && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            )}
          </div>
        </div>

        {dueItems.length > 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 md:p-12 text-center">
            <h2 className="text-2xl font-black text-white mb-4">Ready to Review?</h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              You have {dueItems.length} questions due. We&apos;ll set up a quick practice session for you to review them.
            </p>
            <button
              onClick={handleStartReview}
              className="px-10 py-5 bg-white text-black font-black text-lg rounded-2xl hover:bg-zinc-200 transition transform hover:scale-105"
            >
              Start Review Session
            </button>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-12 text-center">
            <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white mb-4">All caught up!</h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              You have no questions due for review right now. Check back later or keep practicing to add more.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
