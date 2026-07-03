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
  const [flashVisible, setFlashVisible] = useState(false);
  
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

  const advanceQuestion = () => {
    setFlashVisible(true);
    setTimeout(() => setFlashVisible(false), 200);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      questionLoadTime.current = Date.now();
    } else {
      finishSprint();
    }
  };

  const handleOptionClick = (optionIndex) => {
    if (showAnswer) return;
    
    const timeTaken = Math.floor((Date.now() - questionLoadTime.current) / 1000);
    const question = questions[currentIndex];
    
    const correctOptions = Array.isArray(question.correctAnswers) 
      ? question.correctAnswers 
      : (typeof question.correctAnswer === 'number' ? [question.correctAnswer] : []);
      
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
      advanceQuestion();
    }, 400);
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-obsidian-deep flex flex-col items-center justify-center text-white p-6">
        <div className="w-12 h-12 border-4 border-white/10 border-t-electric-violet rounded-full animate-spin mb-6"></div>
        <div className="font-bold text-2xl animate-pulse text-white">Loading Sprint...</div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-[100dvh] bg-obsidian-deep flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-on-surface-variant mb-8">{error}</p>
        <button onClick={() => router.push("/")} className="bg-electric-violet text-white font-bold py-3 px-8 rounded-xl hover:bg-inverse-primary transition-colors">
          Go Back Home
        </button>
      </div>
    );
  }

  // --- FINISHED STATE ---
  if (isFinished) {
    const totalAttempted = attempts.length;
    const correctCount = attempts.filter(a => a.isCorrect).length;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    const times = attempts.map(a => a.timeTaken);
    const fastest = times.length > 0 ? Math.min(...times) : 0;
    const totalTime = times.reduce((a, b) => a + b, 0);

    return (
      <div className="min-h-[100dvh] bg-obsidian-deep text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electric-violet to-cyber-green mb-10">Sprint Complete</h1>
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 sm:p-10 w-full max-w-md space-y-0 shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/10 py-5">
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Accuracy</span>
            <span className="text-3xl font-black text-cyber-green">{accuracy}%</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 py-5">
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Answered</span>
            <span className="text-3xl font-black text-white">{totalAttempted} / 10</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 py-5">
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Time Taken</span>
            <span className="text-3xl font-black text-warning-amber">{totalTime}s</span>
          </div>
          <div className="flex justify-between items-center py-5">
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-wider">Fastest</span>
            <span className="text-3xl font-black text-electric-violet">{fastest}s</span>
          </div>
        </div>
        
        {submitting && <p className="mt-6 text-on-surface-variant animate-pulse text-sm">Saving results...</p>}
        
        <button 
          onClick={() => router.push("/")}
          className="mt-10 w-full sm:w-auto bg-electric-violet text-white font-bold py-4 px-10 rounded-xl hover:bg-inverse-primary transition-colors active:scale-95"
        >
          Return Home
        </button>
      </div>
    );
  }

  // --- ACTIVE SPRINT ---
  const question = questions[currentIndex];
  if (!question) {
    return (
      <div className="min-h-[100dvh] bg-obsidian-deep flex flex-col items-center justify-center text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">No questions found</h2>
        <button onClick={() => router.push("/")} className="mt-4 bg-electric-violet text-white font-bold py-3 px-6 rounded-xl hover:bg-inverse-primary transition-colors">
          Go Back Home
        </button>
      </div>
    );
  }

  const timerPercent = (timeLeft / 60) * 100;
  const timerColor = timeLeft <= 10 ? "bg-red-500" : timeLeft <= 20 ? "bg-warning-amber" : "bg-electric-violet";

  return (
    <div className="h-[100dvh] bg-obsidian-deep text-white flex flex-col overflow-hidden fixed inset-0">
      {/* White flash transition */}
      {flashVisible && (
        <div className="fixed inset-0 bg-white/10 z-50 pointer-events-none animate-[fadeOut_200ms_ease-out_forwards]" />
      )}

      {/* Timer Progress Bar */}
      <div className="h-1.5 bg-white/5 w-full shrink-0 z-10">
        <div 
          className={`h-full ${timerColor} transition-all duration-1000 ease-linear`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-center px-4 py-3 shrink-0 border-b border-white/10 bg-obsidian-deep">
        <div className="bg-white/10 px-4 py-1.5 rounded-lg text-sm font-bold border border-white/10 text-white">
          Q {currentIndex + 1} / 10
        </div>
        <div className={`px-4 py-1.5 rounded-lg text-sm font-black font-mono border ${timeLeft <= 10 ? "bg-red-500/20 border-red-500 text-red-400" : "bg-white/10 border-white/10 text-electric-violet"}`}>
          {timeLeft}s
        </div>
      </div>

      {/* Question Area - Top 60% */}
      <div className="flex-[6] min-h-0 overflow-y-auto p-4 md:p-8 flex flex-col justify-center">
        <div className="w-full max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl font-medium leading-relaxed break-words text-white">
          <MathText>{question.question}</MathText>
          {question.imageUrl && (
            <div className="flex justify-center mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.imageUrl}
                alt="Question diagram"
                className="h-auto max-w-full rounded-2xl border border-white/10"
              />
            </div>
          )}
          {/* Action Buttons shown after answer */}
          {showAnswer && (
            <div className="flex justify-between items-center mt-8 gap-4 flex-wrap w-full">
              <button
                onClick={toggleVault}
                className={`flex items-center justify-center w-14 h-[52px] rounded-xl border-2 transition-all ${
                  vaultItems.has(String(question.id))
                    ? "bg-warning-amber/20 border-warning-amber text-warning-amber hover:bg-warning-amber/30"
                    : "bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10 hover:text-white"
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
                onClick={advanceQuestion}
                className="flex-1 rounded-xl bg-electric-violet px-6 py-3 text-lg font-bold text-white min-h-[52px] hover:bg-inverse-primary transition-colors active:scale-95"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Answers Area - Bottom 40% */}
      <div className="flex-[4] shrink-0 p-3 sm:p-4 grid grid-cols-1 gap-2 sm:gap-3 overflow-y-auto border-t border-white/10 bg-white/[0.02]">
        {question.options.map((opt, idx) => {
          
          let btnClass = "bg-white/5 border-2 border-white/10 hover:border-white/20 hover:bg-white/10 text-left px-5 py-4 rounded-xl transition-all min-h-[56px] flex items-center w-full active:scale-[0.98]";
          
          if (showAnswer) {
            const correctOptions = Array.isArray(question.correctAnswers) 
              ? question.correctAnswers 
              : (typeof question.correctAnswer === 'number' ? [question.correctAnswer] : []);
            
            const isCorrect = correctOptions.some(co => String(co) === String(idx));
            
            if (isCorrect) {
              btnClass = "bg-cyber-green/20 border-2 border-cyber-green text-left px-5 py-4 rounded-xl min-h-[56px] flex items-center w-full";
            } else if (selectedOption === idx) {
              btnClass = "bg-red-500/20 border-2 border-red-500 text-left px-5 py-4 rounded-xl min-h-[56px] flex items-center w-full";
            } else {
              btnClass = "bg-white/5 border-2 border-white/5 opacity-40 text-left px-5 py-4 rounded-xl min-h-[56px] flex items-center w-full";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={btnClass}
              disabled={showAnswer}
            >
              <span className={`mr-4 font-black text-lg shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                showAnswer && selectedOption === idx 
                  ? (attempts[attempts.length - 1]?.isCorrect ? "bg-cyber-green text-obsidian-deep" : "bg-red-500 text-obsidian-deep")
                  : "bg-white/10 text-on-surface-variant"
              }`}>{['A','B','C','D'][idx]}</span>
              <span className="flex-1 text-sm sm:text-base overflow-x-auto text-white"><MathText>{opt}</MathText></span>
            </button>
          );
        })}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-6 py-3 rounded-xl font-medium shadow-2xl z-[99999]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
