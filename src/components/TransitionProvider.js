"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Reset transition state when path changes
  useEffect(() => {
    setIsPending(false);
  }, [pathname]);

  const navigateWithTransition = (href) => {
    setIsPending(true);
    setTimeout(() => {
      router.push(href);
    }, 600); // Give 600ms for fade-in animation to complete
  };

  const triggerStateTransition = (callback) => {
    setIsPending(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsPending(false);
      }, 150); // Smooth out the finish state
    }, 600); // Give 600ms for fade-in animation to complete
  };

  return (
    <TransitionContext.Provider value={{ isPending, navigateWithTransition, triggerStateTransition }}>
      {children}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Central subtle orbit path */}
              <div className="absolute w-20 h-20 rounded-full border border-white/5 bg-transparent"></div>
              {/* Orbiting glowing ball */}
              <div className="orbit-ball"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionContext must be used within a TransitionProvider");
  }
  return context;
}
