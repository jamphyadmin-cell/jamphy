"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NewBlogPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    tags: '',
    coverImage: '',
    content: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (status === 'loading') {
    return <div className="min-h-screen bg-obsidian-deep flex items-center justify-center text-white">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-obsidian-deep flex items-center justify-center">
        <div className="text-center bg-obsidian-surface p-8 rounded-3xl border border-obsidian-elevated">
          <span className="material-symbols-outlined text-5xl text-electric-violet mb-4">lock</span>
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-on-surface-variant mb-6">You must be logged in to submit a blog post.</p>
          <button onClick={() => window.location.href = '/'} className="bg-electric-violet text-white px-6 py-2 rounded-xl font-bold hover:bg-[#8B5CF6]/90 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit post');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/blog');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-deep py-20 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto mt-10">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-cyber-green hover:text-white transition-colors mb-8 font-bold text-sm bg-cyber-green/10 px-4 py-2 rounded-full border border-cyber-green/20">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Blog
        </Link>

        <div className="bg-obsidian-surface border border-obsidian-elevated rounded-[2rem] p-6 sm:p-10 shadow-2xl">
          <h1 className="text-3xl font-black text-white font-display-lg uppercase tracking-tight mb-2">Submit an Article</h1>
          <p className="text-on-surface-variant mb-8">Share your IIT JAM preparation strategies, notes, or deep dives. All submissions are reviewed by moderators before publishing.</p>

          {success ? (
            <div className="bg-cyber-green/10 border border-cyber-green/30 text-cyber-green p-6 rounded-2xl flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-5xl mb-4">check_circle</span>
              <h3 className="text-xl font-bold mb-2">Submission Successful!</h3>
              <p>Your article is now pending review. You will be redirected shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wide">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="E.g., Mastering Electrodynamics"
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wide">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 text-zinc-400 rounded-xl px-4 py-3 focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300 uppercase tracking-wide">Short Excerpt (Max 200 chars)</label>
                <textarea
                  required
                  maxLength={200}
                  value={formData.excerpt}
                  onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="A brief summary of what this article covers..."
                  className="w-full bg-zinc-900/50 border border-zinc-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet transition-all resize-none h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wide">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Physics, Electrodynamics, Strategy"
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-300 uppercase tracking-wide">Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-zinc-900/50 border border-zinc-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex justify-between items-end">
                  <span>Markdown Content</span>
                  <span className="text-[10px] text-zinc-500 font-normal normal-case">LaTeX supported via KaTeX ($ math $, $$ block $$)</span>
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your article here using Markdown..."
                  className="w-full bg-zinc-900/50 border border-zinc-700/50 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-electric-violet focus:ring-1 focus:ring-electric-violet transition-all resize-none h-96 font-mono text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-electric-violet text-white font-bold py-4 rounded-xl hover:bg-[#8B5CF6]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined">send</span>
                )}
                Submit for Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
