"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import MathText from "./MathText";
import { AnimatePresence, motion } from "framer-motion";

export default function ShareModal({ isOpen, onClose, question }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const cardRef = useRef(null);

  if (!isOpen || !question) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const generateCanvas = async () => {
    if (!cardRef.current) return null;
    setIsGenerating(true);
    try {
      // Temporarily unhide the off-screen card to render it accurately
      const element = cardRef.current;
      element.style.display = "block";
      const canvas = await html2canvas(element, {
        backgroundColor: "#0a0a0a",
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
      });
      element.style.display = "none";
      return canvas;
    } catch (err) {
      console.error("Failed to generate image", err);
      showToast("Error generating image");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyImage = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        showToast("Copied to clipboard!");
      } catch (err) {
        console.error("Clipboard write failed", err);
        showToast("Clipboard access denied. Try downloading instead.");
      }
    }, "image/png");
  };

  const handleDownload = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `jamphy-q-${question.year}-${question.subject}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareText = `Check out this IIT JAM Physics question from ${question.year} on Jamphy!\n\n`;
  const shareUrl = "https://jamphy.com";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-10 z-[200] bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="text-2xl font-black text-white mb-2">Share Question</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Generate a high-quality image of this question to share with your friends or study groups.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopyImage}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-electric-violet hover:bg-[#7C3AED] text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
            {isGenerating ? "Generating..." : "Copy Image to Clipboard"}
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Download PNG
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3 text-center">
            Or share link directly
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <i className="fi fi-brands-whatsapp text-xl"></i>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <i className="fi fi-brands-twitter-alt text-xl"></i>
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-colors"
            >
              <i className="fi fi-brands-telegram text-xl"></i>
            </a>
          </div>
          <p className="text-[11px] text-zinc-500 text-center mt-3">
            Pro tip: Click "Copy Image" first, then paste (Ctrl+V) directly into your WhatsApp or Twitter message!
          </p>
        </div>
      </div>

      {/* Hidden DOM element for html2canvas rendering */}
      <div
        ref={cardRef}
        style={{
          display: "none",
          width: "800px", // Fixed large width for good quality
          padding: "40px",
          backgroundColor: "#0a0a0a",
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          fontFamily: "'Inter', sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          {/* Logo - assuming /logo.png is accessible; might need absolute URL in some strict environments, but relative usually works on same domain */}
          <img src="/logo.png" alt="jamphy" style={{ height: "40px", width: "auto" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: "6px", fontSize: "14px", fontWeight: "bold" }}>
              {question.year}
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: "6px", fontSize: "14px", fontWeight: "bold" }}>
              {question.subject}
            </span>
          </div>
        </div>
        
        <div style={{ fontSize: "24px", lineHeight: "1.6", fontWeight: "500", minHeight: "200px" }}>
          <MathText>{question.question}</MathText>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "40px", borderTop: "1px solid #27272a", paddingTop: "20px" }}>
          <p style={{ color: "#a1a1aa", fontSize: "16px", margin: 0 }}>
            Master IIT JAM Physics PYQs.
          </p>
          <p style={{ color: "#8b5cf6", fontSize: "20px", fontWeight: "bold", margin: 0 }}>
            jamphy.com
          </p>
        </div>
      </div>
    </div>
  );
}
