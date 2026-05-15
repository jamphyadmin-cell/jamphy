import { useState } from "react";
import { syllabus } from "../../data/syllabus";

export default function TestModal({ onClose, onGenerate }) {
  const [syllabusMode, setSyllabusMode] = useState("full");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [numQuestions, setNumQuestions] = useState(30);
  const [types, setTypes] = useState(["MCQ", "MSQ", "NAT"]);
  const [duration, setDuration] = useState(5);
  const [yearMode, setYearMode] = useState("All");
  const [customYearStart, setCustomYearStart] = useState(2015);
  const [customYearEnd, setCustomYearEnd] = useState(2026);

  const handleChapterToggle = (chapterId) => {
    if (selectedChapters.includes(chapterId)) {
      setSelectedChapters(selectedChapters.filter(id => id !== chapterId));
    } else {
      setSelectedChapters([...selectedChapters, chapterId]);
    }
  };

  const handleTypeToggle = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter(t => t !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  const handleGenerate = () => {
    onGenerate({
      syllabusMode,
      selectedChapters,
      numQuestions,
      types,
      duration,
      yearMode,
      customYearStart,
      customYearEnd,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-zinc-950/90 border border-zinc-800 rounded-[32px] p-6 md:p-8 shadow-2xl flex flex-col my-8">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black text-white">Create Test</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Syllabus Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">1. Syllabus</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setSyllabusMode("full")}
                className={`flex-1 py-3 px-4 rounded-2xl border font-bold transition ${syllabusMode === "full" ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}
              >
                Full Syllabus
              </button>
              <button 
                onClick={() => setSyllabusMode("specific")}
                className={`flex-1 py-3 px-4 rounded-2xl border font-bold transition ${syllabusMode === "specific" ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}
              >
                Specific Chapters
              </button>
            </div>
            
            {syllabusMode === "specific" && (
              <div className="grid grid-cols-2 gap-2 mt-3 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl max-h-48 overflow-y-auto">
                {syllabus.map(subject => (
                  <label key={subject.id} className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-xl cursor-pointer transition">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedChapters.includes(subject.id) ? "bg-blue-600 border-blue-600" : "bg-zinc-950 border-zinc-700"}`}>
                      {selectedChapters.includes(subject.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                    <span className="text-sm text-zinc-200 select-none">{subject.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Question Count & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">2. No. of Questions</label>
              <input 
                type="number" 
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                min={1}
                max={100}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white text-lg font-bold outline-none focus:border-zinc-500 transition"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">3. Duration (Mins)</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDuration(Math.max(5, duration - 5))}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-black text-xl hover:bg-zinc-800 transition"
                >-5</button>
                <input 
                  type="number" 
                  value={duration}
                  onChange={(e) => setDuration(Math.max(5, Number(e.target.value)))}
                  className="w-24 shrink-0 bg-zinc-900 border border-zinc-800 rounded-2xl px-2 py-4 text-center text-white text-xl font-black outline-none focus:border-zinc-500 transition"
                />
                <button 
                  onClick={() => setDuration(duration + 5)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-black text-xl hover:bg-zinc-800 transition"
                >+5</button>
              </div>
            </div>
          </div>

          {/* Question Types */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">4. Question Types</label>
            <div className="flex gap-3">
              {["MCQ", "MSQ", "NAT"].map(type => (
                <button 
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`flex-1 py-3 px-4 rounded-2xl border font-bold transition ${types.includes(type) ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Years */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">5. Years</label>
            <div className="flex flex-wrap gap-2">
              {["All", "Last 3", "Last 5", "Last 10", "Custom"].map(mode => (
                <button 
                  key={mode}
                  onClick={() => setYearMode(mode)}
                  className={`py-2 px-5 rounded-xl border text-sm font-bold transition ${yearMode === mode ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
            
            {yearMode === "Custom" && (
              <div className="flex items-center gap-4 mt-3">
                <input 
                  type="number" 
                  value={customYearStart}
                  onChange={(e) => setCustomYearStart(Number(e.target.value))}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition text-center"
                />
                <span className="text-zinc-500 font-bold">to</span>
                <input 
                  type="number" 
                  value={customYearEnd}
                  onChange={(e) => setCustomYearEnd(Number(e.target.value))}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition text-center"
                />
              </div>
            )}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <button 
            onClick={handleGenerate}
            disabled={types.length === 0 || (syllabusMode === "specific" && selectedChapters.length === 0) || numQuestions < 1 || duration < 5}
            className="w-full py-4 rounded-2xl bg-white text-black font-black text-xl hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Test
          </button>
        </div>

      </div>
    </div>
  );
}
