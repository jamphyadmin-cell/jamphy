"use client";

import { useMemo, useState, useEffect } from "react";
import MathText from "../MathText";

export default function TestResult({ questions, answers, onClose }) {
  const [filter, setFilter] = useState("all");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const getCorrectOptions = (question) => {
    if (question.type === "NAT") return [String(question.correctAnswer)];
    if (Array.isArray(question.correctAnswers)) return question.correctAnswers;
    if (typeof question.correctAnswer === "number") return [question.correctAnswer];
    return [];
  };

  const arraysMatch = (first, second) => {
    if (!first || !second) return false;
    if (first.length !== second.length) return false;
    const firstSet = new Set(first);
    return second.every(val => firstSet.has(val));
  };

  const processedQuestions = useMemo(() => {
    return questions.map((q, i) => {
      const userAns = answers[i]?.value;
      const status = answers[i]?.status;
      const correctOpts = getCorrectOptions(q);
      
      let isCorrect = false;
      let isAttempted = false;

      const isEmpty = userAns === null || userAns === "" || (Array.isArray(userAns) && userAns.length === 0);
      
      if (!isEmpty && status !== 'unvisited') {
        isAttempted = true;
        if (q.type === "NAT") {
          const entered = Number(String(userAns).trim());
          if (!isNaN(entered)) {
            if (q.correctAnswerMin !== undefined && q.correctAnswerMax !== undefined) {
              if (entered >= q.correctAnswerMin && entered <= q.correctAnswerMax) isCorrect = true;
            } else {
              if (entered === Number(q.correctAnswer)) isCorrect = true;
            }
          }
        } else if (q.type === "MSQ") {
          if (arraysMatch(Array.isArray(userAns) ? userAns : [], correctOpts)) isCorrect = true;
        } else {
          if (userAns === correctOpts[0]) isCorrect = true;
        }
      }

      let qStatus = "unattempted";
      if (isAttempted) {
        qStatus = isCorrect ? "correct" : "wrong";
      }

      return {
        ...q,
        originalIndex: i,
        userAns,
        correctOpts,
        isCorrect,
        isAttempted,
        qStatus
      };
    });
  }, [questions, answers]);

  const results = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    processedQuestions.forEach(pq => {
      if (pq.qStatus === "correct") correct++;
      else if (pq.qStatus === "wrong") wrong++;
      else unattempted++;
    });

    return { correct, wrong, unattempted, total: questions.length };
  }, [processedQuestions]);

  const filteredQuestions = useMemo(() => {
    if (filter === "all") return processedQuestions;
    return processedQuestions.filter(pq => pq.qStatus === filter);
  }, [processedQuestions, filter]);

  useEffect(() => {
    const updateVault = async () => {
      for (let i = 0; i < processedQuestions.length; i++) {
        const pq = processedQuestions[i];
        if (!pq.isAttempted) continue;
        
        await fetch('/api/vault', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: `${pq.year}-${pq.id}`, isCorrect: pq.isCorrect })
        }).catch(err => console.error(err));
        
        const selectedAnsStr = Array.isArray(pq.userAns) 
          ? pq.userAns.map(a => a + 1).sort().join(',') 
          : (pq.type === 'MCQ' ? String(Number(pq.userAns) + 1) : String(pq.userAns));
        
        await fetch('/api/attempts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            questionId: `${pq.year}-${pq.id}`, 
            isCorrect: pq.isCorrect, 
            timeTaken: 0, 
            subject: pq.subject, 
            selectedAnswer: selectedAnsStr 
          })
        }).catch(err => console.error(err));
      }
    };
    updateVault();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const score = results.correct;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center p-6 overflow-y-auto">
      
      <div className="w-full max-w-4xl mt-12 bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 shadow-2xl flex flex-col items-center">
        <h1 className="text-5xl font-black text-white mb-4">Test Submitted</h1>
        <p className="text-zinc-400 mb-12">Here is your performance summary</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-white mb-2">{results.total}</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-wider">Total</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-green-400 mb-2">{results.correct}</div>
            <div className="text-green-500/70 font-bold uppercase text-xs tracking-wider">Correct</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-red-400 mb-2">{results.wrong}</div>
            <div className="text-red-500/70 font-bold uppercase text-xs tracking-wider">Wrong</div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-zinc-300 mb-2">{results.unattempted}</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-wider">Unattempted</div>
          </div>
        </div>

        {/* Filters */}
        <div className="w-full mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "all", label: "All Questions" },
            { id: "correct", label: "Correct" },
            { id: "wrong", label: "Incorrect" },
            { id: "unattempted", label: "Unattempted" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { setFilter(f.id); setExpandedQuestionId(null); }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                filter === f.id 
                  ? "bg-white text-black border-white" 
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Detailed Review (Accordion List) */}
        <div className="w-full mb-12 space-y-3 text-left">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">No questions found for this filter.</div>
          ) : (
            filteredQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              
              let badgeStyle = "bg-zinc-800 text-zinc-400";
              let badgeLabel = "Unattempted";
              
              if (q.qStatus === "correct") {
                badgeStyle = "bg-green-500/20 text-green-400";
                badgeLabel = "Correct";
              } else if (q.qStatus === "wrong") {
                badgeStyle = "bg-red-500/20 text-red-400";
                badgeLabel = "Wrong";
              }

              return (
                <div key={q.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300">
                  {/* Header (Always Visible) */}
                  <button 
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="w-full p-4 flex items-center justify-between gap-4 hover:bg-zinc-800/50 transition text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white">
                        {q.originalIndex + 1}
                      </span>
                      <span className="text-zinc-300 truncate max-w-xs md:max-w-md">
                        {q.question.replace(/\\\[.*?\\\]|\\\(.*?\\\)/g, '...').slice(0, 60).trim()}...
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeStyle}`}>
                        {badgeLabel}
                      </span>
                      <svg className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6 md:p-8 border-t border-zinc-800 bg-zinc-900/50">
                      <div className="flex gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold">{q.type}</span>
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold">{q.subject}</span>
                      </div>
                      
                      <MathText className="text-lg text-white mb-8 leading-relaxed">{q.question}</MathText>
                      
                      <div className="grid gap-3 mb-8">
                        {q.type === "NAT" ? (
                          <div className="flex gap-8 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
                            <div>
                              <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Your Answer</div>
                              <div className={`text-xl font-black ${!q.isAttempted ? 'text-zinc-500' : q.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{q.isAttempted ? q.userAns : "-"}</div>
                            </div>
                            <div>
                              <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Correct Answer</div>
                              <div className="text-xl font-black text-white">{q.correctAnswerMin !== undefined ? `${q.correctAnswerMin} - ${q.correctAnswerMax}` : q.correctAnswer}</div>
                            </div>
                          </div>
                        ) : (
                          q.options.map((opt, optIndex) => {
                            const isUserSelected = q.type === "MSQ" ? (Array.isArray(q.userAns) && q.userAns.includes(optIndex)) : q.userAns === optIndex;
                            const isOptionCorrect = q.correctOpts.includes(optIndex);
                            
                            let style = "border-zinc-800 bg-zinc-950 text-zinc-300";
                            
                            if (isOptionCorrect) {
                              style = "border-green-500 bg-green-500/10 text-green-400";
                            } else if (isUserSelected && !isOptionCorrect) {
                              style = "border-red-500 bg-red-500/10 text-red-400";
                            }
                            
                            return (
                              <div key={optIndex} className={`p-4 rounded-xl border flex gap-4 items-center ${style}`}>
                                <div className="w-8 h-8 shrink-0 rounded-full border border-current flex items-center justify-center font-bold text-sm">
                                  {String.fromCharCode(65 + optIndex)}
                                </div>
                                <MathText className="text-md">{opt}</MathText>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {q.detailedSolution && (
                        <div className="pt-6 border-t border-zinc-800">
                          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                            Detailed Solution
                          </h4>
                          <MathText className="text-zinc-300 leading-relaxed bg-zinc-950 p-6 rounded-2xl border border-zinc-800 text-md">
                            {q.detailedSolution}
                          </MathText>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <button 
          onClick={onClose}
          className="px-10 py-5 rounded-3xl bg-white text-black font-black text-xl hover:bg-zinc-200 transition shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Return to Practice Questions
        </button>
      </div>
    </div>
  );
}
