"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ProfileCompletionModal() {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();

  const [profileFormData, setProfileFormData] = useState({
    username: "",
    dob: "",
    college: "",
    year: "",
    course: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: "", text: "" });

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    pathname === "/" ||
    pathname === "/profile" ||
    (status === "authenticated" && session?.user?.username)
  ) {
    return null; // Don't show if loading, not logged in, on landing page, on profile settings page, or already completed
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!profileFormData.username.trim()) {
      setProfileMessage({ type: "error", text: "Username field is mandatory." });
      return;
    }
    if (!profileFormData.dob) {
      setProfileMessage({ type: "error", text: "Date of Birth field is mandatory." });
      return;
    }
    if (!profileFormData.college.trim()) {
      setProfileMessage({ type: "error", text: "College / University field is mandatory." });
      return;
    }
    if (!profileFormData.year) {
      setProfileMessage({ type: "error", text: "Year field is mandatory." });
      return;
    }
    if (!profileFormData.course.trim()) {
      setProfileMessage({ type: "error", text: "Course field is mandatory." });
      return;
    }

    setIsSavingProfile(true);
    setProfileMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profileFormData,
          name: session?.user?.name,
          image: session?.user?.image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await update({
          username: profileFormData.username,
        });
      } else {
        setProfileMessage({ type: "error", text: data.error || "Failed to save profile." });
      }
    } catch (error) {
      setProfileMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
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

        <h2 className="text-3xl font-black mb-3 text-white">Complete Profile</h2>
        <p className="text-zinc-400 mb-6 font-medium text-sm">
          Just a few more details before you start practicing!
        </p>

        {profileMessage.text && (
          <div className={`mb-6 p-3 rounded-xl border text-sm w-full ${profileMessage.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
            {profileMessage.text}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="w-full space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Username <span className="text-red-500">*</span></label>
            <div className="flex bg-black border border-zinc-800 rounded-xl overflow-hidden focus-within:border-zinc-500 transition-colors">
              <span className="flex items-center justify-center pl-4 pr-2 text-zinc-500 bg-zinc-900 border-r border-zinc-800">
                @
              </span>
              <input
                type="text"
                placeholder="username"
                value={profileFormData.username}
                onChange={(e) => setProfileFormData(p => ({ ...p, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') }))}
                className="w-full bg-transparent px-3 py-3 text-white outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Date of Birth <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={profileFormData.dob}
              onChange={(e) => setProfileFormData(p => ({ ...p, dob: e.target.value }))}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors text-sm [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">College / University <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="E.g. IIT Delhi"
              value={profileFormData.college}
              onChange={(e) => setProfileFormData(p => ({ ...p, college: e.target.value }))}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Year <span className="text-red-500">*</span></label>
            <select
              value={profileFormData.year}
              onChange={(e) => setProfileFormData(p => ({ ...p, year: e.target.value }))}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors text-sm"
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Graduated">Graduated</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Course Pursuing <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="E.g. B.Sc Physics"
              value={profileFormData.course}
              onChange={(e) => setProfileFormData(p => ({ ...p, course: e.target.value }))}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="w-full mt-4 px-6 py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {isSavingProfile ? "Saving..." : "Start Practicing!"}
          </button>
        </form>
      </div>
    </div>
  );
}
