"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { questions } from "../../data/questions";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

const icons = {
  math: "∫",
  mechanics: "⚛",
  waves: "〰",
  em: "⚡",
  thermo: "🔥",
  modern: "☄",
  solid: "⌁",
};

const markdownComponents = {
  p: ({ children }) => <p>{children}</p>,
};

const normalizeMathDelimiters = (value) =>
  String(value)
    .replace(/\\\[/g, "$$")
    .replace(/\\\]/g, "$$")
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$");

function MathText({ children, className = "" }) {
  return (
    <div className={`math-copy ${className}`}>
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {normalizeMathDelimiters(children)}
      </ReactMarkdown>
    </div>
  );
}

export default function IITJamPhysicsHub() {

  const syllabus = [
    {
      id: "math",
      name: "Mathematical Methods",
      subtopics: [
        "Differential Equations",
        "Matrices",
        "Vector Calculus",
        "Fourier Series",
        "Mathematical Physics",
        "Complex Numbers",
      ],
    },

    {
      id: "mechanics",
      name: "Mechanics & General Properties",
      subtopics: [
        "Classical Mechanics",
        "Rotational Dynamics",
        "Circular Motion",
        "Work Power Energy",
      ],
    },

    {
      id: "waves",
      name: "Oscillations, Waves & Optics",
      subtopics: [
        "Polarization",
        "Wave Optics",
        "Optics",
        "Waves",
        "Simple Harmonic Motion",
        "Oscillations",
      ],
    },

    {
      id: "em",
      name: "Electricity & Magnetism",
      subtopics: [
        "Electrostatics",
        "Electromagnetic Theory",
        "Electromagnetic Induction",
        "Electromagnetism",
        "LCR Circuits",
      ],
    },

    {
      id: "thermo",
      name: "Thermodynamics & KTG",
      subtopics: [
        "Thermodynamics",
        "Phase Transitions",
      ],
    },

    {
      id: "modern",
      name: "Modern Physics",
      subtopics: [
        "Quantum Mechanics",
        "Special Relativity",
      ],
    },

    {
      id: "solid",
      name: "Solid State & Electronics",
      subtopics: [
        "Semiconductor Physics",
        "Electronics",
        "Solid State Physics",
        "Boolean Algebra",
      ],
    },
  ];

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [selectedYear, setSelectedYear] =
    useState("All");

  const [selectedSubtopic, setSelectedSubtopic] =
    useState("All");

  const [activeQuestion, setActiveQuestion] =
    useState(null);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [isCorrect, setIsCorrect] =
    useState(null);

  const [natAnswer, setNatAnswer] =
    useState("");

  const filteredQuestions = useMemo(() => {

    return questions.filter((q) => {

      const subjectMatch = selectedSubject
        ? selectedSubject.subtopics.includes(q.subject)
        : true;

      const yearMatch =
        selectedYear === "All"
          ? true
          : q.year === Number(selectedYear);

      const subtopicMatch =
        selectedSubtopic === "All"
          ? true
          : q.subject === selectedSubtopic;

      return (
        subjectMatch &&
        yearMatch &&
        subtopicMatch
      );

    });

  }, [
    selectedSubject,
    selectedYear,
    selectedSubtopic,
  ]);

  const currentQuestionIndex =
    activeQuestion
      ? filteredQuestions.findIndex(
          (q) => q.id === activeQuestion.id
        )
      : -1;

  const hasPreviousQuestion =
    currentQuestionIndex > 0;

  const hasNextQuestion =
    currentQuestionIndex <
    filteredQuestions.length - 1;

  const goToQuestion = (index) => {

    if (
      index < 0 ||
      index >= filteredQuestions.length
    ) {
      return;
    }

    setActiveQuestion(
      filteredQuestions[index]
    );

    resetQuestionState();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const resetQuestionState = () => {

    setSelectedAnswer(null);

    setIsCorrect(null);

    setNatAnswer("");

  };

  const getCorrectOptions = (question) => {

    if (
      question.type === "NAT"
    ) {
      return [String(question.correctAnswer)];
    }

    if (Array.isArray(question.correctAnswer)) {

      return question.correctAnswer.map(
        (answerIndex) => question.options[answerIndex]
      );

    }

    return [
      question.options[question.correctAnswer],
    ];

  };

  const handleSingleAnswer = (option) => {

    setSelectedAnswer(option);

    const [correctOption] =
      getCorrectOptions(activeQuestion);

    setIsCorrect(option === correctOption);

  };

  return (

    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">

          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="object-contain"
          />

        </div>

      </nav>

      {!selectedSubject && (

        <section className="max-w-[1800px] mx-auto px-4 py-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

            {syllabus.map((subject) => (

              <button
                key={subject.id}
                onClick={() => {

                  setSelectedSubject(subject);

                  setSelectedYear("All");

                  setSelectedSubtopic("All");

                }}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left hover:bg-zinc-900 transition min-h-[190px]"
              >

                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl mb-5">
                  {icons[subject.id]}
                </div>

                <h3 className="text-2xl font-bold tracking-tight leading-tight">
                  {subject.name}
                </h3>

              </button>

            ))}

          </div>

        </section>

      )}

      {selectedSubject && !activeQuestion && (

        <section className="max-w-7xl mx-auto px-6 py-16">

          <button
            onClick={() => setSelectedSubject(null)}
            className="text-zinc-500 hover:text-white mb-8"
          >
            ← Back to Subjects
          </button>

          <h2 className="text-6xl font-black tracking-tight mb-10">
            {selectedSubject.name}
          </h2>

          <div className="grid gap-6">

            {filteredQuestions.map((question) => (

              <button
                key={question.id}
                onClick={() => {

                  setActiveQuestion(question);

                  resetQuestionState();

                }}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-left hover:bg-zinc-900 transition"
              >

                <div className="flex gap-3 mb-5 flex-wrap">

                  <span className="px-4 py-1 rounded-full bg-zinc-800 text-sm">
                    {question.year}
                  </span>

                  <span className="px-4 py-1 rounded-full bg-zinc-800 text-sm">
                    {question.subject}
                  </span>

                  <span className="px-4 py-1 rounded-full bg-zinc-800 text-sm">
                    {question.type}
                  </span>

                </div>

                <MathText className="question-preview text-lg leading-relaxed text-zinc-200 line-clamp-3 overflow-hidden">
                  {question.question}
                </MathText>

              </button>

            ))}

          </div>

        </section>

      )}

      {activeQuestion && (

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">

          <button
            onClick={() => setActiveQuestion(null)}
            className="text-zinc-500 hover:text-white mb-6"
          >
            ← Back to Questions
          </button>

          <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-5 md:p-7">

            <div className="flex gap-2 flex-wrap mb-5">

              <span className="px-4 py-1 rounded-full bg-blue-600 text-sm font-bold">
                Question {currentQuestionIndex + 1} / {filteredQuestions.length}
              </span>

              <span className="px-4 py-1 rounded-full bg-zinc-800 text-sm">
                {activeQuestion.year}
              </span>

              <span className="px-4 py-1 rounded-full bg-zinc-800 text-sm">
                {activeQuestion.subject}
              </span>

              <span className="px-4 py-1 rounded-full bg-zinc-800 text-sm">
                {activeQuestion.type}
              </span>

            </div>

            <MathText className="question-copy text-[18px] md:text-[20px] leading-[1.8] text-zinc-100 font-normal overflow-x-auto">
              {activeQuestion.question}
            </MathText>

            {activeQuestion.image && (

              <div className="flex justify-center mt-6">

                <Image
                  src={activeQuestion.image}
                  alt="Question diagram"
                  width={500}
                  height={350}
                  className="h-auto max-w-full rounded-2xl border border-zinc-800"
                />

              </div>

            )}

          </div>

        </section>

      )}

    </div>
  );
}