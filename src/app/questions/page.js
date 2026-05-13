"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  const cursorRef = useRef(null);

  useEffect(() => {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {

      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (cursorRef.current) {

        cursorRef.current.style.transform =
          `translate(${currentX}px, ${currentY}px)`;

      }

      requestAnimationFrame(animate);

    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };

  }, []);

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
        "Gravitation",
        "Relativity",
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
        "Modern Physics",
        "Nuclear Physics",
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
        "AC Circuits",
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
          (q) =>
            q.id === activeQuestion.id &&
            q.year === activeQuestion.year
        )
      : -1;

  const hasPreviousQuestion =
    currentQuestionIndex > 0;

  const hasNextQuestion =
    currentQuestionIndex <
    filteredQuestions.length - 1;

  const resetQuestionState = () => {

    setSelectedAnswer(null);

    setIsCorrect(null);

    setNatAnswer("");

  };

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

  const isNAT =
    activeQuestion?.type === "NAT";

  const isMSQ =
    activeQuestion?.type === "MSQ";

  const getCorrectOptions = (question) => {

  if (question.type === "NAT") {

    return [String(question.correctAnswer)];

  }

  // MSQ
  if (Array.isArray(question.correctAnswers)) {

    return question.correctAnswers.map(
      (answerIndex) => question.options[answerIndex]
    );

  }

  // MCQ
  if (
    typeof question.correctAnswer === "number"
  ) {

    return [
      question.options[question.correctAnswer]
    ];

  }

  return [];

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

  const enteredAnswer = Number(
    String(natAnswer).trim()
  );

  if (isNaN(enteredAnswer)) {
    return;
  }

  if (
    activeQuestion.correctAnswerMin !== undefined &&
    activeQuestion.correctAnswerMax !== undefined
  ) {

    setIsCorrect(
      enteredAnswer >= activeQuestion.correctAnswerMin &&
      enteredAnswer <= activeQuestion.correctAnswerMax
    );

    return;
  }

  const correctAnswer = Number(
    activeQuestion.correctAnswer
  );

  setIsCorrect(
    enteredAnswer === correctAnswer
  );
};

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden cursor-none">

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />

      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">

          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="rounded-2xl"
          />

        </div>

      </nav>

      {!selectedSubject && (

        <section className="max-w-7xl mx-auto px-6 py-16">

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
                key={`${question.year}-${question.id}`}
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

            {activeQuestion.questionImage && (

              <div className="flex justify-center mt-6">

                <Image
                  src={activeQuestion.questionImage}
                  alt="Question diagram"
                  width={500}
                  height={350}
                  className="h-auto max-w-full rounded-2xl border border-zinc-800"
                />

              </div>

            )}

            {isNAT ? (

              <div className="mt-8">

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

                  <input
                    type="number"
                    value={natAnswer}
                    onChange={(e) =>
                      setNatAnswer(e.target.value)
                    }
                    disabled={isCorrect !== null}
                    placeholder="Enter answer"
                    className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-xl text-white outline-none"
                  />

                  <button
                    onClick={submitNATAnswer}
                    disabled={
                      isCorrect !== null ||
                      natAnswer.trim() === ""
                    }
                    className="mt-5 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-black disabled:opacity-40"
                  >
                    Submit Answer
                  </button>

                </div>

              </div>

            ) : (

              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">

                  {activeQuestion.options.map(
                    (option, index) => {

                      const correct =
                        getCorrectOptions(
                          activeQuestion
                        ).includes(option);

                      const isSelected =
                        Array.isArray(selectedAnswer)
                          ? selectedAnswer.includes(option)
                          : selectedAnswer === option;

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
    !isMSQ &&
    isCorrect !== null
  }
  onClick={() => {

    if (isMSQ) {

      handleMultipleAnswer(option);

    } else {

      handleSingleAnswer(option);

    }

  }}
  className={`
    w-full
    rounded-3xl
    border
    p-4 md:p-6
    text-left
    transition
    overflow-hidden
    min-h-[120px]
    ${style}
  `}
>

  <div className="flex gap-4 items-start w-full min-w-0 overflow-hidden">

  <div
    className={`
      w-12 h-12 shrink-0
      rounded-full
      flex items-center justify-center
      text-xl text-white
      ${
        isSelected
          ? "bg-blue-600"
          : "bg-zinc-700"
      }
    `}
  >
    {String.fromCharCode(65 + index)}
  </div>

    <div className="flex-1 min-w-0 overflow-hidden">

      {activeQuestion.optionImages?.[index] && (

        <Image
          src={activeQuestion.optionImages[index]}
          alt={`Option ${index + 1}`}
          width={500}
          height={300}
          className="rounded-2xl border border-zinc-700 mb-4 h-auto w-full object-contain"
        />

      )}

      <div className="overflow-x-auto overflow-y-hidden max-w-full">

        <MathText className="option-copy w-full text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed text-white break-words">
          {option}
        </MathText>

      </div>

    </div>

  </div>

</button>

                      );
                    }
                  )}

                </div>

                {isMSQ && (

                  <button
                    onClick={submitMultipleAnswer}
                    disabled={
                      isCorrect !== null ||
                      !Array.isArray(selectedAnswer) ||
                      selectedAnswer.length === 0
                    }
                    className="mt-6 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-black disabled:opacity-40"
                  >
                    Submit Answer
                  </button>

                )}

              </>

            )}

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

                {isCorrect ? (

                  "Correct answer"

                ) : (

                  <div className="flex flex-wrap items-center gap-2">

                    <span>
                      Correct answer is:
                    </span>

                    <div className="text-white">

                      {isNAT ? (

  activeQuestion.correctAnswerMin !== undefined ? (

    <span>
      {activeQuestion.correctAnswerMin} to{" "}
      {activeQuestion.correctAnswerMax}
    </span>

  ) : (

    activeQuestion.correctAnswer

  )

) : (

  <MathText className="inline-block">
    {getCorrectOptions(activeQuestion).join(", ")}
  </MathText>

)}

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        </section>

      )}

    </div>
  );
}