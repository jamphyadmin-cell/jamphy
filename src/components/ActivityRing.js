"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function ActivityRing({ percentage = 0, size = 120, strokeWidth = 10, color = "#0a84ff", onClick }) {
  const [isClient, setIsClient] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedPercentage = useSpring(0, {
    stiffness: 50,
    damping: 15,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    animatedPercentage.set(percentage > 100 ? 100 : percentage);
  }, [percentage, animatedPercentage]);

  const strokeDashoffset = useTransform(
    animatedPercentage,
    (v) => circumference - (v / 100) * circumference
  );

  const isComplete = percentage >= 100;

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
        isComplete ? "animate-pulse-slow" : ""
      }`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#3f3f46" // zinc-700
          strokeWidth={strokeWidth}
        />
        {/* Foreground Circle */}
        {isClient && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#0a84ff"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-white leading-none">
          {Math.round(percentage)}%
        </span>
        <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
          GOAL
        </span>
      </div>
    </div>
  );
}
