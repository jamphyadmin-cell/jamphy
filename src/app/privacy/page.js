"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const LAST_UPDATED = "3 July 2025";

const sections = [
  { id: "introduction",         title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use",           title: "How We Use Your Information" },
  { id: "adsense",              title: "Google AdSense & Advertising" },
  { id: "analytics",            title: "Google Analytics" },
  { id: "opt-out",              title: "Opt-Out of Personalised Ads" },
  { id: "cookies",              title: "Cookies" },
  { id: "data-sharing",         title: "Data Sharing" },
  { id: "data-transfers",       title: "Data Transfers Outside India" },
  { id: "data-retention",       title: "Data Retention" },
  { id: "your-rights",          title: "Your Rights" },
  { id: "children",             title: "Children's Privacy" },
  { id: "security",             title: "Security" },
  { id: "changes",              title: "Changes to This Policy" },
  { id: "contact",              title: "Contact Us" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const observerRef = useRef(null);

  useEffect(() => {
    const headings = document.querySelectorAll("section[id]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#e5e2e3]" style={{ fontFamily: "'Inter', 'Outfit', system-ui, sans-serif" }}>

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0B]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#8B5CF6] font-black text-xl tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>jamphy</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-[#8B5CF6] font-semibold">Privacy Policy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="text-[#cbc3d7] hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex gap-12">

        {/* Sidebar Table of Contents — desktop only */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-[10px] text-[#8B5CF6] font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Table of Contents</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === s.id
                      ? "bg-[#8B5CF6]/15 text-[#8B5CF6] font-semibold border-l-2 border-[#8B5CF6]"
                      : "text-[#cbc3d7] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-12 pb-8 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
              <span className="text-[11px] text-[#8B5CF6] font-bold uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Legal Document</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Privacy Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#cbc3d7]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#10B981]">event</span>
                Last Updated: <strong className="text-white">{LAST_UPDATED}</strong>
              </span>
              <span className="text-white/20">·</span>
              <span>Effective immediately</span>
            </div>
            <p className="mt-4 text-base text-[#cbc3d7] leading-relaxed max-w-2xl">
              Jamphy (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your choices regarding your data.
            </p>
          </div>

          {/* Mobile ToC */}
          <details className="lg:hidden mb-8 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-[#8B5CF6] flex items-center gap-2">
              <span className="material-symbols-outlined text-base">list</span>
              Table of Contents
            </summary>
            <nav className="px-5 pb-4 space-y-1">
              {sections.map((s) => (
                <button key={s.id} onClick={() => { scrollTo(s.id); }} className="w-full text-left text-sm py-1.5 text-[#cbc3d7] hover:text-white transition-colors">
                  {s.title}
                </button>
              ))}
            </nav>
          </details>

          {/* Sections */}
          <div className="space-y-14" style={{ fontSize: "16px", lineHeight: "1.7" }}>

            <section id="introduction" className="scroll-mt-28">
              <SectionHeading>1. Introduction</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                This Privacy Policy applies to <strong className="text-white">jamphy.com</strong> and any related mobile or web applications (collectively, the &quot;Service&quot;). By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Service.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                Jamphy is operated from India and the policy is governed by the provisions of the <strong className="text-white">Information Technology Act, 2000</strong> and its associated rules, including the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </section>

            <section id="information-we-collect" className="scroll-mt-28">
              <SectionHeading>2. Information We Collect</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">We collect the following categories of information:</p>
              <InfoCard color="violet">
                <h4 className="font-bold text-white mb-2">Account Information</h4>
                <p className="text-[#cbc3d7]">When you sign in with Google OAuth, we receive your name, email address, and profile picture. We do not receive or store your Google password.</p>
              </InfoCard>
              <InfoCard color="green">
                <h4 className="font-bold text-white mb-2">Usage Data</h4>
                <p className="text-[#cbc3d7]">We log questions attempted, answers submitted, time per question, accuracy rates, and which subjects or sub-topics you practise. This data powers your personal analytics dashboard.</p>
              </InfoCard>
              <InfoCard color="amber">
                <h4 className="font-bold text-white mb-2">Device &amp; Technical Data</h4>
                <p className="text-[#cbc3d7]">IP address, browser type, operating system, device identifiers, referring URLs, and approximate location derived from IP are collected automatically when you visit the Service.</p>
              </InfoCard>
              <InfoCard color="violet">
                <h4 className="font-bold text-white mb-2">Cookies &amp; Tracking</h4>
                <p className="text-[#cbc3d7]">We use first-party session cookies for authentication, and third-party cookies from Google AdSense and Google Analytics. See Sections 5–7 for details.</p>
              </InfoCard>
            </section>

            <section id="how-we-use" className="scroll-mt-28">
              <SectionHeading>3. How We Use Your Information</SectionHeading>
              <ul className="space-y-2 text-[#cbc3d7]">
                {[
                  "To provide, maintain, and improve the Jamphy platform",
                  "To authenticate your identity via Google Sign-In",
                  "To show you your personalised progress, weak topics, and daily goals",
                  "To serve relevant advertisements through Google AdSense",
                  "To analyse aggregate usage patterns and improve content quality",
                  "To send optional product updates or important service notices",
                  "To detect and prevent fraud, abuse, or violations of our Terms of Service",
                  "To comply with legal obligations",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-[#8B5CF6] mt-1 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="adsense" className="scroll-mt-28">
              <SectionHeading>4. Google AdSense &amp; Advertising Cookies</SectionHeading>
              <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-[#8B5CF6] mb-1 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Important Disclosure</p>
                <p className="text-[#cbc3d7]">Jamphy uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your visits to this and other websites on the internet.</p>
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the internet.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                You may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">Google Ads Settings</a>.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                Jamphy does not control the cookies placed by Google AdSense. Please review{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">Google&apos;s Privacy Policy</a>{" "}
                and{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">How Google uses cookies in advertising</a>{" "}
                for more information.
              </p>
            </section>

            <section id="analytics" className="scroll-mt-28">
              <SectionHeading>5. Google Analytics Data Collection</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                We use <strong className="text-white">Google Analytics 4 (GA4)</strong> to understand how visitors interact with our platform. Google Analytics collects data such as pages visited, session duration, device type, geographic region (country/city level), and events (e.g., quiz started, question answered).
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                This data is aggregated and anonymised — we do not use Google Analytics to identify you personally. Google Analytics data is processed by Google LLC, located in the United States.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                We have enabled <strong className="text-white">IP anonymisation</strong> in our Google Analytics configuration so that your full IP address is never stored by Google. You may also opt out by installing the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
            </section>

            <section id="opt-out" className="scroll-mt-28">
              <SectionHeading>6. How to Opt Out of Personalised Ads</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-5">You have several options to limit interest-based advertising:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Google Ads Settings", desc: "Visit ads.google.com/home/tools/ads-settings to control what ads Google shows you.", href: "https://adssettings.google.com/", color: "violet" },
                  { title: "YourAdChoices", desc: "Visit youradchoices.com to opt out of interest-based advertising from participating companies.", href: "https://youradchoices.com/", color: "green" },
                  { title: "NAI Opt-Out", desc: "Visit networkadvertising.org/managing/opt_out.asp to opt out of network advertising.", href: "https://optout.networkadvertising.org/", color: "amber" },
                  { title: "Browser Settings", desc: "You may disable cookies entirely in your browser settings. Note: some features of Jamphy may not function correctly if cookies are disabled.", href: null, color: "violet" },
                ].map((item) => (
                  <div key={item.title} className={`bg-white/5 border border-white/10 rounded-xl p-4`}>
                    <h4 className="font-bold text-white mb-1 text-sm">{item.title}</h4>
                    <p className="text-[#cbc3d7] text-sm leading-relaxed mb-2">{item.desc}</p>
                    {item.href && (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] text-sm hover:underline">Visit →</a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="cookies" className="scroll-mt-28">
              <SectionHeading>7. Cookies</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">We use the following categories of cookies:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 text-[#8B5CF6] font-semibold">Cookie Type</th>
                      <th className="text-left py-3 pr-4 text-[#8B5CF6] font-semibold">Purpose</th>
                      <th className="text-left py-3 text-[#8B5CF6] font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#cbc3d7]">
                    {[
                      ["Session / Auth", "Keeps you logged in via NextAuth.js", "Session or 30 days"],
                      ["Google Analytics (_ga, _gid)", "Tracks page views and events (anonymised)", "Up to 2 years"],
                      ["Google AdSense (IDE, DSID)", "Personalised advertising", "Up to 13 months"],
                      ["DoubleClick (test_cookie)", "Tests whether your browser accepts cookies", "Session"],
                    ].map(([type, purpose, duration]) => (
                      <tr key={type} className="border-b border-white/5">
                        <td className="py-3 pr-4 font-medium text-white">{type}</td>
                        <td className="py-3 pr-4">{purpose}</td>
                        <td className="py-3">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="data-sharing" className="scroll-mt-28">
              <SectionHeading>8. Data Sharing</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">We do <strong className="text-white">not sell your personal data</strong>. We may share data with:</p>
              <ul className="space-y-3 text-[#cbc3d7]">
                <li className="flex gap-3 items-start"><span className="text-[#10B981] mt-1 shrink-0">✓</span><span><strong className="text-white">Google LLC</strong> — for authentication (Sign-In), advertising (AdSense), and analytics (GA4)</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#10B981] mt-1 shrink-0">✓</span><span><strong className="text-white">Vercel / hosting infrastructure</strong> — your data is processed on servers that host the Jamphy application</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#10B981] mt-1 shrink-0">✓</span><span><strong className="text-white">Legal authorities</strong> — if required to comply with applicable law, court order, or government request</span></li>
              </ul>
            </section>

            <section id="data-transfers" className="scroll-mt-28">
              <SectionHeading>9. Data Transfers Outside India</SectionHeading>
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-[#F59E0B] mb-1 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>International Transfer Notice</p>
                <p className="text-[#cbc3d7]">Your data may be transferred to and processed in countries outside India, including the United States, where Google LLC operates its infrastructure.</p>
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                When your data is transferred outside India, we rely on the following safeguards:
              </p>
              <ul className="space-y-2 text-[#cbc3d7]">
                <li className="flex gap-3 items-start"><span className="text-[#8B5CF6] mt-1 shrink-0">→</span>Google LLC adheres to the EU-U.S. Data Privacy Framework and Standard Contractual Clauses under GDPR.</li>
                <li className="flex gap-3 items-start"><span className="text-[#8B5CF6] mt-1 shrink-0">→</span>Vercel Inc. processes data in accordance with its Data Processing Agreement and applicable data protection laws.</li>
                <li className="flex gap-3 items-start"><span className="text-[#8B5CF6] mt-1 shrink-0">→</span>By using Jamphy, you consent to these cross-border data transfers where required under Indian law.</li>
              </ul>
            </section>

            <section id="data-retention" className="scroll-mt-28">
              <SectionHeading>10. Data Retention</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                We retain your account and usage data for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymise your personal data within <strong className="text-white">30 days</strong>, except where retention is required by law or for legitimate business interests (e.g., fraud prevention).
              </p>
            </section>

            <section id="your-rights" className="scroll-mt-28">
              <SectionHeading>11. Your Rights</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">Depending on your jurisdiction, you may have the right to:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Access the personal data we hold about you",
                  "Correct inaccurate or incomplete personal data",
                  "Delete your account and associated personal data",
                  "Restrict or object to certain processing",
                  "Withdraw consent at any time (where processing is consent-based)",
                  "Lodge a complaint with your data protection authority",
                ].map((r) => (
                  <div key={r} className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#cbc3d7]">
                    <span className="text-[#8B5CF6] shrink-0 mt-0.5">✓</span>
                    {r}
                  </div>
                ))}
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                To exercise any of these rights, contact us at <a href="mailto:jamphy.admin@gmail.com" className="text-[#8B5CF6] hover:underline">jamphy.admin@gmail.com</a>.
              </p>
            </section>

            <section id="children" className="scroll-mt-28">
              <SectionHeading>12. Children&apos;s Privacy</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                Jamphy is intended for students preparing for IIT JAM Physics, who are generally 21 years or older. Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us immediately at <a href="mailto:jamphy.admin@gmail.com" className="text-[#8B5CF6] hover:underline">jamphy.admin@gmail.com</a>.
              </p>
            </section>

            <section id="security" className="scroll-mt-28">
              <SectionHeading>13. Security</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                We implement commercially reasonable technical and organisational security measures to protect your data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section id="changes" className="scroll-mt-28">
              <SectionHeading>14. Changes to This Policy</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last Updated&quot; date at the top of this page. For significant changes, we will notify you via the platform or email. Continued use of the Service after any changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28">
              <SectionHeading>15. Contact Us</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-[#cbc3d7]">
                <p><strong className="text-white">Jamphy</strong></p>
                <p>Email: <a href="mailto:jamphy.admin@gmail.com" className="text-[#8B5CF6] hover:underline">jamphy.admin@gmail.com</a></p>
                <p>Website: <a href="https://jamphy.com" className="text-[#8B5CF6] hover:underline">jamphy.com</a></p>
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* Footer */}
      <LegalFooter active="privacy" />
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-2xl font-bold text-white mb-5 mt-2" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}>
      {children}
    </h2>
  );
}

function InfoCard({ color, children }) {
  const border = { violet: "border-[#8B5CF6]/30", green: "border-[#10B981]/30", amber: "border-[#F59E0B]/30" }[color];
  const bg = { violet: "bg-[#8B5CF6]/5", green: "bg-[#10B981]/5", amber: "bg-[#F59E0B]/5" }[color];
  return (
    <div className={`${bg} ${border} border rounded-xl p-5 mb-4`}>
      {children}
    </div>
  );
}

function LegalFooter({ active }) {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-[#8B5CF6] font-black text-lg tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>jamphy</span>
          <span className="text-[#cbc3d7] text-xs">© {new Date().getFullYear()} Jamphy. All rights reserved.</span>
        </div>
        <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="text-[#cbc3d7] hover:text-white transition-colors">Home</Link>
          <Link href="/privacy" className={`transition-colors ${active === "privacy" ? "text-[#8B5CF6] font-semibold" : "text-[#cbc3d7] hover:text-white"}`}>Privacy Policy</Link>
          <Link href="/terms" className={`transition-colors ${active === "terms" ? "text-[#8B5CF6] font-semibold" : "text-[#cbc3d7] hover:text-white"}`}>Terms of Service</Link>
          <a href="mailto:jamphy.admin@gmail.com" className="text-[#cbc3d7] hover:text-white transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
