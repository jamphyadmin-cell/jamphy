"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "../../components/UserMenu";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
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
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

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
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        await update();
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={160}
                height={160}
                className="rounded-2xl"
              />
            </Link>
            <span className="font-bold text-xl tracking-tight text-zinc-500 hidden sm:block">
              Profile
            </span>
          </div>
          <div className="flex items-center gap-4">
            {session?.user?.username && (
              <Link
                href="/questions"
                className="px-4 py-2 text-sm rounded-xl text-zinc-400 hover:text-white transition hidden sm:block"
              >
                Questions
              </Link>
            )}
            <UserMenu session={session} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">Your Profile</h1>
          <p className="text-zinc-400">Update your personal details and academic information.</p>
        </div>

        {!session?.user?.username && (
          <div className="mb-8 p-4 rounded-2xl border bg-blue-500/10 border-blue-500/30 text-blue-400 font-medium">
            Please complete your profile (Username, College, and Year) to start practicing questions!
          </div>
        )}

        {message.text && (
          <div
            className={`mb-8 p-4 rounded-2xl border ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-950 border border-zinc-800 p-8 rounded-[32px]">
          
          {/* Profile Picture */}
          <div className="flex items-center gap-6 pb-8 border-b border-zinc-800">
            {formData.image ? (
              <Image
                src={formData.image}
                alt="Profile Preview"
                width={80}
                height={80}
                className="rounded-full object-cover border border-zinc-800"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition"
                >
                  Upload New Picture
                </button>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                    className="px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Username
              </label>
              <div className="flex bg-black border border-zinc-800 rounded-xl overflow-hidden focus-within:border-zinc-500 transition-colors">
                <span className="flex items-center justify-center pl-4 pr-3 text-zinc-500 bg-zinc-900 border-r border-zinc-800">
                  @
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
                    setFormData((prev) => ({ ...prev, username: val }));
                  }}
                  placeholder="username"
                  required
                  className="w-full bg-transparent px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* College/University */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                College / University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="E.g. IIT Delhi"
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Current Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors"
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

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Course Pursuing
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="E.g. B.Sc Physics"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
