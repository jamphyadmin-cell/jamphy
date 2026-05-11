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

  const [failedImages, setFailedImages] =
    useState({});

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

  const isMultipleChoice =
    activeQuestion &&
    Array.isArray(activeQuestion.correctAnswer);

  const isNAT =
    activeQuestion?.type === "NAT";

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

  const arraysMatch = (first, second) => {

    if (first.length !== second.length) {

      return false;

    }

    const firstSet = new Set(first);

    return second.every((value) =>
      firstSet.has(value)
    );

  };

  const handleSingleAnswer = (option) => {

    setSelectedAnswer(option);

    const [correctOption] =
      getCorrectOptions(activeQuestion);

    setIsCorrect(option === correctOption);

  };

  const handleMultipleAnswer = (option) => {

    if (isCorrect !== null) {

      return;

    }

    setSelectedAnswer((current) => {

      const currentAnswers = Array.isArray(current)
        ? current
        : [];

      if (currentAnswers.includes(option)) {

        return currentAnswers.filter(
          (answer) => answer !== option
        );

      }

      return [...currentAnswers, option];

    });

  };

  const submitMultipleAnswer = () => {

    const answers = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : [];

    if (answers.length === 0) {

      return;

    }

    setIsCorrect(
      arraysMatch(
        answers,
        getCorrectOptions(activeQuestion)
      )
    );

  };

  const submitNATAnswer = () => {

    const correctAnswer =
      String(activeQuestion.correctAnswer).trim();

    const enteredAnswer =
      String(natAnswer).trim();

    if (!enteredAnswer) {

      return;

    }

    setIsCorrect(
      Number(enteredAnswer) ===
      Number(correctAnswer)
    );

  };

  return (

  <div className="min-h-screen bg-black text-white">

    {/* HEADER */}

    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">

        <div className="flex items-center gap-4">

          <Image
            src="/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="rounded-2xl"
          />

          <div>

            <h1 className="text-2xl font-bold tracking-tight">
              JAM Physics Hub
            </h1>

            <p className="text-zinc-400 text-sm">
              IIT JAM Physics Preparation Platform
            </p>

          </div>

        </div>

      </div>

    </nav>

      {!selectedSubject && (

        <section className="max-w-7xl mx-auto px-6 py-16">

          <h2 className="text-5xl font-black mb-12">
            IIT JAM Physics Subjects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {syllabus.map((subject) => (

              <button
                key={subject.id}
                onClick={() => {

                  setSelectedSubject(subject);

                  setSelectedYear("All");

                  setSelectedSubtopic("All");

                }}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-left hover:bg-zinc-900 transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl mb-6">
                  {icons[subject.id]}
                </div>

                <h3 className="text-3xl font-bold tracking-tight">
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

          <div className="flex flex-wrap gap-4 mb-10">

            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value)
              }
              className="rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none"
            >

              <option value="All">
                All Years
              </option>

              {[...new Set(
                questions.map((q) => q.year)
              )]
                .sort((a, b) => b - a)
                .map((year) => (

                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>

                ))}

            </select>

            <select
              value={selectedSubtopic}
              onChange={(e) =>
                setSelectedSubtopic(e.target.value)
              }
              className="rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none"
            >

              <option value="All">
                All Subtopics
              </option>

              {selectedSubject.subtopics.map(
                (topic) => (

                  <option
                    key={topic}
                    value={topic}
                  >
                    {topic}
                  </option>

                )
              )}

            </select>

            <button
              onClick={() => {

                setSelectedYear("All");

                setSelectedSubtopic("All");

              }}
              className="rounded-2xl border border-zinc-700 px-5 py-4 text-white hover:bg-zinc-900"
            >
              Reset Filters
            </button>

          </div>

          <div className="mb-8 text-zinc-400 text-lg">

            Showing{" "}
            <span className="text-white font-bold">
              {filteredQuestions.length}
            </span>{" "}
            questions

          </div>

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

            <div className="grid md:grid-cols-2 gap-4 mt-8">

              {activeQuestion.options.map(
                (option, index) => {

                  const correct =
                    getCorrectOptions(
                      activeQuestion
                    ).includes(option);

                  const isSelected =
                    selectedAnswer === option;

                  let style =
                    "border-zinc-700 bg-zinc-900 hover:bg-zinc-800";

                  if (isCorrect !== null) {

                    if (correct) {

                      style =
                        "border-green-500 bg-green-500/20";

                    }

                    if (
                      isSelected &&
                      !correct
                    ) {

                      style =
                        "border-red-500 bg-red-500/20";

                    }
                  }

                  return (

                    <button
                      key={index}
                      disabled={
                        isCorrect !== null
                      }
                      onClick={() =>
                        handleSingleAnswer(option)
                      }
                      className={`rounded-3xl border min-h-[100px] p-5 text-left transition ${style}`}
                    >

                      <div className="flex gap-4 items-start">

                        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-xl shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>

                        <div className="flex-1">

                          {activeQuestion.optionImages?.[index] && (

                            <Image
                              src={activeQuestion.optionImages[index]}
                              alt={`Option ${index + 1}`}
                              width={500}
                              height={300}
                              className="rounded-2xl border border-zinc-700 mb-4 h-auto w-full object-contain"
                            />

                          )}

                          <MathText className="option-copy text-[18px] leading-relaxed text-white pt-1 overflow-x-auto">
                            {option}
                          </MathText>

                        </div>

                      </div>

                    </button>

                  );
                }
              )}

            </div>

            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">

              <button
                onClick={() =>
                  goToQuestion(currentQuestionIndex - 1)
                }
                disabled={!hasPreviousQuestion}
                className="rounded-2xl border border-zinc-700 px-6 py-4 text-lg font-bold text-white hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous Question
              </button>

              <button
                onClick={() =>
                  goToQuestion(currentQuestionIndex + 1)
                }
                disabled={!hasNextQuestion}
                className="rounded-2xl bg-white px-6 py-4 text-lg font-bold text-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Question →
              </button>

            </div>

            {isCorrect !== null && (

              <div
                className={`mt-6 rounded-2xl border p-5 text-lg font-bold ${
                  isCorrect
                    ? "border-green-500 bg-green-500/20 text-green-200"
                    : "border-red-500 bg-red-500/20 text-red-200"
                }`}
              >

                {isCorrect
                  ? "Correct answer"
                  : "Not quite. The correct option is highlighted."}

              </div>

            )}

          </div>

        </section>

        )}
    </div>
);
}