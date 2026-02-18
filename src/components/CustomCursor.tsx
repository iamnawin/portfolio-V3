"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { state } = useCursor();

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      data-cursor-state={state}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-transform duration-100"
    />
  );
}
