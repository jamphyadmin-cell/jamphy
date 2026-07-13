"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ActivityRing from "@/components/ActivityRing";

const SUBJECTS = [
  "Differential Equations", "Matrices", "Vector Calculus", "Complex Numbers",
  "Classical Mechanics", "Rotational Dynamics", "Circular Motion", "Work Power Energy",
  "Gravitation", "Wave Optics", "Simple Harmonic Motion", "Electrostatics",
  "Electromagnetic Induction", "Thermodynamics", "Quantum Mechanics", "Special Relativity",
  "Semiconductors", "Solid State Physics"
];

export default function StudyPlanClient({ initialPlan }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [plan, setPlan] = useState(initialPlan);

  // Wizard State
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Analysing your weak topics...");
  const planTypeRef = useRef('full');
  const [formData, setFormData] = useState({
    examDate: "",
    hoursPerDay: 4,
    subjectConfidence: SUBJECTS.reduce((acc, sub) => ({ ...acc, [sub]: 3 }), {}),
    targetRank: "Under 100",
    preferences: "Topic by topic"
  });

  // Week Accordion State
  const [openWeek, setOpenWeek] = useState(1);

  const handleNext = () => setStep(s => Math.min(5, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const loadingMessages = [
    'Analysing your weak topics...',
    'Calculating your exam timeline...',
    'Building your personalised plan...',
    'Almost ready...'
  ];

  useEffect(() => {
    let interval;
    if (isGenerating && planTypeRef.current === 'full') {
      let index = 0;
      setLoadingMessage(loadingMessages[0]);
      interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const generatePlan = async (type = 'full') => {
    planTypeRef.current = type;
    setIsGenerating(true);
    setStreamedText("");
    
    try {
      const res = await fetch('/api/study-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, planType: type })
      });

      if (!res.ok) throw new Error("Failed");

      if (type === 'quick') {
        startTransition(() => {
          router.refresh();
        });
        return;
      }

      // Streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        textBuffer += chunk;
        setStreamedText(textBuffer);
      }
      
      startTransition(() => {
        router.refresh();
      });

    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    // Optimistic update
    const newStatus = !currentStatus;
    setPlan(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: newStatus } : t)
      };
    });

    try {
      await fetch(`/api/study-plan/task/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newStatus })
      });
    } catch (err) {
      console.error("Failed to toggle task", err);
      // Revert on failure
      setPlan(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: currentStatus } : t)
        };
      });
    }
  };

  if (isGenerating && !plan) {
    return (
      <div className="bg-obsidian-deep min-h-screen text-on-surface flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-obsidian-elevated border-t-electric-violet rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold text-white mb-2">{planTypeRef.current === 'quick' ? 'Generating Quick Plan' : loadingMessage}</h2>
        {planTypeRef.current === 'full' && (
          <div className="w-full max-w-2xl mt-8 bg-obsidian-surface p-6 rounded-2xl border border-obsidian-elevated text-left overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-violet to-cyber-green animate-pulse"></div>
            <pre className="font-mono text-sm text-on-surface-variant whitespace-pre-wrap break-words max-h-64 overflow-y-auto custom-scrollbar">
              {streamedText || "Initializing AI engine..."}
              <span className="animate-pulse inline-block w-2 h-4 bg-electric-violet ml-1 align-middle"></span>
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-obsidian-deep min-h-screen text-on-surface flex flex-col font-body-md antialiased selection:bg-electric-violet/30 selection:text-white">
      <Navbar title="My Study Plan" />
      
      <main className="flex-1 max-w-container-max mx-auto w-full px-gutter py-8 md:py-12">
        {plan ? (
          <PlanDisplay plan={plan} openWeek={openWeek} setOpenWeek={setOpenWeek} toggleTask={toggleTask} />
        ) : (
          <Wizard 
            step={step} 
            formData={formData} 
            setFormData={setFormData} 
            handleNext={handleNext} 
            handlePrev={handlePrev} 
            generatePlan={generatePlan}
          />
        )}
      </main>
    </div>
  );
}

function Wizard({ step, formData, setFormData, handleNext, handlePrev, generatePlan }) {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex justify-between text-xs font-mono-label text-on-surface-variant uppercase tracking-widest mb-2">
          <span>Step {step} of 5</span>
          <span>{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="h-2 w-full bg-obsidian-elevated rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-electric-violet"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="glass-panel p-6 sm:p-10 rounded-[2rem] border-electric-violet/20"
        >
          {step === 1 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display-lg text-white mb-6">When is your JAM exam?</h2>
              <input 
                type="date" 
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className="w-full bg-obsidian-deep border border-obsidian-elevated rounded-xl p-4 text-white focus:outline-none focus:border-electric-violet transition-colors text-lg"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display-lg text-white mb-6">How many hours can you study daily?</h2>
              <div className="flex items-center gap-6">
                <input 
                  type="range" 
                  min="1" max="8" 
                  value={formData.hoursPerDay}
                  onChange={(e) => setFormData({ ...formData, hoursPerDay: parseInt(e.target.value) })}
                  className="flex-1 accent-electric-violet h-2 bg-obsidian-elevated rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-3xl font-metric-xl text-white w-16 text-right">
                  {formData.hoursPerDay}h
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display-lg text-white mb-2">Rate your confidence</h2>
              <p className="text-on-surface-variant mb-6 text-sm">1 = Very weak, 5 = Ready for exam</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {SUBJECTS.map(subject => (
                  <div key={subject} className="bg-obsidian-deep border border-obsidian-elevated p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-sm font-semibold text-white line-clamp-1">{subject}</span>
                    <div className="flex justify-between">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setFormData({
                            ...formData, 
                            subjectConfidence: { ...formData.subjectConfidence, [subject]: rating }
                          })}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${formData.subjectConfidence[subject] === rating ? 'bg-electric-violet text-white scale-110' : 'bg-obsidian-surface text-on-surface-variant hover:bg-obsidian-elevated'}`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display-lg text-white mb-6">What is your target?</h2>
              <div className="space-y-3">
                {["Under 100", "Under 500", "Qualify only"].map(target => (
                  <button
                    key={target}
                    onClick={() => setFormData({ ...formData, targetRank: target })}
                    className={`w-full text-left p-5 rounded-xl border transition-all ${formData.targetRank === target ? 'bg-electric-violet/10 border-electric-violet text-white' : 'bg-obsidian-deep border-obsidian-elevated text-on-surface-variant hover:border-on-surface-variant'}`}
                  >
                    <span className="text-lg font-semibold">{target}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-display-lg text-white mb-6">How do you prefer to study?</h2>
              <div className="space-y-3">
                {["Topic by topic", "Mixed practice", "Year by year"].map(pref => (
                  <button
                    key={pref}
                    onClick={() => setFormData({ ...formData, preferences: pref })}
                    className={`w-full text-left p-5 rounded-xl border transition-all flex items-center justify-between ${formData.preferences === pref ? 'bg-cyber-green/10 border-cyber-green text-white' : 'bg-obsidian-deep border-obsidian-elevated text-on-surface-variant hover:border-on-surface-variant'}`}
                  >
                    <span className="text-lg font-semibold">{pref}</span>
                    {formData.preferences === pref && <span className="material-symbols-outlined text-cyber-green">check_circle</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button 
          onClick={handlePrev}
          disabled={step === 1}
          className={`px-6 py-3 font-semibold rounded-lg transition-colors ${step === 1 ? 'text-obsidian-elevated cursor-not-allowed' : 'text-on-surface-variant hover:text-white bg-obsidian-surface hover:bg-obsidian-elevated'}`}
        >
          Back
        </button>
        {step < 5 ? (
          <button 
            onClick={handleNext}
            disabled={step === 1 && !formData.examDate}
            className="bg-electric-violet hover:bg-inverse-primary text-white font-semibold px-8 py-3 rounded-lg transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        ) : (
          <div className="flex gap-4 flex-col sm:flex-row">
            <button 
              onClick={() => generatePlan('quick')}
              className="bg-obsidian-surface border border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10 font-bold px-6 py-3 rounded-lg transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              Quick Plan <span className="text-xs opacity-80">(Instant)</span>
            </button>
            <button 
              onClick={() => generatePlan('full')}
              className="bg-electric-violet hover:bg-[#7C3AED] text-white font-bold px-6 py-3 rounded-lg transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              Full AI Plan <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanDisplay({ plan, openWeek, setOpenWeek, toggleTask }) {
  // Group tasks by week
  const weeks = {};
  plan.tasks.forEach(task => {
    if (!weeks[task.weekNumber]) {
      weeks[task.weekNumber] = {
        tasks: [],
        focus: plan.generatedPlan?.weeks?.find(w => w.weekNumber === task.weekNumber)?.focus || "Focus tasks"
      };
    }
    weeks[task.weekNumber].tasks.push(task);
  });

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-obsidian-surface p-6 sm:p-8 rounded-[2rem] border border-obsidian-elevated">
        <div>
          <span className="font-mono-label text-electric-violet uppercase tracking-widest text-xs mb-2 block">AI Generated Plan</span>
          <h1 className="text-3xl sm:text-4xl font-display-lg text-white mb-2">Roadmap to {plan.targetRank}</h1>
          <p className="text-on-surface-variant font-body-sm max-w-lg">
            Targeting {new Date(plan.examDate).toLocaleDateString()} at {plan.hoursPerDay} hours/day. 
            Prioritizing your weak topics based on past attempts.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-obsidian-deep p-4 rounded-xl border border-obsidian-elevated">
          <div className="text-center">
            <div className="text-2xl font-metric-xl text-white">{plan.tasks.filter(t => t.completed).length}</div>
            <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Completed</div>
          </div>
          <div className="w-px h-8 bg-obsidian-elevated"></div>
          <div className="text-center">
            <div className="text-2xl font-metric-xl text-white">{plan.tasks.length}</div>
            <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Total Tasks</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(weeks).map(weekNum => {
          const week = weeks[weekNum];
          const isOpen = openWeek === parseInt(weekNum);
          const completedTasks = week.tasks.filter(t => t.completed).length;
          const percentage = Math.round((completedTasks / week.tasks.length) * 100) || 0;
          
          return (
            <div 
              key={weekNum} 
              className="bg-obsidian-surface border border-obsidian-elevated rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              {/* Accordion Header */}
              <button 
                onClick={() => setOpenWeek(isOpen ? null : parseInt(weekNum))}
                className="w-full flex items-center justify-between p-6 hover:bg-obsidian-elevated/30 transition-colors text-left"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="shrink-0 flex items-center justify-center relative">
                    <ActivityRing percentage={percentage} size={60} strokeWidth={4} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Week {weekNum}</h3>
                    <p className="text-sm text-on-surface-variant line-clamp-1">{week.focus}</p>
                  </div>
                </div>
                <div className="shrink-0 ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-obsidian-deep border border-obsidian-elevated">
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </button>

              {/* Accordion Body */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-obsidian-elevated bg-obsidian-deep/50"
                  >
                    <div className="p-6">
                      <div className="relative border-l-2 border-obsidian-elevated ml-4 space-y-8 pb-4">
                        {week.tasks.map((task, idx) => (
                          <div key={task.id} className="relative pl-8 group">
                            {/* Timeline node */}
                            <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-obsidian-deep ${task.completed ? 'bg-cyber-green' : 'bg-obsidian-elevated group-hover:bg-electric-violet/50'} transition-colors`}></div>
                            
                            <div 
                              onClick={() => toggleTask(task.id, task.completed)}
                              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer ${task.completed ? 'bg-cyber-green/5 border-cyber-green/20' : 'bg-obsidian-surface border-obsidian-elevated hover:border-electric-violet/50'}`}
                            >
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-xs font-mono-label text-on-surface-variant uppercase tracking-wider">Day {task.day}</span>
                                  {task.completed && <span className="material-symbols-outlined text-cyber-green text-sm">check_circle</span>}
                                </div>
                                <h4 className={`text-lg font-semibold ${task.completed ? 'text-on-surface-variant line-through' : 'text-white'}`}>{task.topic}</h4>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-1 bg-obsidian-deep px-3 py-1.5 rounded-lg border border-obsidian-elevated">
                                  <span className="material-symbols-outlined text-sm text-electric-violet">target</span>
                                  <span className="text-sm font-bold text-white">{task.questionTarget} Qs</span>
                                </div>
                                <div className="flex items-center gap-1 bg-obsidian-deep px-3 py-1.5 rounded-lg border border-obsidian-elevated">
                                  <span className="material-symbols-outlined text-sm text-warning-amber">schedule</span>
                                  <span className="text-sm font-bold text-white">{task.estimatedTime}m</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
