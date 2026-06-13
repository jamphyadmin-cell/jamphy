"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

export default function UserTable({ initialUsers }) {
  const [sortOrder, setSortOrder] = useState("recent"); // "recent" or "oldest"
  const [warningUser, setWarningUser] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [isSendingWarning, setIsSendingWarning] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const sortedUsers = useMemo(() => {
    // initialUsers are already sorted descending (recent) by ID from Prisma
    if (sortOrder === "recent") {
      return [...initialUsers];
    } else {
      return [...initialUsers].reverse();
    }
  }, [initialUsers, sortOrder]);

  const handleSendWarning = async (e) => {
    e.preventDefault();
    if (!warningUser || !warningMessage.trim()) return;

    setIsSendingWarning(true);
    setFeedback({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/warn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: warningUser.id,
          message: warningMessage.trim()
        })
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({ type: "success", text: `Warning sent to ${warningUser.name || warningUser.email}!` });
        setWarningMessage("");
        setTimeout(() => {
          setWarningUser(null);
          setFeedback({ type: "", text: "" });
        }, 1500);
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to send warning." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "An error occurred." });
    } finally {
      setIsSendingWarning(false);
    }
  };

  const handleExportCSV = () => {
    if (!sortedUsers || sortedUsers.length === 0) return;

    // Define columns
    const headers = ["Name", "Email", "Username", "College", "Year", "Course", "Date of Birth", "Provider"];
    
    // Map rows
    const rows = sortedUsers.map(user => [
      user.name || "N/A",
      user.email || "N/A",
      user.username || "N/A",
      user.college || "N/A",
      user.year || "N/A",
      user.course || "N/A",
      user.dob || "N/A",
      user.accounts?.map(acc => acc.provider).join(", ") || "N/A"
    ]);

    // Construct CSV
    // Handle commas in text by wrapping in quotes
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    // Create a Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `jamphy_users_${sortOrder}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col">
      {/* Header controls */}
      <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm font-medium text-zinc-400 whitespace-nowrap">Sort By:</label>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-zinc-500 w-full sm:w-auto"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <button 
          onClick={handleExportCSV}
          className="w-full sm:w-auto px-4 py-2 text-sm rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition flex items-center justify-center gap-2 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left min-w-[1000px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/20">
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">User</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Contact</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">College</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Year/Course</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">DOB</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-zinc-500">No users found.</td>
              </tr>
            ) : (
              sortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-zinc-900/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image src={user.image} alt={user.name || "User"} width={40} height={40} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-zinc-400">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{user.name || 'Unknown'}</div>
                        <div className="text-xs text-zinc-500">{user.username ? `@${user.username}` : 'No username'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-zinc-300">{user.email || 'N/A'}</div>
                    <div className="text-xs text-zinc-600 uppercase mt-0.5">{user.accounts?.map(acc => acc.provider).join(', ') || 'Auth'}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-zinc-400">{user.college || '-'}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-zinc-300">{user.year || '-'}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{user.course || '-'}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-zinc-400">{user.dob || '-'}</span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => setWarningUser(user)}
                      className="px-3 py-1.5 text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition"
                    >
                      Warn
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Warn User Modal */}
      {warningUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Warn User</h2>
              <button 
                onClick={() => { setWarningUser(null); setFeedback({ type: "", text: "" }); }} 
                className="text-zinc-500 hover:text-white transition p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSendWarning} className="p-6 space-y-4">
              {feedback.text && (
                <div className={`p-4 rounded-xl border text-sm ${feedback.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
                  {feedback.text}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Target User</label>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center gap-3">
                  {warningUser.image ? (
                    <Image src={warningUser.image} alt={warningUser.name || "User"} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-zinc-850 rounded-full flex items-center justify-center text-xs font-bold text-zinc-400">
                      {warningUser.name ? warningUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm text-white">{warningUser.name || 'Unknown'}</div>
                    <div className="text-xs text-zinc-500">{warningUser.username ? `@${warningUser.username}` : warningUser.email}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Warning Message</label>
                <textarea
                  required
                  rows={4}
                  value={warningMessage}
                  onChange={e => setWarningMessage(e.target.value)}
                  placeholder="Explain why you are warning this user (e.g., inappropriate comment, spamming)..."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => { setWarningUser(null); setFeedback({ type: "", text: "" }); }} 
                  className="px-4 py-2 rounded-xl text-zinc-400 font-medium hover:text-white transition text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSendingWarning || !warningMessage.trim()} 
                  className="px-5 py-2 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition text-sm disabled:opacity-50"
                >
                  {isSendingWarning ? "Sending..." : "Send Warning"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
