"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import UserMenu from "../components/UserMenu";
import InvitesMenu from "../components/InvitesMenu";
import GoalSettingsModal from "@/components/GoalSettingsModal";
import { useTransitionContext } from "../components/TransitionProvider";

export default function IITJamPrepPlatform() {
  const { data: session, status } = useSession();
  const { navigateWithTransition } = useTransitionContext();
  const [goalData, setGoalData] = useState({ target: 50, completed: 0, percentage: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Computed deterministically to match on SSR and client without flash
  const streaks = useMemo(() =>
    Array.from({ length: 365 }, (_, i) => {
      const x = Math.sin(i * 9999) * 10000;
      const r = x - Math.floor(x);
      const y = Math.sin(i * 7777) * 10000;
      const r2 = y - Math.floor(y);

      if (r > 0.7) return r2 > 0.5 ? 'bg-cyber-green' : 'bg-cyber-green/60';
      return r2 > 0.5 ? 'bg-cyber-green/30' : 'bg-obsidian-elevated';
    })
  , []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="bg-obsidian-deep text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-electric-violet/30 selection:text-white min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "jamphy",
              "url": "https://jamphy.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jamphy.com/questions?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is jamphy free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Jamphy is completely free for all students preparing for the IIT JAM Physics exam."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How are questions sourced?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All our questions are meticulously sourced directly from the official IIT JAM Physics previous year papers (PYQs) from 2015 to 2026."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "IIT JAM Physics PYQ Practice",
              "description": "Practice previous year questions for the IIT JAM Physics examination. Track progress, find weak topics, and simulate exam conditions.",
              "provider": {
                "@type": "Organization",
                "name": "jamphy",
                "sameAs": "https://jamphy.com"
              }
            }
          ])
        }}
      />
      {/* NAVBAR */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 w-full border-b border-obsidian-elevated shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)] z-50">
        <div className="flex items-center justify-between px-4 sm:px-gutter py-3 sm:py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="Jamphy Logo" width={120} height={32} className="h-7 sm:h-8 md:h-10 w-auto object-contain" />
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#how-it-works">How it works</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#features">Features</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-body-md text-body-md" href="#why">Why Jamphy</a>
          </nav>
          <div className="flex items-center gap-3">
            {mounted ? (status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <InvitesMenu />
                <UserMenu />
              </div>
            ) : (
              <button onClick={() => signIn()} className="text-electric-violet font-semibold hover:bg-obsidian-elevated/50 transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg text-sm">Sign in</button>
            )) : <div className="h-8 w-16"></div>}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-32">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-electric-violet/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        
        <div className="relative z-20 max-w-container-max mx-auto px-4 sm:px-gutter text-center flex flex-col items-center">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black leading-[1.1] tracking-tight mb-8 max-w-5xl text-white" style={{ fontFamily: "'Outfit', 'Geist', sans-serif" }}>
            You will crack IIT JAM. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-violet to-[#D8B4FE]">Or you won&apos;t.</span>
          </h1>
          <p className="text-lg sm:text-xl text-on-surface-variant max-w-2xl mb-12 px-2 leading-relaxed">
            The difference is whether you know where you&apos;re weak. jamphy shows you.
          </p>



          <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto max-w-sm sm:max-w-none">
            <button
              onClick={() => {
                if (status === "authenticated") {
                  window.location.href = "/questions";
                } else {
                  signIn('google');
                }
              }}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-electric-violet text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_4px_24px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_32px_rgba(139,92,246,0.6)] hover:bg-[#7C3AED] text-base"
              style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
            >
              Start Practicing Free
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <a className="text-on-surface-variant hover:text-white transition-colors font-medium flex items-center gap-2 group px-4 py-2" href="#how-it-works">
              See how it works 
              <span className="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">arrow_downward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-obsidian-surface border-y border-obsidian-elevated py-8 relative z-20">
        <div className="max-w-container-max mx-auto px-4 sm:px-gutter grid grid-cols-3 gap-4 sm:gap-8 text-center divide-x divide-obsidian-elevated">
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-metric-xl text-headline-lg text-white mb-2 counter-up">2,400+</span>
            <span className="font-mono-label text-mono-label text-electric-violet uppercase tracking-wider">Questions</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-metric-xl text-headline-lg text-white mb-2">100s</span>
            <span className="font-mono-label text-mono-label text-cyber-green uppercase tracking-wider">of Active Students</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-metric-xl text-headline-lg text-white mb-2">2015-2026</span>
            <span className="font-mono-label text-mono-label text-warning-amber uppercase tracking-wider">Syllabus Coverage</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 bg-obsidian-deep relative overflow-hidden animate-on-scroll" id="how-it-works">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-20">
            <span className="font-mono-label text-mono-label text-electric-violet uppercase tracking-widest block mb-4">The Workflow</span>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white">Three steps to dominance.</h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-electric-violet/30 to-transparent z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-obsidian-elevated border border-obsidian-elevated flex items-center justify-center mb-6 text-electric-violet shadow-lg">
                <span className="material-symbols-outlined text-4xl">list_alt</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile text-white mb-3">Practice PYQs</h3>
              <p className="text-on-surface-variant font-body-sm max-w-xs">Access organized sets of previous year questions spanning 2019-2026.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-obsidian-elevated border border-obsidian-elevated flex items-center justify-center mb-6 text-cyber-green shadow-lg">
                <span className="material-symbols-outlined text-4xl">track_changes</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile text-white mb-3">Track Weak Topics</h3>
              <p className="text-on-surface-variant font-body-sm max-w-xs">Our system identifies where you stumble and forces you to focus there.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-obsidian-elevated border border-obsidian-elevated flex items-center justify-center mb-6 text-warning-amber shadow-lg">
                <span className="material-symbols-outlined text-4xl">emoji_events</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg-mobile text-white mb-3">Ace JAM</h3>
              <p className="text-on-surface-variant font-body-sm max-w-xs">Walk into the exam hall with data-backed confidence and high momentum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 bg-obsidian-surface border-y border-obsidian-elevated animate-on-scroll" id="features">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="font-mono-label text-mono-label text-electric-violet uppercase tracking-widest block mb-4">The Toolkit</span>
              <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white md:mb-0 mb-4">Precision tools for high-performance students.</h2>
            </div>
            <p className="text-on-surface-variant font-body-md max-w-sm mt-4 md:mt-0">We don't just give you questions; we give you a system to master them.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card glass-panel p-8 rounded-xl transition-all duration-300 flex flex-col group">
              <span className="material-symbols-outlined text-electric-violet text-3xl mb-6">timer</span>
              <h4 className="font-headline-lg text-xl text-white mb-3">Sprint Mode</h4>
              <p className="text-on-surface-variant font-body-sm mb-6 flex-grow">Rapid-fire timed practice to build speed and mental stamina for the real exam.</p>
              <div className="w-full h-1 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-electric-violet"></div>
              </div>
            </div>
            <div className="feature-card glass-panel p-8 rounded-xl transition-all duration-300 flex flex-col group">
              <span className="material-symbols-outlined text-cyber-green text-3xl mb-6">history</span>
              <h4 className="font-headline-lg text-xl text-white mb-3">Mistakes Vault</h4>
              <p className="text-on-surface-variant font-body-sm mb-6 flex-grow">Automated spaced repetition for questions you got wrong. Never fail twice.</p>
              <div className="w-full h-1 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-cyber-green"></div>
              </div>
            </div>
            <div className="feature-card glass-panel p-8 rounded-xl transition-all duration-300 flex flex-col group">
              <span className="material-symbols-outlined text-warning-amber text-3xl mb-6">bar_chart</span>
              <h4 className="font-headline-lg text-xl text-white mb-3">Performance Analytics</h4>
              <p className="text-on-surface-variant font-body-sm mb-6 flex-grow">Granular breakdown of your accuracy across all physics sub-topics.</p>
              <div className="w-full h-1 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-warning-amber"></div>
              </div>
            </div>
            <div className="feature-card glass-panel p-8 rounded-xl transition-all duration-300 flex flex-col group">
              <span className="material-symbols-outlined text-white text-3xl mb-6">local_fire_department</span>
              <h4 className="font-headline-lg text-xl text-white mb-3">Daily Streaks</h4>
              <p className="text-on-surface-variant font-body-sm mb-6 flex-grow">Gamified consistency tracking to ensure you stay ahead of the curve every day.</p>
              <div className="w-full h-1 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="w-full h-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Psychology Section: Why Students Fail */}
      <section className="py-32 bg-obsidian-deep animate-on-scroll" id="why">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono-label text-mono-label text-critical-red uppercase tracking-widest block mb-4">The Brutal Truth</span>
              <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white mb-8">Why most students fail JAM.</h2>
              <p className="text-on-surface-variant font-body-md mb-12">Every year, thousands of brilliant minds lose their seats not due to a lack of knowledge, but due to poor tracking. <span className="text-white font-semibold">Loss Aversion</span> is real—don't lose your dream seat to a lack of data.</p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-6 rounded-lg bg-surface-container-low border border-obsidian-elevated">
                  <div className="w-8 h-8 rounded-full bg-critical-red/20 text-critical-red flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">The Old Way</h4>
                    <p className="text-on-surface-variant font-body-sm">Generic platforms, cold PDF libraries, and zero feedback on where you're actually weak.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-6 rounded-lg bg-electric-violet/10 border border-electric-violet/30">
                  <div className="w-8 h-8 rounded-full bg-electric-violet/20 text-electric-violet flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">The JAMPHY Way</h4>
                    <p className="text-on-surface-variant font-body-sm">AI-powered tracking, targeted sub-topic practice, and high-momentum learning loops.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-electric-violet/20 blur-3xl rounded-full"></div>
              <div className="glass-panel p-8 rounded-2xl relative overflow-hidden border-electric-violet/20">
                <div className="flex justify-between items-center mb-8">
                  <h5 className="font-headline-lg text-white">Efficiency Gap</h5>
                  <span className="text-electric-violet font-mono-label">LIVE METRIC</span>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-body-sm mb-2">
                      <span className="text-on-surface-variant">General Prep</span>
                      <span className="text-on-surface-variant">45% Retention</span>
                    </div>
                    <div className="w-full h-3 bg-obsidian-elevated rounded-full">
                      <div className="w-[45%] h-full bg-on-surface-variant/30 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-body-sm mb-2">
                      <span className="text-electric-violet font-semibold">JAMPHY Active Recall</span>
                      <span className="text-electric-violet font-semibold">92% Retention</span>
                    </div>
                    <div className="w-full h-3 bg-obsidian-elevated rounded-full">
                      <div className="w-[92%] h-full bg-electric-violet rounded-full shadow-[0_0_15px_#8B5CF6]"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-body-sm text-on-surface-variant italic leading-relaxed">
                  "The human brain is wired to avoid loss. By showing you exactly what you're missing, we trigger the drive to fix it before the exam day."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Streak Motivation Section */}
      <section className="py-32 bg-obsidian-surface border-y border-obsidian-elevated animate-on-scroll">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col items-center text-center">
          <span className="font-mono-label text-mono-label text-cyber-green uppercase tracking-widest block mb-4">Persistence Pays</span>
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white mb-6">Physics is a habit, not a hobby.</h2>
          <p className="text-on-surface-variant font-body-md max-w-2xl mb-12">Join 100s of students maintaining their daily practice streaks. Consistency beats intensity every single time.</p>
          <div className="glass-panel p-6 rounded-xl w-full max-w-3xl overflow-hidden flex flex-col items-center">
            <div className="flex justify-between items-center mb-4 w-full">
              <span className="text-on-surface-variant text-body-sm">3,421 questions solved this month</span>
              <div className="flex gap-2 items-center">
                <span className="text-body-sm text-on-surface-variant">Less</span>
                <div className="streak-square bg-obsidian-elevated"></div>
                <div className="streak-square bg-cyber-green/30"></div>
                <div className="streak-square bg-cyber-green/60"></div>
                <div className="streak-square bg-cyber-green"></div>
                <span className="text-body-sm text-on-surface-variant">More</span>
              </div>
            </div>
            {/* Mock GitHub Style Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(14px,1fr))] gap-1 w-full opacity-80" style={{ maxWidth: '800px' }}>
              {streaks.map((colorClass, i) => (
                <div key={i} className={`streak-square ${colorClass}`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD WIDGETS (For Authenticated Users) */}
      {mounted && status === "authenticated" && (
        <section className="py-24 px-4 sm:px-6 flex flex-col justify-center gap-6 sm:gap-8 max-w-6xl mx-auto w-full animate-on-scroll">
          
          {/* Study Plan CTA Row */}
          <div className="bg-gradient-to-r from-obsidian-elevated to-electric-violet/10 border border-electric-violet/20 rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between w-full shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-electric-violet"></div>
            <div className="z-10 mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <span className="material-symbols-outlined text-electric-violet">auto_awesome</span>
                <h3 className="text-2xl font-bold text-white">My Study Plan</h3>
              </div>
              <p className="text-on-surface-variant text-sm max-w-md">
                Get an AI-generated, week-by-week personalized study plan tailored to your exam date, target rank, and weak topics.
              </p>
            </div>
            <Link href="/study-plan" className="z-10 bg-electric-violet hover:bg-inverse-primary text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95 whitespace-nowrap">
              View Plan
            </Link>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-24 sm:py-32 bg-obsidian-deep border-t border-obsidian-elevated animate-on-scroll relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-violet/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-gutter text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-violet/15 border border-electric-violet/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="text-[11px] text-electric-violet font-bold uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Free Forever — No Credit Card</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight leading-tight" style={{ fontFamily: "'Outfit', 'Geist', sans-serif" }}>
            Your seat at IIT starts <span className="text-electric-violet">here.</span>
          </h2>
          <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Join hundreds of students already tracking their weak topics, crushing PYQs, and building exam momentum every day.
          </p>

          {/* Feature trust row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-on-surface-variant">
            {["2,400+ Questions", "2015–2026 Coverage", "AI Study Plans", "Real-time Analytics"].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="text-cyber-green text-xs">✓</span>
                {f}
              </span>
            ))}
          </div>

          {/* Google Sign-in button */}
          {mounted ? (status === "authenticated" ? (
            <button
              onClick={() => { window.location.href = "/questions"; }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-electric-violet hover:bg-[#7C3AED] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-[0_4px_24px_rgba(139,92,246,0.4)] text-base"
              style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
            >
              Go to Practice
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-base"
              style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
            >
              {/* Google logo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px" height="22px" className="shrink-0 group-hover:scale-110 transition-transform duration-200">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </button>
          )) : <div className="h-14"></div>}

          <p className="mt-5 text-xs text-on-surface-variant/60 leading-relaxed">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-on-surface-variant hover:text-white underline underline-offset-2 transition-colors">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-on-surface-variant hover:text-white underline underline-offset-2 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="bg-obsidian-deep border-t border-obsidian-elevated">
        <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <span className="text-electric-violet font-black text-xl tracking-tight" style={{ fontFamily: "'Outfit', 'Geist', sans-serif" }}>jamphy</span>
              <p className="text-on-surface-variant text-xs max-w-xs text-center sm:text-left leading-relaxed">
                Precision practice for IIT JAM Physics aspirants. Built for focus, designed for results.
              </p>
              <span className="text-on-surface-variant/50 text-xs mt-1">© {new Date().getFullYear()} Jamphy. All rights reserved.</span>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center sm:items-end gap-4">
              <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
                <a href="/" className="text-on-surface-variant hover:text-white transition-colors">Home</a>
                <a href="#how-it-works" className="text-on-surface-variant hover:text-white transition-colors">How it Works</a>
                <a href="#features" className="text-on-surface-variant hover:text-white transition-colors">Features</a>
                <a href="#why" className="text-on-surface-variant hover:text-white transition-colors">Why Jamphy</a>
              </nav>
              <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
                <a href="/privacy" className="text-on-surface-variant hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-on-surface-variant hover:text-white transition-colors">Terms of Service</a>
                <Link href="/contact" className="text-on-surface-variant hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-8 pt-6 border-t border-obsidian-elevated flex flex-wrap justify-center gap-2 text-xs text-on-surface-variant/50 text-center">
            <span>Made with ❤️ for IIT JAM Physics students</span>
            <span className="text-obsidian-elevated">·</span>
            <span>Not affiliated with IIT or GATE</span>
            <span className="text-obsidian-elevated">·</span>
            <span>Questions sourced from official PYQ papers</span>
          </div>
        </div>
      </footer>

      {/* Goal Modal */}
      {isModalOpen && (
        <GoalSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentGoal={goalData.target}
          onSave={(newGoal) => {
            setGoalData(prev => ({ ...prev, target: newGoal, percentage: (prev.completed / newGoal) * 100 }));
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}