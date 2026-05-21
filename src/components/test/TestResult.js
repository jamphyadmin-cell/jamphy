import { useMemo } from "react";
import MathText from "../MathText";

export default function TestResult({ questions, answers, onClose }) {
  
  const results = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    const arraysMatch = (first, second) => {
      if (!first || !second) return false;
      if (first.length !== second.length) return false;
      const firstSet = new Set(first);
      return second.every(val => firstSet.has(val));
    };

    const getCorrectOptions = (question) => {
      if (question.type === "NAT") return [String(question.correctAnswer)];
      if (Array.isArray(question.correctAnswers)) {
        return question.correctAnswers;
      }
      if (typeof question.correctAnswer === "number") {
        return [question.correctAnswer];
      }
      return [];
    };

    questions.forEach((q, i) => {
      const userAns = answers[i]?.value;
      const status = answers[i]?.status;
      
      const isEmpty = userAns === null || userAns === "" || (Array.isArray(userAns) && userAns.length === 0);
      
      if (isEmpty || status === 'unvisited') {
        unattempted++;
        return;
      }

      if (q.type === "NAT") {
        const entered = Number(String(userAns).trim());
        if (isNaN(entered)) {
          wrong++;
          return;
        }
        if (q.correctAnswerMin !== undefined && q.correctAnswerMax !== undefined) {
          if (entered >= q.correctAnswerMin && entered <= q.correctAnswerMax) correct++;
          else wrong++;
        } else {
          if (entered === Number(q.correctAnswer)) correct++;
          else wrong++;
        }
      } else if (q.type === "MSQ") {
        const correctOpts = getCorrectOptions(q);
        if (arraysMatch(Array.isArray(userAns) ? userAns : [], correctOpts)) correct++;
        else wrong++;
      } else {
        const correctOpts = getCorrectOptions(q);
        if (userAns === correctOpts[0]) correct++;
        else wrong++;
      }
    });

    return { correct, wrong, unattempted, total: questions.length };
  }, [questions, answers]);

  const score = results.correct; // Simple +1 for correct. In actual JAM, there's negative marking, but let's keep it simple or implement JAM marking (+1/-0.33 or +2/-0.66) if needed. I will stick to simple marks right now, or just show counts.

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

        {/* Detailed Review */}
        <div className="w-full mt-12 mb-12 space-y-8 text-left">
          <h2 className="text-3xl font-black text-white text-center mb-8">Detailed Review</h2>
          {questions.map((q, i) => {
            const userAns = answers[i]?.value;
            const status = answers[i]?.status;
            
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

            return (
              <div key={q.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
                <div className="flex gap-2 flex-wrap mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${!isAttempted ? "bg-zinc-800 text-zinc-400" : isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {!isAttempted ? "Unattempted" : isCorrect ? "Correct" : "Wrong"}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-sm font-bold">Question {i + 1}</span>
                  <span className="px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-sm font-bold">{q.type}</span>
                </div>
                
                <MathText className="text-xl text-white mb-8 leading-relaxed">{q.question}</MathText>
                
                <div className="grid gap-3 mb-8">
                  {q.type === "NAT" ? (
                    <div className="flex gap-8 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
                      <div>
                        <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-1">Your Answer</div>
                        <div className={`text-2xl font-black ${!isAttempted ? 'text-zinc-500' : isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isAttempted ? userAns : "-"}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-1">Correct Answer</div>
                        <div className="text-2xl font-black text-white">{q.correctAnswerMin !== undefined ? `${q.correctAnswerMin} - ${q.correctAnswerMax}` : q.correctAnswer}</div>
                      </div>
                    </div>
                  ) : (
                    q.options.map((opt, optIndex) => {
                      const isUserSelected = q.type === "MSQ" ? (Array.isArray(userAns) && userAns.includes(optIndex)) : userAns === optIndex;
                      const isOptionCorrect = correctOpts.includes(optIndex);
                      
                      let style = "border-zinc-800 bg-zinc-950 text-zinc-300";
                      
                      if (isOptionCorrect) {
                        style = "border-green-500 bg-green-500/10 text-green-400";
                      } else if (isUserSelected && !isOptionCorrect) {
                        style = "border-red-500 bg-red-500/10 text-red-400";
                      }
                      
                      return (
                        <div key={optIndex} className={`p-5 rounded-2xl border flex gap-4 items-center ${style}`}>
                          <div className="w-8 h-8 shrink-0 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm">
                            {String.fromCharCode(65 + optIndex)}
                          </div>
                          <MathText className="text-lg">{opt}</MathText>
                        </div>
                      );
                    })
                  )}
                </div>

                {q.detailedSolution && (
                  <div className="pt-8 border-t border-zinc-800">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      Detailed Solution
                    </h4>
                    <MathText className="text-zinc-200 leading-relaxed bg-zinc-950 p-6 md:p-8 rounded-3xl border border-zinc-800 text-lg">
                      {q.detailedSolution}
                    </MathText>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button 
          onClick={onClose}
          className="px-10 py-5 rounded-3xl bg-white text-black font-black text-xl hover:bg-zinc-200 transition"
        >
          Return to Practice Questions
        </button>
      </div>

    </div>
  );
}
