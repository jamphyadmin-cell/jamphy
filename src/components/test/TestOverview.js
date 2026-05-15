import { useState, useEffect } from "react";

export default function TestOverview({ config, questionsCount, onStart, onCancel }) {
  const [countdown, setCountdown] = useState(null); // null means not started, otherwise number 3, 2, 1, 0 (Go)

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown === 0) {
      const timer = setTimeout(() => {
        onStart();
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, onStart]);

  if (countdown !== null) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
        <div className="text-[150px] md:text-[250px] font-black text-white animate-pulse">
          {countdown > 0 ? countdown : "GO!"}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center">
        
        <h2 className="text-4xl font-black text-white mb-2">Test Overview</h2>
        <p className="text-zinc-400 mb-8 font-medium">Please review your test settings before proceeding.</p>

        <div className="w-full space-y-4 mb-10 text-left">
          <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <span className="text-zinc-400 font-bold">Total Questions</span>
            <span className="text-2xl font-black text-white">{questionsCount}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <span className="text-zinc-400 font-bold">Duration</span>
            <span className="text-2xl font-black text-white">{config.duration} mins</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <span className="text-zinc-400 font-bold">Question Types</span>
            <span className="text-lg font-bold text-white">{config.types.join(", ")}</span>
          </div>
        </div>

        <div className="w-full flex gap-4">
          <button 
            onClick={onCancel}
            className="flex-1 py-4 rounded-2xl border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button 
            onClick={() => setCountdown(3)}
            className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-500 transition"
          >
            Confirm to Proceed
          </button>
        </div>

      </div>
    </div>
  );
}
