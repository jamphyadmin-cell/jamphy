"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import MathText from "@/components/MathText";
import UserTable from "../../components/UserTable";
import { updateReportStatus } from "./actions";
import ManualQuestionForm from "./ManualQuestionForm";

export default function AdminTabs({ reports, users }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Extract state
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("2024");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [extractionElapsed, setExtractionElapsed] = useState(0);

  useEffect(() => {
    let timer;
    if (isExtracting) {
      timer = setInterval(() => {
        setExtractionElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExtracting]);

  const [questionsList, setQuestionsList] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [activeComments, setActiveComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [questionSearchQuery, setQuestionSearchQuery] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");

  const fetchQuestions = async () => {
    setIsLoadingQuestions(true);
    try {
      const res = await fetch(`/api/admin/questions?adminPassword=${password}`);
      if (res.ok) {
        const data = await res.json();
        setQuestionsList(data.questions || []);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Manage Questions') {
      fetchQuestions();
    }
  };

  const handleToggleQuestion = async (q) => {
    if (expandedQuestionId === q.id) {
      setExpandedQuestionId(null);
      setActiveComments([]);
      return;
    }

    setExpandedQuestionId(q.id);
    setIsLoadingComments(true);
    setActiveComments([]);
    try {
      const res = await fetch(`/api/comments?questionId=${q.year}-${q.id}`);
      if (res.ok) {
        const data = await res.json();
        setActiveComments(data.comments || []);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setActiveComments(prev => prev.filter(c => c.id !== commentId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Error deleting comment");
    }
  };

  const subjects = ["All", ...new Set(questionsList.map(q => q.subject).filter(Boolean))];

  const filteredQuestions = questionsList.filter(q => {
    const matchesSubject = selectedSubjectFilter === "All" || q.subject === selectedSubjectFilter;
    const matchesSearch = (q.question && q.question.toLowerCase().includes(questionSearchQuery.toLowerCase())) || 
                          (q.id && q.id.toString().toLowerCase().includes(questionSearchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) setIsAuthenticated(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    setIsExtracting(true);
    setMessage("");
    setExtractionElapsed(0);
    const startTime = Date.now();

    try {
      let allExtracted = [];

      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const { PDFDocument } = await import('pdf-lib');
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        
        const CHUNK_SIZE = 4; // 4 pages per chunk to avoid 4.5MB limit and 60s Vercel timeout
        
        for (let i = 0; i < pageCount; i += CHUNK_SIZE) {
          const end = Math.min(i + CHUNK_SIZE, pageCount);
          setMessage(`Extracting pages ${i + 1} to ${end} of ${pageCount}...`);
          
          const newPdf = await PDFDocument.create();
          const pageIndices = Array.from({length: end - i}, (_, idx) => i + idx);
          const pages = await newPdf.copyPages(pdfDoc, pageIndices);
          pages.forEach(p => newPdf.addPage(p));
          
          // route.js expects base64Data
          const base64Data = await newPdf.saveAsBase64({ dataUri: true });

          const res = await fetch("/api/admin/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              base64Data,
              mimeType: "application/pdf",
              adminPassword: password
            })
          });

          if (!res.ok) {
            console.error(`Chunk failed with status ${res.status}`);
            continue;
          }

          const data = await res.json();
          if (data.questions) {
            allExtracted = [...allExtracted, ...data.questions.map(q => ({...q, status: 'PENDING'}))];
            setExtractedQuestions(allExtracted); // Update UI progressively
          }

          if (end < pageCount) {
            await new Promise(r => setTimeout(r, 2000));
          }
        }
        const finalTime = Math.floor((Date.now() - startTime) / 1000);
        setMessage(`Success! Extracted ${allExtracted.length} total questions in ${finalTime}s.`);
      } else {
        // Image extraction
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = e.target.result;
          const res = await fetch("/api/admin/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              base64Data,
              mimeType: file.type,
              adminPassword: password
            })
          });

          const data = await res.json();
          const finalTime = Math.floor((Date.now() - startTime) / 1000);
          
          if (res.ok && data.questions && !data.error) {
            setExtractedQuestions(data.questions.map(q => ({...q, status: 'PENDING'})));
            setMessage(`Success! Extracted ${data.questions.length} questions in ${finalTime}s.`);
          } else {
            setMessage(data.error || "Extraction failed");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error during extraction");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSubjectChange = (index, newSubject) => {
    const updated = [...extractedQuestions];
    updated[index].subject = newSubject;
    setExtractedQuestions(updated);
  };

  const handleSolutionChange = (index, newSolution) => {
    const updated = [...extractedQuestions];
    updated[index].solution = newSolution;
    setExtractedQuestions(updated);
  };

  const handleStatusChange = (index, status) => {
    const updated = [...extractedQuestions];
    updated[index].status = status;
    setExtractedQuestions(updated);
  };

  const handleCorrectAnswerChange = (index, value, answerType) => {
    const updated = [...extractedQuestions];
    if (answerType === 'MCQ') {
      updated[index].correctAnswer = parseInt(value, 10);
    } else if (answerType === 'MSQ') {
      const val = parseInt(value, 10);
      let arr = updated[index].correctAnswers || [];
      if (arr.includes(val)) {
        arr = arr.filter(v => v !== val);
      } else {
        arr = [...arr, val].sort();
      }
      updated[index].correctAnswers = arr;
    } else if (answerType === 'NAT') {
      updated[index].natAnswer = value;
    }
    setExtractedQuestions(updated);
  };

  const handleQuestionImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const updated = [...extractedQuestions];
      updated[index].imageUrl = event.target.result;
      setExtractedQuestions(updated);
    };
    reader.readAsDataURL(file);
  };

  const handlePasteImage = async (index) => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      let imageBlob = null;
      for (const item of clipboardItems) {
        const imageTypes = item.types.filter(type => type.startsWith('image/'));
        if (imageTypes.length > 0) {
          imageBlob = await item.getType(imageTypes[0]);
          break;
        }
      }
      
      if (!imageBlob) {
        setMessage('No image found in clipboard');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const updated = [...extractedQuestions];
        updated[index].imageUrl = event.target.result;
        setExtractedQuestions(updated);
        setMessage('Image pasted successfully');
      };
      reader.readAsDataURL(imageBlob);
    } catch (err) {
      console.error(err);
      setMessage('Failed to read clipboard. Check permissions.');
    }
  };

  const handleContainerPaste = (index, e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    let imageFile = null;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        imageFile = item.getAsFile();
        break;
      }
    }
    
    if (!imageFile) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
         setMessage('No image found in clipboard');
      }
      return;
    }
    
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (event) => {
      const updated = [...extractedQuestions];
      updated[index].imageUrl = event.target.result;
      setExtractedQuestions(updated);
      setMessage('Image pasted successfully');
    };
    reader.readAsDataURL(imageFile);
  };

  const handleMainPaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        const imageTypes = item.types.filter(type => type.startsWith('image/'));
        if (imageTypes.length > 0) {
          const blob = await item.getType(imageTypes[0]);
          const pastedFile = new File([blob], "pasted-image.png", { type: imageTypes[0] });
          setFile(pastedFile);
          setMessage("Image pasted successfully. Ready to extract.");
          return;
        }
      }
      setMessage("No image found in clipboard");
    } catch (err) {
      console.error(err);
      setMessage("Failed to read clipboard. Check permissions.");
    }
  };

  const handleMainContainerPaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const pastedFile = item.getAsFile();
        if (pastedFile) {
          setFile(pastedFile);
          setMessage("Image pasted successfully. Ready to extract.");
          e.preventDefault();
        }
        return;
      }
    }
  };

  const handleSaveApproved = async () => {
    const approved = extractedQuestions.filter(q => q.status === 'APPROVED');
    if (approved.length === 0) return;

    setIsSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: approved.map(q => ({...q, year})),
          adminPassword: password
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Saved ${data.count} questions to database.`);
        setExtractedQuestions(extractedQuestions.filter(q => q.status !== 'APPROVED'));
      } else {
        setMessage(data.error || "Failed to save");
      }
    } catch (err) {
      setMessage("Error saving questions");
    } finally {
      setIsSaving(false);
    }
  };

  const { data: session } = useSession();
  const isGoogleAdmin = session?.user?.email === "jamphy.admin@gmail.com";
  const displayAuthenticated = isAuthenticated || isGoogleAdmin;

  if (!displayAuthenticated) {
    return (
      <div className="flex items-center justify-center p-6 mt-16">
        <form onSubmit={handleLogin} className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl w-full max-w-md">
          <h1 className="text-3xl font-black text-white mb-6 text-center">Admin Access</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none mb-4 focus:border-zinc-500"
          />
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-zinc-800 overflow-x-auto whitespace-nowrap custom-scrollbar">
        {['Dashboard', 'Manage Questions', 'Add Questions', 'Image / PDF Extraction'].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-4 px-4 font-bold ${activeTab === tab ? 'text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Dashboard' && (
        <div className="space-y-16">
          {/* Reports Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black">Reported Questions</h2>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-medium">
                {reports.length} Total
              </span>
            </div>

            {reports.length === 0 ? (
              <div className="text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">
                No reports yet. Everything looks good!
              </div>
            ) : (
              <div className="grid gap-4">
                {reports.map(report => {
                  const approveAction = updateReportStatus.bind(null, report.id, "APPROVED");
                  const declineAction = updateReportStatus.bind(null, report.id, "DECLINED");

                  return (
                    <div key={report.id} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">
                            {report.questionId}
                          </span>
                          <span className="text-zinc-500 text-sm">
                            {new Date(report.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          {report.status === "PENDING" ? (
                            <div className="flex items-center gap-2">
                              <form action={approveAction}>
                                <button type="submit" className="px-3 py-1 text-sm bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 transition">
                                  Approve
                                </button>
                              </form>
                              <form action={declineAction}>
                                <button type="submit" className="px-3 py-1 text-sm bg-zinc-800 text-zinc-400 rounded-full hover:bg-zinc-700 transition">
                                  Decline
                                </button>
                              </form>
                            </div>
                          ) : (
                            <span className={`px-3 py-1 text-sm rounded-full font-bold ${report.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 'bg-zinc-800 text-zinc-500'}`}>
                              {report.status}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-zinc-300 mb-4 whitespace-pre-wrap">{report.description}</p>

                      {report.user && (
                        <div className="flex items-center gap-2 pt-4 border-t border-zinc-800 mt-4">
                          {report.user.image ? (
                            <Image src={report.user.image} width={24} height={24} alt={report.user.name} className="rounded-full" />
                          ) : (
                            <div className="w-6 h-6 bg-zinc-800 rounded-full" />
                          )}
                          <span className="text-sm text-zinc-400">Reported by {report.user.name || report.user.email}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Users Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black">Registered Users</h2>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm font-medium">
                {users.length} Total
              </span>
            </div>

            <UserTable initialUsers={users} />
          </section>
        </div>
      )}

      {activeTab === 'Manage Questions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h2 className="text-3xl font-black">Manage Questions</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search question content or ID..."
                value={questionSearchQuery}
                onChange={e => setQuestionSearchQuery(e.target.value)}
                className="bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white outline-none focus:border-zinc-500 text-sm flex-1 sm:w-64"
              />
              <select
                value={selectedSubjectFilter}
                onChange={e => setSelectedSubjectFilter(e.target.value)}
                className="bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white outline-none focus:border-zinc-500 text-sm"
              >
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoadingQuestions ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-zinc-500 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">
              No questions found.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map(q => {
                const isExpanded = expandedQuestionId === q.id;
                return (
                  <div key={q.id} className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300">
                    <div 
                      onClick={() => handleToggleQuestion(q)}
                      className="p-6 flex justify-between items-center cursor-pointer hover:bg-zinc-900/40 transition select-none"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 rounded-md text-xs font-bold font-mono">
                            {q.id.slice(-6).toUpperCase()}
                          </span>
                          <span className="px-2 py-0.5 bg-cyan-900/30 text-cyan-400 rounded-md text-xs font-bold">
                            {q.subject}
                          </span>
                          <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-md text-xs font-bold font-mono">
                            {q.year}
                          </span>
                          <span className="px-2 py-0.5 bg-purple-900/30 text-purple-400 rounded-md text-xs font-bold">
                            {q.type}
                          </span>
                        </div>
                        <div className="text-sm text-zinc-300 truncate font-medium">
                          {q.question.replace(/[\\#*`[\]]/g, '')}
                        </div>
                      </div>
                      <div className="text-zinc-500 shrink-0">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-6 border-t border-zinc-900 bg-zinc-900/10 space-y-6">
                        <div className="space-y-4">
                          <div className="text-zinc-100 text-base leading-relaxed bg-black/40 p-4 rounded-2xl border border-zinc-900">
                            <MathText>{q.question}</MathText>
                          </div>
                          
                          {q.options && q.options.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                              {q.options.map((opt, oIdx) => {
                                const isCorrect = q.type === 'MCQ' ? q.correctAnswer === oIdx : q.correctAnswers?.includes(oIdx);
                                return (
                                  <div 
                                    key={oIdx} 
                                    className={`p-3 rounded-xl border flex gap-3 text-sm transition ${
                                      isCorrect 
                                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                                        : 'bg-black/20 border-zinc-850 text-zinc-400'
                                    }`}
                                  >
                                    <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                                    <div><MathText>{opt}</MathText></div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {q.type === 'NAT' && q.natAnswer && (
                            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-bold inline-block">
                              Correct NAT Answer: {q.natAnswer}
                            </div>
                          )}

                          {q.solution && (
                            <div className="p-4 bg-zinc-900/60 border border-zinc-850 rounded-2xl">
                              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Solution</h4>
                              <div className="text-sm text-zinc-300 leading-relaxed">
                                <MathText>{q.solution}</MathText>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-6 border-t border-zinc-900">
                          <h3 className="text-lg font-bold text-white mb-4">Comments</h3>

                          {isLoadingComments ? (
                            <div className="flex justify-center py-6">
                              <div className="w-6 h-6 border-2 border-zinc-800 border-t-white rounded-full animate-spin"></div>
                            </div>
                          ) : activeComments.length === 0 ? (
                            <p className="text-zinc-500 text-sm">No comments on this question yet.</p>
                          ) : (
                            <div className="space-y-3">
                              {activeComments.map(comment => (
                                <div key={comment.id} className="bg-zinc-900/60 border border-zinc-850/80 rounded-2xl p-4 flex gap-3 items-start relative group">
                                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                                    {comment.user.image ? (
                                      <Image src={comment.user.image} alt={comment.user.name} width={32} height={32} className="object-cover" />
                                    ) : (
                                      comment.user.name?.[0].toUpperCase() || "U"
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0 pr-8">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <span className="font-bold text-zinc-200 text-sm truncate">{comment.user.name || "Anonymous"}</span>
                                      {comment.user.username && (
                                        <span className="text-xs text-zinc-500">@{comment.user.username}</span>
                                      )}
                                      <span className="text-xs text-zinc-500 font-mono">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
                                      {comment.text}
                                    </p>
                                  </div>

                                  <div className="absolute top-4 right-4">
                                    <button 
                                      onClick={() => handleDeleteComment(comment.id)}
                                      className="text-zinc-500 hover:text-red-400 p-1 rounded-md hover:bg-zinc-800 transition-colors"
                                      title="Delete Comment"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'Image / PDF Extraction' && (
        <div className="space-y-8">
          {message && (
            <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300">
              {message}
            </div>
          )}

          <div 
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-3xl focus:outline-none focus:border-zinc-500"
            tabIndex={0}
            onPaste={handleMainContainerPaste}
          >
            <h2 className="text-xl font-bold mb-6">Extract Questions using Gemini 2.5 Flash</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-zinc-500">Upload Image or PDF</label>
                  <button 
                    onClick={handleMainPaste}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded transition"
                  >
                    Paste from Clipboard
                  </button>
                </div>
                <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition"/>
                {file && (
                  <div className="mt-2 text-xs text-emerald-400 font-bold truncate">
                    ✓ Selected: {file.name}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-500 mb-2">Year</label>
                <select value={year} onChange={e => setYear(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-700">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleExtract}
              disabled={!file || isExtracting}
              className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-500 transition disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isExtracting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Extracting... {extractionElapsed}s
                </>
              ) : "Extract via Gemini"}
            </button>

            {isExtracting && (
              <div className="mt-4 p-4 rounded-xl bg-cyan-900/20 border border-cyan-800/50 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-2">
                <p className="text-cyan-400 font-bold mb-1">
                  {extractionElapsed < 5 && "Sending to Gemini..."}
                  {extractionElapsed >= 5 && extractionElapsed < 15 && "Analysing questions..."}
                  {extractionElapsed >= 15 && extractionElapsed <= 45 && "This is taking longer than usual, please wait..."}
                  {extractionElapsed > 45 && "Still working — complex papers take up to 60 seconds"}
                </p>
                <div className="w-full bg-zinc-900 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-1.5 rounded-full transition-all duration-1000 ease-linear" 
                    style={{ width: `${Math.min((extractionElapsed / 60) * 100, 95)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Review Table */}
          {extractedQuestions.length > 0 && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                <h2 className="text-xl font-bold">Review Extracted Questions</h2>
                <button 
                  onClick={handleSaveApproved}
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl transition disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : `Save ${extractedQuestions.filter(q => q.status === 'APPROVED').length} Approved to DB`}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-400">
                  <thead className="bg-zinc-900 text-zinc-300">
                    <tr>
                      <th className="p-4 font-bold">#</th>
                      <th className="p-4 font-bold w-1/3">Question</th>
                      <th className="p-4 font-bold">Type / Answer</th>
                      <th className="p-4 font-bold">Subject</th>
                      <th className="p-4 font-bold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedQuestions.map((q, idx) => (
                      <tr key={idx} className={`border-b border-zinc-800 ${q.status === 'APPROVED' ? 'bg-emerald-900/10' : q.status === 'REJECTED' ? 'bg-red-900/10' : ''}`}>
                        <td className="p-4 font-mono">{idx + 1}</td>
                        <td className="p-4">
                          <div className="max-h-32 overflow-y-auto custom-scrollbar pr-2 mb-2">
                            <MathText>{q.question}</MathText>
                          </div>
                          {q.options && q.options.length > 0 && (
                            <div className="mb-4 pl-3 border-l-2 border-zinc-700 space-y-2">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx} className="text-sm text-zinc-400 flex items-start gap-2">
                                  <span className="font-bold text-zinc-500 mt-0.5">{String.fromCharCode(65 + oIdx)}.</span>
                                  <div><MathText>{opt}</MathText></div>
                                </div>
                              ))}
                            </div>
                          )}
                          {q.hasImage && <span className="mb-2 inline-block px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded font-bold uppercase tracking-wider">⚠️ Needs Image</span>}
                          
                          <div 
                            className="mb-3 p-3 border border-dashed border-zinc-800 rounded-xl hover:border-zinc-700 transition focus:outline-none focus:border-zinc-500"
                            tabIndex={0}
                            onPaste={(e) => handleContainerPaste(idx, e)}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-xs font-bold text-zinc-500">Attach Image</label>
                              <button 
                                onClick={() => handlePasteImage(idx)}
                                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded transition flex items-center gap-1"
                              >
                                Paste from Clipboard
                              </button>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleQuestionImageUpload(idx, e)}
                              className="block w-full text-xs text-zinc-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition"
                            />
                            {q.imageUrl && (
                              <div className="mt-3">
                                <div className="text-xs text-emerald-400 font-bold mb-2">✓ Image attached</div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={q.imageUrl} alt="Pasted preview" className="max-h-32 object-contain rounded border border-zinc-800" />
                              </div>
                            )}
                          </div>
                          <textarea
                            value={q.solution || ""}
                            onChange={(e) => handleSolutionChange(idx, e.target.value)}
                            placeholder="Add detailed solution..."
                            className="bg-black border border-zinc-700 rounded-xl px-3 py-2 w-full text-zinc-300 text-xs outline-none focus:border-zinc-500 min-h-[60px]"
                          />
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-zinc-200">{q.type}</div>
                          <div className="mt-2 text-sm text-zinc-400 space-y-2">
                            {q.type === 'MCQ' && (
                              <div className="flex flex-col gap-1">
                                {[0, 1, 2, 3].map(optIdx => (
                                  <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name={`mcq-${idx}`} 
                                      checked={q.correctAnswer === optIdx}
                                      onChange={() => handleCorrectAnswerChange(idx, optIdx, 'MCQ')}
                                      className="accent-emerald-500"
                                    />
                                    <span>Option {String.fromCharCode(65 + optIdx)}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                            {q.type === 'MSQ' && (
                              <div className="flex flex-col gap-1">
                                {[0, 1, 2, 3].map(optIdx => (
                                  <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={q.correctAnswers?.includes(optIdx) || false}
                                      onChange={() => handleCorrectAnswerChange(idx, optIdx, 'MSQ')}
                                      className="accent-emerald-500 rounded"
                                    />
                                    <span>Option {String.fromCharCode(65 + optIdx)}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                            {q.type === 'NAT' && (
                              <div>
                                <input 
                                  type="text" 
                                  value={q.natAnswer || ""}
                                  onChange={(e) => handleCorrectAnswerChange(idx, e.target.value, 'NAT')}
                                  placeholder="Enter NAT answer..."
                                  className="w-full bg-black border border-zinc-700 rounded px-2 py-1 outline-none focus:border-zinc-500 text-white"
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <input 
                            type="text" 
                            value={q.subject || ""} 
                            onChange={(e) => handleSubjectChange(idx, e.target.value)}
                            className="bg-black border border-zinc-700 rounded px-2 py-1 w-full text-white outline-none focus:border-zinc-500"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => handleStatusChange(idx, 'APPROVED')} className={`px-3 py-1 rounded font-bold ${q.status === 'APPROVED' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-emerald-600 hover:text-white transition'}`}>Approve</button>
                            <button onClick={() => handleStatusChange(idx, 'REJECTED')} className={`px-3 py-1 rounded font-bold ${q.status === 'REJECTED' ? 'bg-red-600 text-white' : 'bg-zinc-800 hover:bg-red-600 hover:text-white transition'}`}>Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Add Questions' && (
        <div className="space-y-8">
          <ManualQuestionForm adminPassword={password} onSuccess={() => window.scrollTo(0, 0)} />
        </div>
      )}
    </div>
  );
}
