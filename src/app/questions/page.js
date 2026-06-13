"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserMenu from "../../components/UserMenu";
import InvitesMenu from "../../components/InvitesMenu";
import { questions } from "../../data/questions";
import { syllabus } from "../../data/syllabus";
import TestManager from "../../components/test/TestManager";
import TestModal from "../../components/test/TestModal";
import MathText from "../../components/MathText";
import { useTransitionContext } from "../../components/TransitionProvider";
import { motion } from "framer-motion";

const icons = {
  math: "∫",
  mechanics: "⚛",
  waves: "〰",
  em: "⚡",
  thermo: "🔥",
  modern: "☄",
  solid: "⌁",
};

export default function IITJamPhysicsHub() {
  const { navigateWithTransition } = useTransitionContext();
  const cursorRef = useRef(null);

  useEffect(() => {

    let mouseX = -100;
    let mouseY = -100;

    let currentX = -100;
    let currentY = -100;

    const moveCursor = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

    };

    window.addEventListener("mousemove", moveCursor);

    let animationFrameId;

    const animate = () => {

      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;

      if (cursorRef.current) {

        cursorRef.current.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0)`;

      }

      animationFrameId = requestAnimationFrame(animate);

    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrameId);
    };

  }, []);

  const [testActive, setTestActive] = useState(false);
  const [liveRoomActive, setLiveRoomActive] = useState(false);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [selectedYear, setSelectedYear] =
    useState("All");

  const [selectedSubtopic, setSelectedSubtopic] =
    useState("All");

  const [selectedType, setSelectedType] =
    useState("All");

  const { data: session, status, update } = useSession();


  const [activeQuestion, setActiveQuestion] =
    useState(null);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [isCorrect, setIsCorrect] =
    useState(null);

  const [natAnswer, setNatAnswer] =
    useState("");

  const [showSolution, setShowSolution] =
    useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [vaultItems, setVaultItems] = useState(new Set());
  const [toastMessage, setToastMessage] = useState("");
  
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const fetcher = (url) => fetch(url).then(r => r.json());
  const { data: commentsData, mutate: mutateComments } = useSWR(
    activeQuestion && showDiscussion ? `/api/comments?questionId=${activeQuestion.year}-${activeQuestion.id}` : null,
    fetcher
  );

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmittingComment(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: `${activeQuestion.year}-${activeQuestion.id}`,
          text: newComment
        })
      });
      if (res.ok) {
        setNewComment("");
        mutateComments();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/vault")
        .then(res => res.json())
        .then(data => {
          if (data.vaultItems) {
            setVaultItems(new Set(data.vaultItems.map(v => v.questionId)));
          }
        })
        .catch(console.error);
    }
  }, [status]);

  const toggleVault = async () => {
    if (status !== "authenticated") return alert("Please sign in to save to vault.");
    const qid = String(activeQuestion.id);
    const currentlyInVault = vaultItems.has(qid);

    if (currentlyInVault) {
      if (!confirm("Remove this question from the Mistakes Vault?")) return;
      try {
        await fetch(`/api/vault?questionId=${qid}`, { method: "DELETE" });
        setVaultItems(prev => {
          const next = new Set(prev);
          next.delete(qid);
          return next;
        });
        setToastMessage("Removed from Mistakes Vault");
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await fetch("/api/vault", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: qid, isCorrect: false })
        });
        setVaultItems(prev => new Set(prev).add(qid));
        setToastMessage("Added to Mistakes Vault");
      } catch (e) {
        console.error(e);
      }
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const questionLoadTime = useRef(0);

  const handleReportQuestion = async () => {
    if (!reportDescription.trim()) return;
    setIsReporting(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: `${activeQuestion.year}-${activeQuestion.id}`,
          description: reportDescription,
        }),
      });
      if (res.ok) {
        setIsReportModalOpen(false);
        setReportDescription("");
        alert("Report submitted successfully. Thank you!");
      } else {
        alert("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsReporting(false);
    }
  };

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

      const typeMatch =
        selectedType === "All"
          ? true
          : q.type === selectedType;

      return (
        subjectMatch &&
        yearMatch &&
        subtopicMatch &&
        typeMatch
      );

    });

  }, [
    selectedSubject,
    selectedYear,
    selectedSubtopic,
    selectedType,
  ]);

  const currentQuestionIndex =
    activeQuestion
      ? filteredQuestions.findIndex(
        (q) =>
          q.id === activeQuestion.id &&
          q.year === activeQuestion.year
      )
      : -1;

  useEffect(() => {
    questionLoadTime.current = Date.now();
  }, [currentQuestionIndex]);

  const hasPreviousQuestion =
    currentQuestionIndex > 0;

  const hasNextQuestion =
    currentQuestionIndex <
    filteredQuestions.length - 1;

  const resetQuestionState = () => {

    setSelectedAnswer(null);

    setIsCorrect(null);

    setNatAnswer("");

    setShowSolution(false);

    questionLoadTime.current = Date.now();
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

      return question.correctAnswers;

    }

    // MCQ
    if (
      typeof question.correctAnswer === "number"
    ) {

      return [question.correctAnswer];

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

  const handleSingleAnswer = (index) => {
    if (isCorrect !== null) return;
    setSelectedAnswer(index);
  };

  const submitSingleAnswer = () => {
    if (selectedAnswer === null) return;
    const [correctOptionIndex] = getCorrectOptions(activeQuestion);
    const correct = selectedAnswer === correctOptionIndex;
    setIsCorrect(correct);
    
    const timeTaken = Math.floor((Date.now() - questionLoadTime.current) / 1000);
    
    if (session?.user) {
      const questionId = `${activeQuestion.year}-${activeQuestion.id}`;
      fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isCorrect: correct })
      }).catch(err => console.error(err));
      
      fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isCorrect: correct, timeTaken, subject: activeQuestion.subject, selectedAnswer: String(selectedAnswer + 1) })
      }).catch(err => console.error(err));
    }
  };

  const handleMultipleAnswer = (index) => {

    if (isCorrect !== null) {

      return;

    }

    setSelectedAnswer((current) => {

      const currentAnswers = Array.isArray(current)
        ? current
        : [];

      if (currentAnswers.includes(index)) {

        return currentAnswers.filter(
          (answer) => answer !== index
        );

      }

      return [...currentAnswers, index];

    });

  };

  const submitMultipleAnswer = () => {

    const answers = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : [];

    if (answers.length === 0) {

      return;

    }

    const correct = arraysMatch(
      answers,
      getCorrectOptions(activeQuestion)
    );
    setIsCorrect(correct);
    
    const timeTaken = Math.floor((Date.now() - questionLoadTime.current) / 1000);
    
    if (session?.user) {
      const questionId = `${activeQuestion.year}-${activeQuestion.id}`;
      fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isCorrect: correct })
      }).catch(err => console.error(err));
      
      fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isCorrect: correct, timeTaken, subject: activeQuestion.subject, selectedAnswer: answers.map(a => a + 1).sort().join(',') })
      }).catch(err => console.error(err));
    }
  };

  const submitNATAnswer = () => {

    const enteredAnswer = Number(
      String(natAnswer).trim()
    );

    if (isNaN(enteredAnswer)) {
      return;
    }
    
    let correct = false;

    if (
      activeQuestion.correctAnswerMin !== undefined &&
      activeQuestion.correctAnswerMax !== undefined
    ) {

      correct = enteredAnswer >= activeQuestion.correctAnswerMin &&
        enteredAnswer <= activeQuestion.correctAnswerMax;

    } else {
      const correctAnswer = Number(
        activeQuestion.correctAnswer
      );
      correct = enteredAnswer === correctAnswer;
    }
    
    setIsCorrect(correct);
    
    const timeTaken = Math.floor((Date.now() - questionLoadTime.current) / 1000);
    
    if (session?.user) {
      const questionId = `${activeQuestion.year}-${activeQuestion.id}`;
      fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isCorrect: correct })
      }).catch(err => console.error(err));
      
      fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isCorrect: correct, timeTaken, subject: activeQuestion.subject, selectedAnswer: String(enteredAnswer) })
      }).catch(err => console.error(err));
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />

      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/");
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={200}
                className="rounded-2xl"
              />
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setLiveRoomActive(true)}
              className="px-4 py-2 rounded-xl border border-zinc-300 bg-white text-black font-semibold hover:bg-zinc-200 transition hidden sm:block shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Live Room
            </button>
            <button
              onClick={() => setTestActive(true)}
              className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition hidden sm:block shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            >
              Create Test
            </button>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/");
              }}
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition hidden sm:block"
            >
              Home
            </Link>
            {session?.user && <InvitesMenu />}
            <UserMenu session={session} />
          </div>
        </div>
      </nav>

      {/* Auth Overlay */}
      {status !== "loading" && status === "unauthenticated" && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-800 rounded-[32px] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center">
            <div className="mb-8 drop-shadow-2xl">
              <Image
                src="/logo.png"
                alt="Jamphy Logo"
                width={140}
                height={140}
                className="rounded-3xl"
              />
            </div>

            <h2 className="text-3xl font-black mb-3 text-white">Login Required</h2>
            <p className="text-zinc-400 mb-8 font-medium text-sm">
              Please log in to access the practice questions and save your progress.
            </p>
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 transition-all text-white font-bold text-lg group"
            >
              Sign in with
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Google"
                width={24}
                height={24}
                className="h-6 w-auto object-contain mt-0.5 group-hover:scale-105 transition-transform"
              />
            </button>
          </div>
        </div>
      )}

      {status === "authenticated" && session?.user?.username && (
        <>
          {!selectedSubject && !testActive && !liveRoomActive && (

            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-6 py-16"
            >

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {syllabus.map((subject) => (

                  <button
                    key={subject.id}
                    onClick={() => {
                      setSelectedSubject(subject);
                      setSelectedYear("All");
                      setSelectedSubtopic("All");
                    }}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-left hover:bg-zinc-900 transition h-full flex flex-col items-start"
                  >

                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl mb-4">
                      {icons[subject.id]}
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight">
                      {subject.name}
                    </h3>

                  </button>

                ))}

              </div>

            </motion.section>

          )}

          {selectedSubject && !activeQuestion && !testActive && !liveRoomActive && (

            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-6 py-16"
            >

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

                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value)
                  }
                  className="rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="MCQ">MCQ</option>
                  <option value="MSQ">MSQ</option>
                  <option value="NAT">NAT</option>
                </select>

                <button
                  onClick={() => {

                    setSelectedYear("All");

                    setSelectedSubtopic("All");

                    setSelectedType("All");

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

            </motion.section>

          )}

          {activeQuestion && !testActive && !liveRoomActive && (

            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-4 md:px-6 py-6"
            >

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

                {(activeQuestion.imageUrl || activeQuestion.questionImage || activeQuestion.image) && (

                  <div className="flex justify-center mt-6">

                    <img
                      src={activeQuestion.imageUrl || activeQuestion.questionImage || activeQuestion.image}
                      alt="Question diagram"
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
                            ).includes(index);

                          const isSelected =
                            Array.isArray(selectedAnswer)
                              ? selectedAnswer.includes(index)
                              : selectedAnswer === index;

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

                                  handleMultipleAnswer(index);

                                } else {

                                  handleSingleAnswer(index);

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
      ${isSelected
                                      ? "bg-blue-600"
                                      : "bg-zinc-700"
                                    }
    `}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>

                                <div className="flex-1 min-w-0 overflow-hidden">

                                  {activeQuestion.optionImages?.[index] && (

                                    <img
                                      src={activeQuestion.optionImages[index]}
                                      alt={`Option ${index + 1}`}
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

                    {(isMSQ || activeQuestion?.type === "MCQ") && (

                      <button
                        onClick={activeQuestion?.type === "MCQ" ? submitSingleAnswer : submitMultipleAnswer}
                        disabled={
                          isCorrect !== null ||
                          (isMSQ ? (!Array.isArray(selectedAnswer) || selectedAnswer.length === 0) : selectedAnswer === null)
                        }
                        className="mt-6 rounded-2xl bg-white px-6 py-4 text-lg font-bold text-black disabled:opacity-40"
                      >
                        Submit Answer
                      </button>

                    )}

                  </>

                )}

                <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">

                  <div className="flex gap-4">
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
                      onClick={toggleVault}
                      className={`flex items-center justify-center w-16 h-[60px] rounded-2xl border transition-all ${
                        vaultItems.has(String(activeQuestion.id))
                          ? "bg-amber-500/20 border-amber-500 text-amber-500 hover:bg-amber-500/30"
                          : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                      title="Toggle Mistakes Vault"
                    >
                      {vaultItems.has(String(activeQuestion.id)) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>

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

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="text-sm text-zinc-500 hover:text-red-400 transition underline decoration-zinc-700 underline-offset-4"
                  >
                    Report an error with this question
                  </button>
                </div>

                {isCorrect !== null && (

                  <div
                    className={`mt-6 rounded-2xl border p-5 text-lg font-bold ${isCorrect
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
                              {getCorrectOptions(activeQuestion).map(idx => String.fromCharCode(65 + Number(idx))).join(", ")}
                            </MathText>

                          )}

                        </div>

                      </div>

                    )}

                  </div>

                )}

                {(isCorrect === false || isCorrect === true) && (activeQuestion.solution || activeQuestion.detailedSolution) && (
                  <div className="mt-6 flex flex-col items-center">
                    {!showSolution ? (
                      <button
                        onClick={() => setShowSolution(true)}
                        className="px-6 py-3 rounded-2xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition"
                      >
                        Check Detailed Solution
                      </button>
                    ) : (
                      <div className="w-full mt-4 p-6 rounded-2xl border border-zinc-700 bg-zinc-900">
                        <h4 className="text-xl font-bold text-white mb-4">Detailed Solution</h4>
                        <MathText className="text-zinc-300 leading-relaxed text-sm md:text-base break-words">
                          {activeQuestion.solution || activeQuestion.detailedSolution}
                        </MathText>
                      </div>
                    )}
                  </div>
                )}

                {/* Discussion Section */}
                <div className="mt-12 border-t border-zinc-800 pt-8">
                  <button
                    onClick={() => setShowDiscussion(!showDiscussion)}
                    className="flex items-center gap-3 text-xl font-bold text-white hover:text-cyan-400 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 transition-transform ${showDiscussion ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    Discussion {commentsData?.comments ? `(${commentsData.comments.length})` : ""}
                  </button>
                  
                  {showDiscussion && (
                    <div className="mt-6 space-y-6">
                      {status === "authenticated" ? (
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                            {session.user.image ? (
                              <Image src={session.user.image} alt="User" width={40} height={40} className="object-cover" />
                            ) : (
                              session.user.name?.[0].toUpperCase() || "U"
                            )}
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment or ask a question..."
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500 resize-none h-24"
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={handlePostComment}
                                disabled={isSubmittingComment || !newComment.trim()}
                                className="px-6 py-2 bg-white text-black font-bold rounded-xl disabled:opacity-50 transition"
                              >
                                {isSubmittingComment ? "Posting..." : "Post"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-zinc-400">
                          Please <button onClick={() => signIn()} className="text-cyan-400 font-bold hover:underline">sign in</button> to join the discussion.
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        {!commentsData ? (
                          <div className="text-center py-4 text-zinc-500">Loading comments...</div>
                        ) : commentsData.error ? (
                          <div className="text-center py-4 text-red-500">Failed to load comments: {commentsData.error}</div>
                        ) : !commentsData.comments || commentsData.comments.length === 0 ? (
                          <div className="text-center py-8 text-zinc-500">No comments yet. Be the first!</div>
                        ) : (
                          commentsData.comments.map(comment => (
                            <div key={comment.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex gap-4">
                              <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                                {comment.user.image ? (
                                  <Image src={comment.user.image} alt={comment.user.name} width={40} height={40} className="object-cover" />
                                ) : (
                                  comment.user.name?.[0].toUpperCase() || "U"
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-white">{comment.user.name || "Anonymous"}</span>
                                  <span className="text-xs text-zinc-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed">{comment.text}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </motion.section>

          )}

          {testActive && (
            <TestManager
              allQuestions={questions}
              onClose={() => setTestActive(false)}
            />
          )}

          {liveRoomActive && (
            <TestModal 
              onClose={() => setLiveRoomActive(false)}
              onGenerate={async (config) => {
                try {
                  const res = await fetch('/api/room/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(config)
                  });
                  const data = await res.json();
                  if (res.ok) {
                    window.location.href = `/room/${data.roomId}`;
                  } else {
                    alert(data.error || "Failed to create Live Room");
                  }
                } catch (err) {
                  alert("An error occurred");
                }
              }}
            />
          )}
        </>
      )}

      {isReportModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Report Question Error</h3>
            <p className="text-zinc-400 mb-6">
              Found a mistake in the question, options, or answer? Let us know and we&apos;ll fix it.
            </p>
            <textarea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Describe the error..."
              className="w-full h-32 bg-black border border-zinc-700 rounded-2xl p-4 text-white outline-none mb-6 resize-none focus:border-zinc-500 transition"
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-6 py-3 rounded-2xl border border-zinc-700 text-white hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReportQuestion}
                disabled={isReporting || !reportDescription.trim()}
                className="px-6 py-2 bg-red-600/20 text-red-400 font-bold rounded-xl border border-red-500/30 hover:bg-red-600/40 transition disabled:opacity-50"
              >
                {isReporting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-white px-6 py-3 rounded-full font-medium shadow-2xl z-[99999] animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
    </div>
  );
}