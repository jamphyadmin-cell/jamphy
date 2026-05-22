import { useState } from "react";
import TestModal from "./TestModal";
import TestOverview from "./TestOverview";
import TestInterface from "./TestInterface";
import TestResult from "./TestResult";

export default function TestManager({ allQuestions, onClose }) {
  // testState: 'config' | 'overview' | 'active' | 'result'
  const [testState, setTestState] = useState("config");
  const [config, setConfig] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [answers, setAnswers] = useState(null);

  const handleGenerate = (newConfig) => {
    // Filter questions based on newConfig
    let filtered = allQuestions.filter(q => {
      // 1. Syllabus
      if (newConfig.syllabusMode === "specific") {
        // Need to check if the question's subject maps to the selected chapters
        // In the data, syllabus subtopics map to q.subject. Wait, the modal selects chapter IDs (like "math", "mechanics").
        // But the question's subject is the *subtopic* name (e.g. "Linear Algebra").
        // We need the syllabus array to map chapter ID to its subtopics.
        // Let's import syllabus to do this check.
        // Wait, it's easier if we pass syllabus down or import it directly.
        // Actually I will import it.
      }
      return true; // We'll refine this logic inside the component.
    });

    // Actually, let's just do the filtering here.
    const { syllabus } = require("../../data/syllabus");
    
    let allowedSubtopicsSet = null;
    if (newConfig.syllabusMode === "specific") {
      const allowedSubtopics = syllabus
        .filter(s => newConfig.selectedChapters.includes(s.id))
        .flatMap(s => s.subtopics);
      allowedSubtopicsSet = new Set(allowedSubtopics);
    }

    filtered = allQuestions.filter(q => {
      // 1. Types
      if (!newConfig.types.includes(q.type)) return false;

      // 2. Years
      if (newConfig.yearMode !== "All") {
        if (newConfig.yearMode === "Last 3") {
          if (q.year < 2024) return false; // Assuming 2026 is latest
        } else if (newConfig.yearMode === "Last 5") {
          if (q.year < 2022) return false;
        } else if (newConfig.yearMode === "Last 10") {
          if (q.year < 2017) return false;
        } else if (newConfig.yearMode === "Custom") {
          if (q.year < newConfig.customYearStart || q.year > newConfig.customYearEnd) return false;
        }
      }

      // 3. Syllabus
      if (newConfig.syllabusMode === "specific" && allowedSubtopicsSet) {
        if (!allowedSubtopicsSet.has(q.subject)) return false;
      }

      return true;
    });

    // Randomize and slice to numQuestions
    // Fisher-Yates shuffle
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const finalQuestions = shuffled.slice(0, newConfig.numQuestions);

    if (finalQuestions.length === 0) {
      alert("No questions found matching your criteria. Please adjust the filters.");
      return;
    }

    setTestQuestions(finalQuestions);
    setConfig(newConfig);
    setTestState("overview");
  };

  const handleStart = () => {
    setTestState("active");
  };

  const handleSubmit = (finalAnswers) => {
    setAnswers(finalAnswers);
    setTestState("result");
  };

  return (
    <>
      {testState === "config" && (
        <TestModal 
          onClose={onClose} 
          onGenerate={handleGenerate} 
        />
      )}
      {testState === "overview" && (
        <TestOverview 
          config={config} 
          questionsCount={testQuestions.length} 
          onStart={handleStart} 
          onCancel={onClose} 
        />
      )}
      {testState === "active" && (
        <TestInterface 
          questions={testQuestions} 
          durationMins={config.duration} 
          onSubmit={handleSubmit} 
        />
      )}
      {testState === "result" && (
        <TestResult 
          questions={testQuestions} 
          answers={answers} 
          onClose={onClose} 
        />
      )}
    </>
  );
}
