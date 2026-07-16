"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EditBlogPostPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [slug, setSlug] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    tags: "",
    coverImage: "",
    content: ""
  });

  useEffect(() => {
    // Unwrap the params promise (Next.js 15+)
    Promise.resolve(params).then(resolved => {
      setSlug(resolved.slug);
    });
  }, [params]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }

    if (status === "authenticated" && slug) {
      // Fetch post data
      fetch(`/api/blog/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.post) {
            const isAdmin = session?.user?.email === "jamphy.admin@gmail.com";
            if (data.post.authorId !== session?.user?.id && !isAdmin) {
              router.push("/blog");
              return;
            }
            setFormData({
              title: data.post.title,
              excerpt: data.post.excerpt,
              tags: data.post.tags.join(", "),
              coverImage: data.post.coverImage || "",
              content: data.post.content
            });
            setIsLoading(false);
          } else {
            router.push("/blog");
          }
        })
        .catch(console.error);
    }
  }, [status, router, slug, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Post updated successfully!");
        setTimeout(() => {
          router.push(`/blog/${slug}`);
          router.refresh();
        }, 1500);
      } else {
        setMessage(data.error || "Failed to update post");
      }
    } catch (err) {
      setMessage("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen bg-obsidian-deep flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-electric-violet rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-deep py-20 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto mt-10">
        <Link href={`/blog/${slug}`} className="inline-flex items-center gap-2 text-cyber-green hover:text-white transition-colors mb-8 font-bold text-sm bg-cyber-green/10 px-4 py-2 rounded-full border border-cyber-green/20">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Cancel Editing
        </Link>
        
        <h1 className="text-4xl font-black text-white font-display-lg uppercase tracking-tight mb-8">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-obsidian-surface p-8 rounded-3xl border border-obsidian-elevated">
          {message && (
            <div className={`p-4 rounded-xl font-bold ${message.includes('success') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-zinc-400 mb-2">Title</label>
            <input 
              required 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-400 mb-2">Excerpt (Short Summary)</label>
            <textarea 
              required
              rows={2}
              value={formData.excerpt}
              onChange={e => setFormData({...formData, excerpt: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2">Tags (Comma separated)</label>
              <input 
                type="text" 
                placeholder="Strategy, Quantum Mechanics"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-400 mb-2">Cover Image URL</label>
              <input 
                type="url" 
                placeholder="https://example.com/image.png"
                value={formData.coverImage}
                onChange={e => setFormData({...formData, coverImage: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-violet transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-400 mb-2 flex justify-between">
              <span>Content (Markdown & LaTeX Supported)</span>
            </label>
            <textarea 
              required
              rows={20}
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-electric-violet transition font-mono text-sm leading-relaxed"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSaving}
            className="w-full py-4 bg-electric-violet hover:bg-[#8B5CF6]/90 text-white rounded-xl font-bold uppercase tracking-widest transition disabled:opacity-50"
          >
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
