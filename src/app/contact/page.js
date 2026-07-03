"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  const faqs = [
    { q: "Is jamphy free?", a: "Yes, Jamphy is completely free for all students preparing for the IIT JAM Physics exam. There are no paywalls or hidden fees." },
    { q: "How are questions sourced?", a: "All our questions are meticulously sourced directly from the official IIT JAM Physics previous year papers (PYQs) from 2015 to 2026." },
    { q: "How do I report an incorrect answer?", a: "If you spot an error, select 'Report a Bug' or 'Content Issue' in the form above. Please include the specific question details or URL so we can fix it promptly." },
    { q: "Can I suggest features?", a: "Absolutely! We love hearing from our community. Feel free to send us your feature requests using the 'Other' or 'Partnership' subject." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#e5e2e3]" style={{ fontFamily: "'Inter', 'Outfit', system-ui, sans-serif" }}>
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0B]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#8B5CF6] font-black text-xl tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>jamphy</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-[#cbc3d7] hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="text-[#cbc3d7] hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 mb-6">
            <span className="material-symbols-outlined text-sm text-[#8B5CF6]">mail</span>
            <span className="text-[11px] text-[#8B5CF6] font-bold uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Contact Us
          </h1>
          <p className="text-lg text-[#cbc3d7] max-w-2xl mx-auto leading-relaxed">
            Have a question, spotted a bug, or want to partner with us? Fill out the form below or email us directly. We typically respond within <strong className="text-white">48 hours</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start mb-20">
          
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Success Toast / Overlay */}
            {status === "success" && (
              <div className="absolute inset-0 z-10 bg-[#0A0A0B]/95 backdrop-blur flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-[#10B981]">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Message Sent!</h3>
                <p className="text-[#cbc3d7]">Thanks for reaching out. We&apos;ll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
              {status === "error" && (
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] px-4 py-3 rounded-xl text-sm flex gap-2 items-start">
                  <span className="material-symbols-outlined text-base shrink-0">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-[#cbc3d7]">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0e0e0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-[#cbc3d7]">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0e0e0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-[#cbc3d7]">Subject</label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0e0e0f] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Report a Bug</option>
                    <option>Content Issue</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#cbc3d7]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0e0e0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all resize-y"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#8B5CF6]/50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Direct Email</h3>
              <p className="text-[#cbc3d7] text-sm mb-4">Prefer to email us directly? You can reach us at:</p>
              <a href="mailto:jamphy.admin@gmail.com" className="inline-flex items-center gap-2 text-[#8B5CF6] font-medium hover:text-[#D8B4FE] transition-colors">
                <span className="material-symbols-outlined text-xl">mail</span>
                jamphy.admin@gmail.com
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Response Time</h3>
              <p className="text-[#cbc3d7] text-sm flex items-start gap-3">
                <span className="material-symbols-outlined text-[#10B981] mt-0.5">schedule</span>
                We aim to read every message and typically respond within 48 hours during business days.
              </p>
            </div>

            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-2xl p-6">
              <h3 className="font-bold text-[#8B5CF6] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Legal</h3>
              <p className="text-[#cbc3d7] text-sm mb-4">By contacting us, you agree to our policies.</p>
              <div className="flex flex-col gap-2">
                <Link href="/privacy" className="text-sm text-white hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">policy</span> Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-white hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">gavel</span> Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Frequently Asked Questions</h2>
            <p className="text-[#cbc3d7]">Before reaching out, see if we&apos;ve answered your question below.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-white">
                  {faq.q}
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-[#8B5CF6]">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-[#cbc3d7] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0B] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-[#8B5CF6] font-black text-lg tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>jamphy</span>
            <span className="text-[#cbc3d7] text-xs">© {new Date().getFullYear()} Jamphy. All rights reserved.</span>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="text-[#cbc3d7] hover:text-white transition-colors">Home</Link>
            <Link href="/privacy" className="text-[#cbc3d7] hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#cbc3d7] hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-[#8B5CF6] font-semibold transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
