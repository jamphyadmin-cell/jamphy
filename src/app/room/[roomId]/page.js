"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TestInterface from "@/components/test/TestInterface";
import TestResult from "@/components/test/TestResult";
import { questions as allQuestions } from "@/data/questions";

export default function RoomPage({ params }) {
  // Use React.use() to unwrap params in Next.js 15+ if needed, but params usually fine direct in client components.
  // Actually, Next.js 15 requires unwrapping params with use(params). We should do that to be safe.
  const resolvedParams = use(params);
  const roomId = resolvedParams.roomId;
  
  const { data: session } = useSession();
  const router = useRouter();
  
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null);
  const [inviteUsername, setInviteUsername] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  
  // For the actual test
  const [testQuestions, setTestQuestions] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState(null);

  useEffect(() => {
    if (!session) return;

    const syncRoom = async () => {
      try {
        const res = await fetch(`/api/room/${roomId}/sync`);
        if (!res.ok) {
          const data = await res.json();
          // If not a participant, we might need to join first
          if (res.status === 403 || res.status === 404) {
            setError(data.error);
          }
          return;
        }
        
        const data = await res.json();
        setRoom(data.room);
        setParticipants(data.participants);
        
        // If room is active and we haven't started locally yet
        if (data.room.status === "ACTIVE" && !hasStarted) {
          // Find the actual questions from ID list
          if (data.room.questions) {
            const qs = data.room.questions.map(id => allQuestions.find(q => q.id === id)).filter(Boolean);
            setTestQuestions(qs);
            setHasStarted(true);
          }
        }
      } catch (err) {
        console.error("Sync error", err);
      }
    };

    syncRoom();
    const interval = setInterval(syncRoom, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [roomId, session, hasStarted]);

  const handleJoin = async () => {
    try {
      const res = await fetch('/api/room/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId })
      });
      if (res.ok) {
        setError(null);
        // Next tick of syncRoom will fetch data
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStart = async () => {
    try {
      await fetch(`/api/room/${roomId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'START' })
      });
      // syncRoom will pick it up
    } catch (err) {
      console.error(err);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteMessage("");
    if (!inviteUsername) return;
    
    try {
      const res = await fetch('/api/room/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, username: inviteUsername })
      });
      const data = await res.json();
      if (res.ok) {
        setInviteMessage("Invite sent!");
        setInviteUsername("");
      } else {
        setInviteMessage(data.error || "Failed to send invite");
      }
    } catch (err) {
      setInviteMessage("Failed to send invite");
    }
  };

  const handleProgress = async (progress, score, isFinished) => {
    try {
      await fetch(`/api/room/${roomId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'PROGRESS', progress, score, isFinished })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitTest = (answers) => {
    // Calculate final score
    let score = 0;
    testQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer || (Array.isArray(answers[index]) && JSON.stringify(answers[index].sort()) === JSON.stringify(q.correctAnswer.sort()))) {
         score++;
      }
    });
    handleProgress(testQuestions.length, score, true);
    setSubmittedAnswers(answers);
  };

  if (error === "Not a participant") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-zinc-900 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-black text-white mb-4">You have been invited!</h2>
          <button onClick={handleJoin} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500">
            Join Room
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-zinc-900 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-black text-red-500 mb-4">Error</h2>
          <p className="text-zinc-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (hasStarted) {
    if (submittedAnswers) {
      return (
        <TestResult 
          questions={testQuestions} 
          answers={submittedAnswers} 
          onClose={() => router.push('/questions')} 
        />
      );
    }
    return (
      <div className="min-h-screen bg-black flex">
        {/* Main Test Area */}
        <div className="flex-1">
          <TestInterface 
            questions={testQuestions}
            durationMins={room.config.duration}
            onSubmit={handleSubmitTest}
            onProgressChange={(progress) => handleProgress(progress, participants.find(p => p.id === session.user.id)?.score || 0, false)}
          />
        </div>
        {/* Live Leaderboard Sidebar */}
        <div className="w-64 bg-zinc-950 border-l border-zinc-800 p-4 flex flex-col h-screen overflow-y-auto hidden md:flex">
          <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider">Live Progress</h3>
          <div className="space-y-4">
            {participants.map(p => (
              <div key={p.id} className="bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-black">
                    {p.name?.[0] || p.username?.[0] || '?'}
                  </div>
                  <div className="font-bold text-white text-sm truncate">
                    {p.username || p.name} {p.id === room?.hostId && <span className="text-zinc-500 font-normal ml-1">(Host)</span>}
                  </div>
                  {p.isFinished && <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Done</span>}
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-500" 
                    style={{ width: `${(p.progress / testQuestions.length) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-zinc-500 mt-1 text-right">
                  {p.progress} / {testQuestions.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isHost = session?.user?.id === room.hostId;
  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}` : '';

  return (
    <div className="min-h-screen bg-black pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 md:p-12 shadow-2xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Live Study Room</h1>
            <p className="text-zinc-400">Waiting for players to join... The host will start the session.</p>
          </div>
          <div className="text-right">
            <div className="inline-block bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2">
              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</span>
              <span className="block text-white font-bold">LOBBY</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Participants */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Participants ({participants.length})</h3>
            <div className="space-y-3">
              {participants.map(p => (
                <div key={p.id} className="flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white overflow-hidden border border-zinc-700">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      p.name?.[0] || p.username?.[0] || '?'
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white">{p.name || p.username}</div>
                    <div className="text-xs text-zinc-500">@{p.username} {p.id === room.hostId && "(Host)"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Settings */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Invite by Link</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={inviteLink}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-300"
                />
                <button 
                  onClick={() => navigator.clipboard.writeText(inviteLink)}
                  className="px-4 py-2 bg-zinc-800 text-white text-sm font-bold rounded-xl hover:bg-zinc-700"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Invite by Username</h3>
              <form onSubmit={handleInvite} className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={inviteUsername}
                    onChange={(e) => setInviteUsername(e.target.value)}
                    placeholder="Enter username"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white"
                  />
                  <button type="submit" className="px-4 py-2 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200">
                    Invite
                  </button>
                </div>
                {inviteMessage && <div className="text-xs text-blue-400">{inviteMessage}</div>}
              </form>
            </div>
          </div>
        </div>

        {/* Host Controls */}
        <div className="border-t border-zinc-800 pt-8 text-center">
          {isHost ? (
            <button 
              onClick={handleStart}
              className="px-10 py-4 bg-white text-black font-black text-xl rounded-2xl hover:bg-zinc-200 transition shadow-xl"
            >
              Start Live Session
            </button>
          ) : (
            <div className="text-zinc-500 font-bold flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Waiting for host to start...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
