"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MathText from "@/components/MathText";

export default function SprintMode() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [attempts, setAttempts] = useState([]);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const [vaultItems, setVaultItems] = useState(new Set());
  const [toastMessage, setToastMessage] = useState("");
  
  const questionLoadTime = useRef(0);
  useEffect(() => {
    questionLoadTime.current = Date.now();
  }, [currentIndex]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/vault")
        .then(res => res.json())
        .then(data => {
          if (data.vaultItems) setVaultItems(new Set(data.vaultItems.map(v => v.questionId)));
        }).catch(console.error);
    }
  }, [status]);

  const toggleVault = async () => {
    if (status !== "authenticated") return;
    const qid = String(questions[currentIndex].id);
    const currentlyInVault = vaultItems.has(qid);

    if (currentlyInVault) {
      if (!confirm("Remove this question from the Mistakes Vault?")) return;
      try {
        await fetch(`/api/vault?questionId=${qid}`, { method: "DELETE" });
        setVaultItems(prev => {
          const next = new Set(prev);
          next.delete(qid);
          return next;
        });
        setToastMessage("Removed from Mistakes Vault");
      } catch (e) { console.error(e); }
    } else {
      try {
        await fetch("/api/vault", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: qid, isCorrect: false })
        });
        setVaultItems(prev => new Set(prev).add(qid));
        setToastMessage("Added to Mistakes Vault");
      } catch (e) { console.error(e); }
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/sprint/generate");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          console.log("First question loaded:", data.questions[0]);
          setQuestions(data.questions);
        } else {
          setError("No sprint questions available.");
        }
      } catch (err) {
        console.error("Failed to load sprint questions", err);
        setError("Error loading questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const finishSprint = async () => {
    setIsFinished(true);
    if (attempts.length === 0) return;
    setSubmitting(true);
    try {
      await fetch("/api/sprint/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attempts)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLoading || isFinished) return;
    if (timeLeft <= 0) {
      const finishTimer = setTimeout(() => finishSprint(), 0);
      return () => clearTimeout(finishTimer);
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isLoading, isFinished]);

  const handleOptionClick = (optionIndex) => {
    if (showAnswer) return;
    
    // eslint-disable-next-line react-hooks/purity
    const timeTaken = Math.floor((Date.now() - questionLoadTime.current) / 1000);
    const question = questions[currentIndex];
    
    // Check answer
    const correctOptions = Array.isArray(question.correctAnswers) 
      ? question.correctAnswers 
      : (typeof question.correctAnswer === 'number' ? [question.correctAnswer] : []);
      
    // In data/questions.js, correct answers are 0-indexed.
    const isCorrect = correctOptions.some(opt => String(opt) === String(optionIndex));
    
    setSelectedOption(optionIndex);
    setShowAnswer(true);

    const newAttempt = {
      questionId: `${question.year}-${question.id}`,
      selectedAnswer: String(optionIndex + 1),
      isCorrect,
      timeTaken,
      subject: question.subject
    };
    
    setAttempts(prev => [...prev, newAttempt]);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
        questionLoadTime.current = Date.now();
      } else {
        finishSprint();
      }
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-cyan-400 rounded-full animate-spin mb-6"></div>
        <div className="font-bold text-2xl animate-pulse">Loading Sprint...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p className="text-zinc-400 mb-8">{error}</p>
        <button onClick={() => router.push("/")} className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-zinc-200">
          Go Back Home
        </button>
      </div>
    );
  }

  if (isFinished) {
    const totalAttempted = attempts.length;
    const correctCount = attempts.filter(a => a.isCorrect).length;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    const times = attempts.map(a => a.timeTaken);
    const fastest = times.length > 0 ? Math.min(...times) : 0;
    const totalTime = times.reduce((a, b) => a + b, 0);

    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-8">Sprint Complete</h1>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <span className="text-zinc-400">Accuracy</span>
            <span className="text-2xl font-bold">{accuracy}%</span>
          </div>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <span className="text-zinc-400">Questions Answered</span>
            <span className="text-2xl font-bold">{totalAttempted} / 10</span>
          </div>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <span className="text-zinc-400">Time Taken</span>
            <span className="text-2xl font-bold">{totalTime}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Fastest Answer</span>
            <span className="text-2xl font-bold">{fastest}s</span>
          </div>
        </div>
        
        {submitting && <p className="mt-6 text-zinc-500 animate-pulse">Saving results...</p>}
        
        <button 
          onClick={() => router.push("/")}
          className="mt-8 bg-white text-black font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-transform"
        >
          Return Home
        </button>
      </div>
    );
  }

  const question = questions[currentIndex];
  if (!question) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">No questions found</h2>
        <button onClick={() => router.push("/")} className="mt-4 bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-zinc-200">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden fixed inset-0">
      {/* Progress Bar */}
      <div className="h-2 bg-zinc-800 w-full shrink-0">
        <div 
          className="h-full bg-cyan-400 transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-center p-4 shrink-0 border-b border-zinc-900">
        <div className="bg-zinc-900 px-4 py-1.5 rounded-full text-sm font-medium border border-zinc-800">
          Q {currentIndex + 1} / 10
        </div>
        <div className="bg-zinc-900 px-4 py-1.5 rounded-full text-sm font-bold text-cyan-400 border border-zinc-800 font-mono">
          {timeLeft}s
        </div>
      </div>

      {/* Question Area (70% viewport height) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl text-xl md:text-3xl font-medium leading-relaxed">
          <MathText>{question.question}</MathText>
          {question.imageUrl && (
            <div className="flex justify-center mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.imageUrl}
                alt="Question diagram"
                className="h-auto max-w-[80%] rounded-2xl border border-zinc-800"
              />
            </div>
          )}
          {/* Action Buttons */}
        {showAnswer && (
          <div className="flex justify-between items-center mt-8 gap-4 flex-wrap">
            <button
              onClick={toggleVault}
              className={`flex items-center justify-center w-16 h-[60px] rounded-2xl border transition-all ${
                vaultItems.has(String(question.id))
                  ? "bg-amber-500/20 border-amber-500 text-amber-500 hover:bg-amber-500/30"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
              title="Toggle Mistakes Vault"
            >
              {vaultItems.has(String(question.id)) ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={handleNextQuestion}
              className="rounded-2xl bg-white px-8 py-4 text-xl font-bold text-black"
            >
              Next Question →
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Answers Area (30% viewport height) */}
      <div className="h-[30vh] shrink-0 p-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto w-full">
        {question.options.map((opt, idx) => {
          
          let btnClass = "bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-left px-6 py-4 rounded-2xl transition-colors min-h-[60px] flex items-center";
          
          if (showAnswer) {
            const correctOptions = Array.isArray(question.correctAnswers) 
              ? question.correctAnswers 
              : (typeof question.correctAnswer === 'number' ? [question.correctAnswer] : []);
            
            const isCorrect = correctOptions.some(co => String(co) === String(idx));
            
            if (isCorrect) {
              btnClass = "bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-left px-6 py-4 rounded-2xl min-h-[60px] flex items-center";
            } else if (selectedOption === idx) {
              btnClass = "bg-red-500/20 border border-red-500 text-red-400 text-left px-6 py-4 rounded-2xl min-h-[60px] flex items-center";
            } else {
              btnClass = "bg-zinc-900 border border-zinc-800 opacity-50 text-left px-6 py-4 rounded-2xl min-h-[60px] flex items-center";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={btnClass}
              disabled={showAnswer}
            >
              <span className="mr-4 text-zinc-500 font-bold">{['A','B','C','D'][idx]}</span>
              <span className="flex-1"><MathText>{opt}</MathText></span>
            </button>
          );
        })}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-white px-6 py-3 rounded-full font-medium shadow-2xl z-[99999] animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
