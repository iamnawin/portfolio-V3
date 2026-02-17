"use client";
import { useState, useEffect } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setFade(true), 300);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return p + Math.floor(Math.random() * 3) + 2;
      });
    }, 25);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "#050505",
        transition: "opacity 0.8s ease",
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? "none" : "all",
      }}
    >
      {/* Watermark */}
      <div
        className="absolute w-full text-center select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 10vw, 9rem)",
          color: "rgba(255,255,255,0.02)",
          lineHeight: 1.1,
        }}
      >
        DESIGN • CREATE • BUILD
      </div>

      {/* Loader pill */}
      <div
        className="relative flex items-center gap-8 z-10"
        style={{
          background: "#111",
          borderRadius: 60,
          padding: "20px 48px",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: `0 0 80px rgba(255,255,255,${0.02 + progress * 0.001})`,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.25em",
            color: "#888",
          }}
        >
          LOADING
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 16,
            color: "#fff",
            minWidth: 50,
            textAlign: "right",
          }}
        >
          {Math.min(progress, 100)}%
        </span>
      </div>

      {/* Progress line */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          width: `${Math.min(progress, 100)}%`,
          background:
            "linear-gradient(90deg, #3b82f6, #f59e0b)",
          transition: "width 0.1s ease",
        }}
      />
    </div>
  );
}
