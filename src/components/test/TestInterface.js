import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MathText from "../MathText";

export default function TestInterface({ questions, durationMins, onSubmit }) {
  const [timeRemaining, setTimeRemaining] = useState(durationMins * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Format: { [index]: { status: 'answered'|'review'|'visited'|'unvisited', value: any } }
  const [answers, setAnswers] = useState(() => {
    const initial = {};
    questions.forEach((_, i) => {
      initial[i] = { status: 'unvisited', value: null };
    });
    // Mark first question as visited
    initial[0] = { status: 'visited', value: null };
    return initial;
  });

  const [currentValue, setCurrentValue] = useState(null);

  const handleFinalSubmitRef = useRef();

  // Timer logic
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleFinalSubmitRef.current?.();
      return;
    }
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Sync currentValue when currentIndex changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentValue(answers[currentIndex]?.value ?? null);
    
    // Mark as visited if unvisited
    if (answers[currentIndex]?.status === 'unvisited') {
      setAnswers(prev => ({
        ...prev,
        [currentIndex]: { ...prev[currentIndex], status: 'visited' }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const activeQuestion = questions[currentIndex];
  const isNAT = activeQuestion?.type === "NAT";
  const isMSQ = activeQuestion?.type === "MSQ";

  const handleSingleAnswer = (index) => {
    setCurrentValue(index);
  };

  const handleMultipleAnswer = (index) => {
    setCurrentValue(prev => {
      const current = Array.isArray(prev) ? prev : [];
      if (current.includes(index)) {
        return current.filter(ans => ans !== index);
      }
      return [...current, index];
    });
  };

  const handleNATAnswer = (e) => {
    setCurrentValue(e.target.value);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClearResponse = () => {
    setCurrentValue(null);
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { status: 'visited', value: null }
    }));
  };

  const handleMarkForReview = () => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { status: 'review', value: currentValue }
    }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSaveAndNext = () => {
    // If value is null, empty string, or empty array, it means unattempted, keep as visited (or red if it was visited)
    const isEmpty = currentValue === null || currentValue === "" || (Array.isArray(currentValue) && currentValue.length === 0);
    
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { status: isEmpty ? 'visited' : 'answered', value: currentValue }
    }));
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinalSubmit = () => {
    // Make sure current question state is saved before submitting
    const finalAnswers = { ...answers };
    const isEmpty = currentValue === null || currentValue === "" || (Array.isArray(currentValue) && currentValue.length === 0);
    
    // Only update if it wasn't already explicitly set in this render cycle
    // Actually, to be safe, just use the latest `currentValue`
    finalAnswers[currentIndex] = {
      status: finalAnswers[currentIndex].status === 'review' ? 'review' : (isEmpty ? 'visited' : 'answered'),
      value: currentValue
    };
    
    onSubmit(finalAnswers);
  };
  
  useEffect(() => {
    handleFinalSubmitRef.current = handleFinalSubmit;
  });

  // Stats for legend
  const stats = {
    answered: Object.values(answers).filter(a => a.status === 'answered').length,
    review: Object.values(answers).filter(a => a.status === 'review').length,
    visited: Object.values(answers).filter(a => a.status === 'visited' && (a.value === null || a.value === "" || (Array.isArray(a.value) && a.value.length === 0))).length, // Visited but not answered or reviewed
    unvisited: Object.values(answers).filter(a => a.status === 'unvisited').length,
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center h-screen text-white">
        <p className="text-zinc-400">No questions available to display.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700">Go Back</button>
      </div>
    );
  }

  if (!activeQuestion) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center h-screen text-white">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col h-screen text-white overflow-hidden">
      
      {/* Top Bar */}
      <div className="h-14 sm:h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-3 sm:px-6 shrink-0">
        <div className="flex gap-2 sm:gap-6 items-center">
          <div className="font-black text-base sm:text-xl tracking-wider">TEST MODE</div>
          
          {/* Legend Overview */}
          <div className="hidden md:flex gap-4 text-xs font-bold uppercase">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-green-500"></div> Attempted ({stats.answered})
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-red-500"></div> Unattempted ({stats.visited})
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-purple-500"></div> Review ({stats.review})
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-zinc-700"></div> Not Visited ({stats.unvisited})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className={`text-xl sm:text-2xl font-black font-mono ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {formatTime(timeRemaining)}
          </div>
          <button 
            onClick={handleFinalSubmit}
            className="px-3 sm:px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto border-r-0 md:border-r border-zinc-800 relative">
          
          <div className="p-3 sm:p-4 md:p-6 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs sm:text-sm font-bold text-zinc-300">
              Question {currentIndex + 1}
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              {activeQuestion.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              {activeQuestion.subject}
            </span>
          </div>

          <div className="overflow-x-auto max-w-full">
            <MathText className="text-base md:text-[18px] lg:text-[20px] leading-[1.8] text-zinc-100 font-normal mb-6 sm:mb-8">
              {activeQuestion.question}
            </MathText>
          </div>

          {(activeQuestion.questionImage || activeQuestion.image) && (
            <div className="mb-8">
              <img
                src={activeQuestion.questionImage || activeQuestion.image}
                alt="Question diagram"
                className="h-auto max-w-full rounded-2xl border border-zinc-800"
              />
            </div>
          )}

          {/* Options / Input */}
          <div className="mb-20 sm:mb-24">
            {isNAT ? (
              <div className="max-w-md">
                <input
                  type="number"
                  value={currentValue || ""}
                  onChange={handleNATAnswer}
                  placeholder="Enter your answer"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 sm:px-6 py-4 text-xl text-white outline-none focus:border-blue-500 transition"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {activeQuestion.options.map((option, index) => {
                  const isSelected = isMSQ 
                    ? Array.isArray(currentValue) && currentValue.includes(index)
                    : currentValue === index;

                  return (
                    <button
                      key={index}
                      onClick={() => isMSQ ? handleMultipleAnswer(index) : handleSingleAnswer(index)}
                      className={`
                        w-full rounded-2xl border p-3 sm:p-4 text-left transition overflow-hidden min-h-[56px]
                        ${isSelected ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800'}
                      `}
                    >
                      <div className="flex gap-3 items-center w-full min-w-0 overflow-hidden">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full flex items-center justify-center text-lg sm:text-xl text-white ${isSelected ? "bg-blue-600" : "bg-zinc-700"}`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          {activeQuestion.optionImages?.[index] && (
                            <img
                              src={activeQuestion.optionImages[index]}
                              alt={`Option ${index + 1}`}
                              className="rounded-2xl border border-zinc-700 mb-2 h-auto w-full object-contain"
                            />
                          )}
                          <div className="overflow-x-auto overflow-y-hidden max-w-full">
                            <MathText className="text-sm sm:text-[15px] md:text-[17px] leading-relaxed text-white break-words">
                              {option}
                            </MathText>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          </div>
          {/* Action Buttons - Fixed at bottom on mobile */}
          <div className="fixed bottom-0 left-0 right-0 sm:sticky p-3 sm:p-4 md:p-6 bg-zinc-950/95 backdrop-blur border-t border-zinc-800 flex flex-wrap gap-2 sm:gap-4 items-center justify-between mt-auto z-10">
            <button 
              onClick={handleClearResponse}
              className="px-3 sm:px-6 py-3 rounded-2xl border border-zinc-700 text-zinc-300 font-bold hover:bg-zinc-900 transition text-sm sm:text-base"
            >
              Clear
            </button>
            <div className="flex gap-2 sm:gap-4">
              <button 
                onClick={handleMarkForReview}
                className="px-3 sm:px-6 py-3 rounded-2xl bg-zinc-800 text-white font-bold hover:bg-purple-900 hover:text-purple-100 border border-zinc-700 hover:border-purple-500 transition text-sm sm:text-base"
              >
                Review &amp; Next
              </button>
              <button 
                onClick={handleSaveAndNext}
                className="px-4 sm:px-8 py-3 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 transition text-sm sm:text-base"
              >
                Save &amp; Next
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel Question Tracker */}
        <div className="w-full md:w-72 h-64 md:h-auto bg-zinc-950 flex flex-col shrink-0 border-t md:border-t-0 border-zinc-800">
          <div className="p-4 border-b border-zinc-800 font-black text-center tracking-wider text-sm">
            QUESTION PALETTE
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, index) => {
                const status = answers[index]?.status;
                const isEmpty = answers[index]?.value === null || answers[index]?.value === "" || (Array.isArray(answers[index]?.value) && answers[index]?.value.length === 0);
                
                let bgColor = "bg-zinc-800 text-zinc-400"; // unvisited
                
                if (status === 'answered') bgColor = "bg-green-500 text-white";
                else if (status === 'review') bgColor = "bg-purple-500 text-white";
                else if (status === 'visited') {
                  if (isEmpty) bgColor = "bg-red-500 text-white";
                  else bgColor = "bg-green-500 text-white"; // fallback if something weird happens
                }

                // If currently viewing, add a border
                const isActive = currentIndex === index;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${bgColor} ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-105' : 'hover:opacity-80'}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
