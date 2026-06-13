"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function EditProfileModal({ onClose }) {
  const { data: session, update } = useSession();
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    image: "",
    dob: "",
    college: "",
    year: "",
    course: "",
    showStreakPublicly: true,
    showStatsPublicly: true,
    showHeatmapPublicly: true,
    showActivityPublicly: true,
    showSubjectsPublicly: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setFormData({
              name: data.user.name || "",
              username: data.user.username || "",
              image: data.user.image || "",
              dob: data.user.dob || "",
              college: data.user.college || "",
              year: data.user.year || "",
              course: data.user.course || "",
              showStreakPublicly: data.user.showStreakPublicly !== false,
              showStatsPublicly: data.user.showStatsPublicly !== false,
              showHeatmapPublicly: data.user.showHeatmapPublicly !== false,
              showActivityPublicly: data.user.showActivityPublicly !== false,
              showSubjectsPublicly: data.user.showSubjectsPublicly !== false,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setFormData((prev) => ({ ...prev, image: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        await update();
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => onClose(), 1000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
              {message.text && (
                <div className={`p-4 rounded-xl border ${message.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
                  {message.text}
                </div>
              )}

              {/* Profile Picture */}
              <div className="pb-6 border-b border-zinc-800/50">
                <label className="block text-sm font-medium text-zinc-400 mb-4">Profile Picture</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {formData.image ? (
                    <Image src={formData.image} alt="Profile" width={80} height={80} className="rounded-full object-cover border-4 border-zinc-800" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold text-white border-4 border-zinc-800">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  
                  <div className="flex-1 w-full">
                    <p className="text-xs text-zinc-500 mb-2">Choose a cute avatar or upload your own</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      {[1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: `/avatars/avatar${num}.png` }))}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition ${formData.image === `/avatars/avatar${num}.png` ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-zinc-700 hover:border-zinc-500 hover:scale-105'}`}
                        >
                          <Image src={`/avatars/avatar${num}.png`} alt={`Preset ${num}`} width={48} height={48} className="object-cover" />
                        </button>
                      ))}
                      
                      <div className="w-[1px] h-8 bg-zinc-700 mx-2 hidden sm:block"></div>
                      
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition text-sm">
                        Upload Custom
                      </button>
                      
                      {formData.image && (
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition text-sm">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white outline-none focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Username</label>
                  <div className="flex bg-black border border-zinc-800 rounded-xl overflow-hidden focus-within:border-zinc-500">
                    <span className="flex items-center justify-center pl-4 pr-2 text-zinc-500 bg-zinc-900 border-r border-zinc-800">@</span>
                    <input type="text" name="username" value={formData.username} onChange={(e) => setFormData(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, '') }))} required className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white outline-none focus:border-zinc-500 [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">College / University</label>
                  <input type="text" name="college" value={formData.college} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white outline-none focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Current Year</label>
                  <select name="year" value={formData.year} onChange={handleChange} required className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-zinc-500">
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
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Course Pursuing</label>
                  <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white outline-none focus:border-zinc-500" />
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="pt-6 border-t border-zinc-800/50 space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Public Profile Privacy</h3>
                <p className="text-xs text-zinc-500 mb-4">Choose what information is visible to other users on your public profile page.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="showStreakPublicly" 
                      checked={formData.showStreakPublicly} 
                      onChange={(e) => setFormData(p => ({ ...p, showStreakPublicly: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-800 bg-black text-cyan-400 focus:ring-0 focus:ring-offset-0" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">Show Streak</span>
                      <span className="text-[10px] text-zinc-500">Show your daily practice streak</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="showStatsPublicly" 
                      checked={formData.showStatsPublicly} 
                      onChange={(e) => setFormData(p => ({ ...p, showStatsPublicly: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-800 bg-black text-cyan-400 focus:ring-0 focus:ring-offset-0" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">Show Stats</span>
                      <span className="text-[10px] text-zinc-500">Show total questions and accuracy</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="showHeatmapPublicly" 
                      checked={formData.showHeatmapPublicly} 
                      onChange={(e) => setFormData(p => ({ ...p, showHeatmapPublicly: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-800 bg-black text-cyan-400 focus:ring-0 focus:ring-offset-0" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">Show Activity Calendar</span>
                      <span className="text-[10px] text-zinc-500">Show the 90-day activity heatmap</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="showActivityPublicly" 
                      checked={formData.showActivityPublicly} 
                      onChange={(e) => setFormData(p => ({ ...p, showActivityPublicly: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-800 bg-black text-cyan-400 focus:ring-0 focus:ring-offset-0" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">Show Recent Activity</span>
                      <span className="text-[10px] text-zinc-500">Show recent question attempts list</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="showSubjectsPublicly" 
                      checked={formData.showSubjectsPublicly} 
                      onChange={(e) => setFormData(p => ({ ...p, showSubjectsPublicly: e.target.checked }))}
                      className="w-4 h-4 rounded border-zinc-800 bg-black text-cyan-400 focus:ring-0 focus:ring-offset-0" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">Show Subject Accuracy</span>
                      <span className="text-[10px] text-zinc-500">Show subject-wise correctness stats</span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-900/50">
          <button onClick={onClose} type="button" className="px-6 py-2 rounded-xl text-zinc-400 font-medium hover:text-white transition">Cancel</button>
          <button type="submit" form="edit-profile-form" disabled={isSaving || isLoading} className="px-6 py-2 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition disabled:opacity-50">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
