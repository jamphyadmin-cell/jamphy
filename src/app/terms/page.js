"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const LAST_UPDATED = "3 July 2025";

const sections = [
  { id: "acceptance",      title: "Acceptance of Terms" },
  { id: "eligibility",     title: "Eligibility" },
  { id: "account",         title: "Your Account" },
  { id: "service",         title: "The Service" },
  { id: "advertising",     title: "Advertising & Sponsored Content" },
  { id: "blog",            title: "Blog Submissions" },
  { id: "conduct",         title: "User Conduct" },
  { id: "ip",              title: "Intellectual Property" },
  { id: "dmca",            title: "DMCA & Copyright Takedown" },
  { id: "disclaimer",      title: "Disclaimers" },
  { id: "liability",       title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "termination",     title: "Termination" },
  { id: "governing",       title: "Governing Law" },
  { id: "changes",         title: "Changes to Terms" },
  { id: "contact",         title: "Contact Us" },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("acceptance");
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
            <Link href="/privacy" className="text-[#cbc3d7] hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="text-[#8B5CF6] font-semibold">Terms of Service</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex gap-12">

        {/* Sidebar ToC — desktop */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              <span className="text-[11px] text-[#10B981] font-bold uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Legal Document</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Terms of Service
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
              Please read these Terms of Service carefully before using Jamphy. By accessing or using our platform, you agree to be bound by these terms. If you do not agree, do not use the Service.
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
                <button key={s.id} onClick={() => scrollTo(s.id)} className="w-full text-left text-sm py-1.5 text-[#cbc3d7] hover:text-white transition-colors">
                  {s.title}
                </button>
              ))}
            </nav>
          </details>

          {/* Sections */}
          <div className="space-y-14" style={{ fontSize: "16px", lineHeight: "1.7" }}>

            <section id="acceptance" className="scroll-mt-28">
              <SectionHeading>1. Acceptance of Terms</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                By creating an account, signing in, or otherwise accessing <strong className="text-white">jamphy.com</strong> (the &quot;Service&quot;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service (&quot;Terms&quot;) and our <Link href="/privacy" className="text-[#8B5CF6] hover:underline">Privacy Policy</Link>, which is incorporated herein by reference.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                These Terms constitute a legally binding agreement between you and Jamphy. If you are using the Service on behalf of an organisation, you represent that you have authority to bind that organisation.
              </p>
            </section>

            <section id="eligibility" className="scroll-mt-28">
              <SectionHeading>2. Eligibility</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                You must be at least <strong className="text-white">13 years of age</strong> to use Jamphy. By using the Service, you represent and warrant that you meet this requirement. If you are between 13 and 18 years of age, you must have parental or guardian consent to use the Service.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                Jamphy is primarily designed for students preparing for <strong className="text-white">IIT JAM (Joint Admission Test for MSc)</strong> Physics, and users are expected to engage with the platform for educational purposes.
              </p>
            </section>

            <section id="account" className="scroll-mt-28">
              <SectionHeading>3. Your Account</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                Jamphy uses Google Sign-In (OAuth 2.0) for authentication. By signing in, you grant Jamphy access to your basic Google profile information (name, email, profile picture) as described in our Privacy Policy. You agree to:
              </p>
              <ul className="space-y-2 text-[#cbc3d7]">
                {[
                  "Provide accurate and current information when creating your account",
                  "Keep your login credentials secure and not share them with others",
                  "Notify us immediately of any unauthorised use of your account",
                  "Take responsibility for all activity that occurs under your account",
                  "Not create multiple accounts to circumvent bans or restrictions",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-[#8B5CF6] mt-1 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="service" className="scroll-mt-28">
              <SectionHeading>4. The Service</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                Jamphy provides an online platform for practising IIT JAM Physics previous year questions (PYQs), tracking performance, and improving exam readiness. The Service includes:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "quiz", label: "PYQ Practice", desc: "Access to a curated database of IIT JAM Physics questions from 2015–2026." },
                  { icon: "analytics", label: "Analytics Dashboard", desc: "Personal performance tracking across topics, sub-topics, and question types." },
                  { icon: "timer", label: "Sprint Mode", desc: "Timed practice sessions to simulate exam conditions." },
                  { icon: "school", label: "Study Plans", desc: "AI-generated personalised weekly study plans." },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
                    <span className="material-symbols-outlined text-[#8B5CF6] mt-0.5">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm">{item.label}</h4>
                      <p className="text-[#cbc3d7] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice. We are not liable to you or any third party for any modification, suspension, or discontinuation.
              </p>
            </section>

            <section id="advertising" className="scroll-mt-28">
              <SectionHeading>5. Advertising &amp; Sponsored Content Disclosure</SectionHeading>
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-[#F59E0B] mb-1 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Advertising Disclosure</p>
                <p className="text-[#cbc3d7]">Jamphy is supported by advertising. We display ads through Google AdSense and may occasionally feature sponsored content. Ads are clearly labelled.</p>
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                <strong className="text-white">Google AdSense:</strong> Jamphy participates in the Google AdSense program. Ads served by Google may be personalised based on your browsing history and interests. Jamphy does not control which specific ads are shown and is not responsible for the content, accuracy, or legality of third-party advertisements.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                <strong className="text-white">Sponsored Content:</strong> Occasionally, we may publish sponsored articles, reviews, or feature placements. All sponsored content will be clearly identified with a &quot;Sponsored&quot; or &quot;Advertisement&quot; label. Sponsored content reflects the views of the sponsor and not necessarily those of Jamphy.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                <strong className="text-white">Affiliate Links:</strong> Some links on Jamphy may be affiliate links. If you click these links and make a purchase, we may earn a small commission at no additional cost to you. We only recommend products or services we believe are genuinely useful.
              </p>
            </section>

            <section id="blog" className="scroll-mt-28">
              <SectionHeading>6. Blog Submissions &amp; User-Generated Content</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                If Jamphy accepts guest posts, comments, or any other user-generated content (&quot;UGC&quot;), the following rules apply:
              </p>
              <div className="space-y-4">
                <PolicyBlock color="violet" title="Originality">
                  All submitted content must be original and not plagiarised. Do not submit content that has been published elsewhere without the express written consent of the original author. We use automated plagiarism detection tools.
                </PolicyBlock>
                <PolicyBlock color="green" title="Accuracy">
                  Content must be factually accurate and relevant to IIT JAM Physics, science education, or exam preparation. We reserve the right to edit or reject submissions for accuracy.
                </PolicyBlock>
                <PolicyBlock color="amber" title="Content Standards">
                  Submissions must not contain hate speech, personal attacks, defamatory statements, misinformation, or inappropriate material. Submissions promoting competing products without disclosure will be rejected.
                </PolicyBlock>
                <PolicyBlock color="violet" title="Licence Grant">
                  By submitting content to Jamphy, you grant us a non-exclusive, worldwide, royalty-free, perpetual licence to publish, edit, translate, and distribute your content in connection with the Service. You retain ownership of your original content.
                </PolicyBlock>
                <PolicyBlock color="green" title="Disclosure">
                  If you have a commercial relationship with any entity mentioned in your submission, you must disclose this clearly. Undisclosed conflicts of interest will result in removal of the content.
                </PolicyBlock>
              </div>
            </section>

            <section id="conduct" className="scroll-mt-28">
              <SectionHeading>7. User Conduct</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">You agree not to:</p>
              <ul className="space-y-2 text-[#cbc3d7]">
                {[
                  "Use the Service for any unlawful purpose or in violation of these Terms",
                  "Attempt to reverse-engineer, scrape, or copy our question database without permission",
                  "Use automated bots, scripts, or tools to access or interact with the Service",
                  "Harass, intimidate, or harm other users on community features",
                  "Misrepresent your identity or impersonate another person",
                  "Upload or transmit viruses, malware, or any malicious code",
                  "Attempt to gain unauthorised access to any part of our systems",
                  "Circumvent any technical measures we use to protect the Service",
                  "Share, sell, or transfer your account access to any third party",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-[#EF4444] mt-1 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="ip" className="scroll-mt-28">
              <SectionHeading>8. Intellectual Property</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                All content on Jamphy — including but not limited to the platform design, UI, source code, branding, written explanations, and curated question sets — is the intellectual property of Jamphy or its licensors and is protected by applicable intellectual property laws.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                <strong className="text-white">IIT JAM Questions:</strong> The previous-year questions (PYQs) sourced from IIT JAM examinations are in the public domain as official government examination papers. Our curated presentation, tagging, difficulty ratings, and solution explanations are our original work.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Service for personal, non-commercial educational purposes only. You may not reproduce, distribute, or create derivative works from our proprietary content without explicit written permission.
              </p>
            </section>

            <section id="dmca" className="scroll-mt-28">
              <SectionHeading>9. DMCA &amp; Copyright Takedown Procedure</SectionHeading>
              <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-5 mb-5">
                <p className="text-sm font-semibold text-[#EF4444] mb-1 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Copyright Notice</p>
                <p className="text-[#cbc3d7]">Jamphy respects the intellectual property rights of others and expects users to do the same. We will respond to clear notices of copyright infringement.</p>
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                If you believe that content on Jamphy infringes your copyright, please send a written notice to our designated agent containing all of the following:
              </p>
              <ol className="space-y-3 text-[#cbc3d7] list-none">
                {[
                  "A physical or electronic signature of the copyright owner or authorised representative.",
                  "Identification of the copyrighted work claimed to have been infringed.",
                  "Identification of the material that is claimed to be infringing, with enough detail for us to locate it on the Service (e.g., URL).",
                  "Your contact information: name, address, telephone number, and email address.",
                  "A statement that you have a good-faith belief that the use of the material is not authorised by the copyright owner, its agent, or the law.",
                  "A statement, made under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorised to act on behalf of the owner.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-1">Send DMCA Notices to:</p>
                <p className="text-[#cbc3d7] text-sm">Email: <a href="mailto:jamphy.admin@gmail.com" className="text-[#8B5CF6] hover:underline">jamphy.admin@gmail.com</a></p>
                <p className="text-[#cbc3d7] text-sm mt-1">Subject line: <span className="text-white font-mono">DMCA Takedown Notice — [Description]</span></p>
              </div>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                We will review all valid notices and remove or disable access to infringing content promptly. Repeat infringers will have their accounts terminated. Knowingly submitting a false DMCA notice may result in legal liability.
              </p>
            </section>

            <section id="disclaimer" className="scroll-mt-28">
              <SectionHeading>10. Disclaimers</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                THE SERVICE IS PROVIDED ON AN <strong className="text-white">&quot;AS IS&quot;</strong> AND <strong className="text-white">&quot;AS AVAILABLE&quot;</strong> BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                Jamphy does not warrant that: (a) the Service will be uninterrupted or error-free; (b) the questions or solutions are 100% accurate; (c) use of the Service will guarantee success in IIT JAM or any examination. Always verify important information with official IIT JAM sources.
              </p>
            </section>

            <section id="liability" className="scroll-mt-28">
              <SectionHeading>11. Limitation of Liability</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, JAMPHY AND ITS DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES — ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF (OR INABILITY TO USE) THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75] mt-4">
                Our total aggregate liability to you for any claims arising under these Terms shall not exceed the greater of (a) the amount you paid to Jamphy in the twelve months preceding the claim, or (b) ₹500 INR.
              </p>
            </section>

            <section id="indemnification" className="scroll-mt-28">
              <SectionHeading>12. Indemnification</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                You agree to defend, indemnify, and hold harmless Jamphy and its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including legal fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights, including intellectual property rights; or (d) any content you submit to the Service.
              </p>
            </section>

            <section id="termination" className="scroll-mt-28">
              <SectionHeading>13. Termination</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                We reserve the right to suspend or terminate your account and access to the Service at our sole discretion, with or without notice, for any reason, including if we believe you have violated these Terms. You may also delete your account at any time through your profile settings.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                Upon termination, your right to use the Service ceases immediately. Sections relating to intellectual property, disclaimers, limitation of liability, indemnification, and governing law will survive termination.
              </p>
            </section>

            <section id="governing" className="scroll-mt-28">
              <SectionHeading>14. Governing Law &amp; Dispute Resolution</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                These Terms shall be governed by and construed in accordance with the laws of <strong className="text-white">India</strong>, without regard to its conflict-of-law provisions. The courts of <strong className="text-white">India</strong> shall have exclusive jurisdiction over any disputes arising from or relating to these Terms.
              </p>
              <p className="text-[#cbc3d7] leading-[1.75]">
                Before initiating any legal proceedings, both parties agree to attempt to resolve any dispute through good-faith negotiation for a period of at least 30 days.
              </p>
            </section>

            <section id="changes" className="scroll-mt-28">
              <SectionHeading>15. Changes to Terms</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75]">
                We may revise these Terms at any time. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you via email or a prominent notice on the Service. Your continued use of the Service after any changes constitutes acceptance of the new Terms. It is your responsibility to review these Terms periodically.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28">
              <SectionHeading>16. Contact Us</SectionHeading>
              <p className="text-[#cbc3d7] leading-[1.75] mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-[#cbc3d7]">
                <p><strong className="text-white">Jamphy</strong></p>
                <p>General: <a href="mailto:jamphy.admin@gmail.com" className="text-[#8B5CF6] hover:underline">jamphy.admin@gmail.com</a></p>
                <p>Legal / DMCA: <a href="mailto:jamphy.admin@gmail.com" className="text-[#8B5CF6] hover:underline">jamphy.admin@gmail.com</a></p>
                <p>Website: <a href="https://jamphy.com" className="text-[#8B5CF6] hover:underline">jamphy.com</a></p>
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* Footer */}
      <LegalFooter active="terms" />
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

function PolicyBlock({ color, title, children }) {
  const styles = {
    violet: { border: "border-[#8B5CF6]/30", bg: "bg-[#8B5CF6]/5", dot: "bg-[#8B5CF6]", text: "text-[#8B5CF6]" },
    green:  { border: "border-[#10B981]/30", bg: "bg-[#10B981]/5", dot: "bg-[#10B981]", text: "text-[#10B981]" },
    amber:  { border: "border-[#F59E0B]/30", bg: "bg-[#F59E0B]/5", dot: "bg-[#F59E0B]", text: "text-[#F59E0B]" },
  }[color];
  return (
    <div className={`${styles.bg} ${styles.border} border rounded-xl p-5`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${styles.dot} shrink-0`}></span>
        <h4 className={`font-bold text-sm uppercase tracking-wider ${styles.text}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{title}</h4>
      </div>
      <p className="text-[#cbc3d7] text-sm leading-relaxed">{children}</p>
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
