"use client";

import { useState } from "react";

export default function GoalSettingsModal({ currentTarget, onClose, onSave }) {
  const [target, setTarget] = useState(currentTarget);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (target < 1 || target > 100) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/goals/today", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetQuestions: target }),
      });
      if (res.ok) {
        onSave(target);
      }
    } catch (error) {
      console.error("Failed to save goal:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold text-white mb-4">Daily Goal</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Set your target for the number of questions to attempt today.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
            <span className="text-zinc-300 font-medium">Questions</span>
            <input
              type="number"
              min="1"
              max="100"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
              className="w-20 bg-zinc-800 text-white font-bold text-center py-2 px-3 rounded-xl border border-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || target < 1 || target > 100}
            className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Goal"}
          </button>
        </div>
      </div>
    </div>
  );
}
