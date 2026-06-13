import { useMemo, useEffect } from "react";
import MathText from "../MathText";

export default function TestResult({ questions, answers, onClose }) {
  
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

  const results = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;


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

  useEffect(() => {
    const updateVault = async () => {
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const userAns = answers[i]?.value;
        const status = answers[i]?.status;
        const isEmpty = userAns === null || userAns === "" || (Array.isArray(userAns) && userAns.length === 0);
        
        if (isEmpty || status === 'unvisited') continue;
        
        let isCorrect = false;
        if (q.type === "NAT") {
          const entered = Number(String(userAns).trim());
          if (!isNaN(entered)) {
            if (q.correctAnswerMin !== undefined && q.correctAnswerMax !== undefined) {
              isCorrect = (entered >= q.correctAnswerMin && entered <= q.correctAnswerMax);
            } else {
              isCorrect = (entered === Number(q.correctAnswer));
            }
          }
        } else if (q.type === "MSQ") {
          const correctOpts = getCorrectOptions(q);
          isCorrect = arraysMatch(Array.isArray(userAns) ? userAns : [], correctOpts);
        } else {
          const correctOpts = getCorrectOptions(q);
          isCorrect = (userAns === correctOpts[0]);
        }
        
        await fetch('/api/vault', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: `${q.year}-${q.id}`, isCorrect })
        }).catch(err => console.error(err));
        
        const selectedAnsStr = Array.isArray(userAns) ? userAns.map(a => a + 1).sort().join(',') : (q.type === 'MCQ' ? String(Number(userAns) + 1) : String(userAns));
        
        await fetch('/api/attempts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            questionId: `${q.year}-${q.id}`, 
            isCorrect, 
            timeTaken: 0, 
            subject: q.subject, 
            selectedAnswer: selectedAnsStr 
          })
        }).catch(err => console.error(err));
      }
    };
    updateVault();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {/* Detailed Review could go here, but for now just the summary */}

        <button 
          onClick={onClose}
          className="px-10 py-5 rounded-2xl bg-white text-black font-black text-lg hover:bg-zinc-200 transition"
        >
          Return to Practice Questions
        </button>
      </div>

    </div>
  );
}
