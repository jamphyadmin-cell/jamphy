"use client";

import { useState } from "react";
import MathText from "@/components/MathText";

export default function ManualQuestionForm({ adminPassword, onSuccess }) {
  const [year, setYear] = useState("2024");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("MCQ");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [natAnswer, setNatAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImageUrl(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleMSQCheckbox = (index) => {
    setCorrectAnswers(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index].sort()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !questionText) {
      setMessage("Please fill out at least Subject and Question.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    const newQuestion = {
      year,
      subject,
      type,
      question: questionText,
      options: type === "NAT" ? [] : options,
      correctAnswer: type === "MCQ" ? Number(correctAnswer) + 1 : null,
      correctAnswers: type === "MSQ" ? correctAnswers.map(c => c + 1) : [],
      natAnswer: type === "NAT" ? natAnswer : null,
      hasImage: !!imageUrl,
      imageUrl: imageUrl || null,
      solution: solution || null,
      status: "APPROVED" // Manual entry is pre-approved
    };

    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: [newQuestion],
          adminPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Question successfully added to database!");
        // Reset form
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("0");
        setCorrectAnswers([]);
        setNatAnswer("");
        setSolution("");
        setImageUrl("");
        if (onSuccess) onSuccess();
      } else {
        setMessage(data.error || "Failed to save question.");
      }
    } catch (err) {
      setMessage("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-black text-white mb-6">Add New Question Manually</h2>
      
      {message && (
        <div className={`p-4 rounded-xl mb-6 font-bold ${message.includes("success") ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800" : "bg-red-900/50 text-red-400 border border-red-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">Year</label>
            <select value={year} onChange={e => setYear(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500">
              <option value="MCQ">MCQ (Single Correct)</option>
              <option value="MSQ">MSQ (Multiple Correct)</option>
              <option value="NAT">NAT (Numerical)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">Subject / Topic</label>
            <select 
              value={subject} 
              onChange={e => setSubject(e.target.value)} 
              required 
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500"
            >
              <option value="" disabled>Select a subject...</option>
              <option value="Classical Mechanics">Classical Mechanics</option>
              <option value="Quantum Mechanics">Quantum Mechanics</option>
              <option value="Thermodynamics">Thermodynamics</option>
              <option value="Wave Optics">Wave Optics</option>
              <option value="Electrostatics">Electrostatics</option>
              <option value="Electromagnetic Theory">Electromagnetic Theory</option>
              <option value="Semiconductor Physics">Semiconductor Physics</option>
              <option value="Solid State Physics">Solid State Physics</option>
              <option value="Mathematical Physics">Mathematical Physics</option>
              <option value="Modern Physics">Modern Physics</option>
              <option value="Oscillations">Oscillations</option>
              <option value="Polarization">Polarization</option>
              <option value="Electronics">Electronics</option>
              <option value="Boolean Algebra">Boolean Algebra</option>
              <option value="Relativity">Relativity</option>
              <option value="Waves">Waves</option>
              <option value="Vector Calculus">Vector Calculus</option>
              <option value="Statistical Mechanics">Statistical Mechanics</option>
            </select>
          </div>
        </div>

        {/* Question Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">Question (LaTeX Supported)</label>
            <textarea 
              value={questionText} 
              onChange={e => setQuestionText(e.target.value)}
              placeholder="Enter question text here..."
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 min-h-[150px] font-mono text-sm"
              required
            />
            <div className="mt-4">
              <label className="block text-sm font-bold text-zinc-500 mb-2">Attach Image (Optional)</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition" />
              {imageUrl && <div className="mt-2 text-emerald-400 text-sm font-bold">✓ Image attached</div>}
            </div>
          </div>
          <div className="bg-black border border-zinc-800 rounded-xl p-4 overflow-y-auto max-h-[250px]">
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Live Preview</label>
            <MathText className="text-white text-base">{questionText || "Preview will appear here..."}</MathText>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 max-w-full rounded-xl border border-zinc-800" />}
          </div>
        </div>

        {/* Options */}
        {type !== "NAT" && (
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-4">Options (LaTeX Supported)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((opt, idx) => (
                <div key={idx} className="bg-black border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-zinc-500">{['A','B','C','D'][idx]}</span>
                    {type === "MCQ" ? (
                      <input type="radio" name="correctOption" value={idx} checked={correctAnswer === String(idx)} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-4 h-4" />
                    ) : (
                      <input type="checkbox" checked={correctAnswers.includes(idx)} onChange={() => handleMSQCheckbox(idx)} className="w-4 h-4" />
                    )}
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Correct Answer</span>
                  </div>
                  <textarea 
                    value={opt} 
                    onChange={e => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${['A','B','C','D'][idx]} text...`}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-zinc-500 min-h-[60px] font-mono text-sm"
                  />
                  <div className="bg-zinc-950 p-2 rounded border border-zinc-800 min-h-[40px] text-sm overflow-x-auto">
                    <MathText className="text-zinc-300">{opt}</MathText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NAT Answer */}
        {type === "NAT" && (
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">Numerical Answer</label>
            <input 
              type="text" 
              value={natAnswer} 
              onChange={e => setNatAnswer(e.target.value)} 
              placeholder="e.g. 3.14 or 2 to 4" 
              className="w-full max-w-xs bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500" 
            />
          </div>
        )}

        {/* Detailed Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">Detailed Solution (LaTeX Supported)</label>
            <textarea 
              value={solution} 
              onChange={e => setSolution(e.target.value)}
              placeholder="Enter step-by-step solution..."
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 min-h-[150px] font-mono text-sm"
            />
          </div>
          <div className="bg-black border border-zinc-800 rounded-xl p-4 overflow-y-auto max-h-[250px]">
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Solution Preview</label>
            <MathText className="text-zinc-300 text-sm">{solution || "Preview will appear here..."}</MathText>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition disabled:opacity-50 text-lg"
        >
          {isSaving ? "Saving Question..." : "Add Question to Database"}
        </button>
      </form>
    </div>
  );
}
