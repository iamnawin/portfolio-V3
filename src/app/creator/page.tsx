"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CursorThemeSetter from "@/components/CursorThemeSetter";

// ── Typed Text ─────────────────────────────────────────────
function TypedText({ texts }: { texts: string[] }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timer: NodeJS.Timeout;
    if (!deleting && charIdx <= current.length) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(charIdx + 1);
      }, 70);
    } else if (!deleting && charIdx > current.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setCharIdx(charIdx - 1);
        setDisplay(current.slice(0, charIdx - 1));
      }, 35);
    } else {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span>
      {display}
      <span
        className="ml-0.5 inline-block w-[2px] h-[1em] align-middle"
        style={{
          backgroundColor: "#f59e0b",
          animation: "blink 0.8s step-end infinite",
        }}
      />
    </span>
  );
}

// ── Social Sidebar ─────────────────────────────────────────
function SocialSidebar() {
  const links = [
    {
      icon: (
        // YouTube play-button SVG
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
        </svg>
      ),
      label: "YouTube",
      href: "https://www.youtube.com/@AIwithnobrain?sub_confirmation=1",
      color: "#ff0000",
    },
    {
      icon: (
        // Instagram gradient circle SVG
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      label: "Instagram",
      href: "https://www.instagram.com/aiwithnobrain",
      color: "#e1306c",
    },
    {
      icon: (
        // X (Twitter) SVG
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      label: "Twitter / X",
      href: "https://x.com/aiwithnobrain",
      color: "#ffffff",
    },
    {
      icon: (
        // Globe / website SVG
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      label: "AIwithNoBrain.com",
      href: "https://www.aiwithnobrain.com",
      color: "#f59e0b",
    },
  ];

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            title={l.label}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: `1px solid ${l.color}30`,
              color: `${l.color}70`,
              textDecoration: "none",
              background: `${l.color}06`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = l.color;
              e.currentTarget.style.color = l.color;
              e.currentTarget.style.boxShadow = `0 0 20px ${l.color}40`;
              e.currentTarget.style.background = `${l.color}12`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${l.color}30`;
              e.currentTarget.style.color = `${l.color}70`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = `${l.color}06`;
            }}
          >
            {l.icon}
          </a>
        ))}
        <div
          className="w-[1px] h-12 mx-auto mt-1"
          style={{
            background: "linear-gradient(to bottom, rgba(245,158,11,0.3), transparent)",
          }}
        />
      </div>

      {/* Mobile: fixed bottom bar */}
      <div
        className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 justify-center gap-5 py-3 px-6"
        style={{
          background: "rgba(10,6,6,0.92)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(245,158,11,0.08)",
        }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            title={l.label}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              border: `1px solid ${l.color}30`,
              color: `${l.color}70`,
              textDecoration: "none",
              background: `${l.color}06`,
            }}
          >
            {l.icon}
          </a>
        ))}
      </div>
    </>
  );
}

// ── Nav ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-10 py-4 md:py-5"
        style={{
          background: scrolled || menuOpen ? "rgba(10,6,6,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled || menuOpen
            ? "1px solid rgba(245,158,11,0.06)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "#f59e0b",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          ← NAVEEN
        </Link>

        {/* Centre brand — hidden on mobile */}
        <a
          href="https://www.aiwithnobrain.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block transition-all duration-300"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(245,158,11,0.45)",
            letterSpacing: "0.12em",
            textDecoration: "none",
            border: "1px solid rgba(245,158,11,0.15)",
            padding: "4px 12px",
            borderRadius: 99,
            background: "rgba(245,158,11,0.04)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "#f59e0b";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,158,11,0.5)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,158,11,0.08)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(245,158,11,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,158,11,0.45)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,158,11,0.15)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,158,11,0.04)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          ↗ AIWITHNOBRAIN.COM
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-9">
          {["story", "projects", "connect"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="hover:text-amber-400 transition-colors duration-300"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "rgba(168,137,107,0.5)",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {s}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#f59e0b",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transformOrigin: "center",
                transform:
                  menuOpen
                    ? i === 0
                      ? "translateY(5px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-5px) rotate(-45deg)"
                      : "opacity(0) scaleX(0)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-[60px] left-0 right-0 z-[99] flex flex-col gap-0"
          style={{
            background: "rgba(10,6,6,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(245,158,11,0.08)",
          }}
        >
          {["story", "projects", "connect"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.22em",
                color: "rgba(168,137,107,0.7)",
                textDecoration: "none",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(245,158,11,0.04)",
              }}
            >
              {s}
            </a>
          ))}
          <a
            href="https://www.aiwithnobrain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "rgba(245,158,11,0.5)",
              textDecoration: "none",
            }}
          >
            ↗ AIWITHNOBRAIN.COM
          </a>
        </div>
      )}
    </>
  );
}

// ── Aperture Mandala (hero centerpiece) ────────────────────
function ApertureMandala({ mouse }: { mouse: { x: number; y: number } }) {
  // 8 aperture blades, each rotated 45° apart
  const blades = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none select-none"
      style={{
        transform: `translate(calc(-50% + ${mouse.x * 0.06}px), calc(-50% + ${mouse.y * 0.06}px))`,
        transition: "transform 0.35s cubic-bezier(0.25,0.1,0.25,1)",
        zIndex: 5,
      }}
    >
      {/* ── Outermost orbit ring: Sanskrit / brand text ── */}
      <div
        className="absolute"
        style={{
          width: 420,
          height: 420,
          top: "50%",
          left: "50%",
          marginTop: -210,
          marginLeft: -210,
          animation: "mandala-spin-slow 60s linear infinite",
        }}
      >
        <svg width="420" height="420" viewBox="0 0 420 420">
          <defs>
            <path
              id="orbitPath"
              d="M 210,210 m -195,0 a 195,195 0 1,1 390,0 a 195,195 0 1,1 -390,0"
            />
          </defs>
          <text
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              fill: "rgba(245,158,11,0.35)",
            }}
          >
            <textPath href="#orbitPath">
              ॐ&nbsp;&nbsp;WHERE&nbsp;AI&nbsp;MEETS&nbsp;IMAGINATION&nbsp;&nbsp;•&nbsp;&nbsp;AI&nbsp;RAMAYANAM&nbsp;&nbsp;•&nbsp;&nbsp;STOP&nbsp;THINKING&nbsp;START&nbsp;CREATING&nbsp;&nbsp;•&nbsp;&nbsp;ZERO&nbsp;ORIGINS&nbsp;&nbsp;•&nbsp;&nbsp;AIWITHNOBRAIN&nbsp;&nbsp;•&nbsp;&nbsp;
            </textPath>
          </text>
        </svg>
      </div>

      {/* ── Middle orbit ring: dashed, counter-rotating ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: 340,
          height: 340,
          top: "50%",
          left: "50%",
          marginTop: -170,
          marginLeft: -170,
          border: "1px dashed rgba(239,68,68,0.18)",
          animation: "mandala-spin-rev 35s linear infinite",
        }}
      >
        {/* 6 small red planet dots on this ring */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute"
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: deg % 120 === 0 ? "#ef4444" : "#f59e0b",
              boxShadow: `0 0 8px ${deg % 120 === 0 ? "#ef4444" : "#f59e0b"}`,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 170 - 2.5}px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 170 - 2.5}px)`,
            }}
          />
        ))}
      </div>

      {/* ── Inner ring: solid amber, slow spin ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: 256,
          height: 256,
          top: "50%",
          left: "50%",
          marginTop: -128,
          marginLeft: -128,
          border: "1px solid rgba(245,158,11,0.22)",
          animation: "mandala-spin-slow 40s linear infinite",
        }}
      >
        {/* Single bright amber tracer dot */}
        <div
          className="absolute"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#f59e0b",
            boxShadow: "0 0 16px 4px rgba(245,158,11,0.6)",
            top: -3.5,
            left: "calc(50% - 3.5px)",
          }}
        />
      </div>

      {/* ── Aperture iris: 8 blades ── */}
      <div
        className="absolute"
        style={{
          width: 200,
          height: 200,
          top: "50%",
          left: "50%",
          marginTop: -100,
          marginLeft: -100,
          animation: "aperture-spin 20s linear infinite",
        }}
      >
        {blades.map((i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              transform: `rotate(${i * 45}deg)`,
            }}
          >
            {/* Each blade: an ellipse clipped to look like a camera shutter blade */}
            <div
              style={{
                position: "absolute",
                width: 72,
                height: 100,
                top: 0,
                left: "calc(50% - 36px)",
                borderRadius: "50% 50% 10% 10%",
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, rgba(245,158,11,0.13) 0%, rgba(245,158,11,0.04) 100%)"
                    : "linear-gradient(180deg, rgba(239,68,68,0.09) 0%, rgba(139,92,246,0.04) 100%)",
                border: `1px solid ${i % 2 === 0 ? "rgba(245,158,11,0.18)" : "rgba(239,68,68,0.12)"}`,
                transformOrigin: "50% 100%",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Core glow disc ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 110,
          top: "50%",
          left: "50%",
          marginTop: -55,
          marginLeft: -55,
          background:
            "radial-gradient(circle at 38% 38%, rgba(255,220,120,0.22) 0%, rgba(245,158,11,0.08) 50%, transparent 80%)",
          boxShadow:
            "0 0 60px rgba(245,158,11,0.28), 0 0 120px rgba(239,68,68,0.10), inset 0 0 30px rgba(255,200,100,0.08)",
          animation: "core-pulse 4s ease-in-out infinite",
        }}
      />

      {/* ── Center: lens aperture SVG icon ── */}
      <div
        className="absolute"
        style={{
          width: 72,
          height: 72,
          top: "50%",
          left: "50%",
          marginTop: -36,
          marginLeft: -36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Camera aperture / diaphragm SVG */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          style={{ animation: "aperture-spin-rev 12s linear infinite" }}
        >
          <defs>
            <radialGradient id="lensGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffd080" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          {/* Outer circle */}
          <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
          {/* 6 aperture petal paths */}
          {[0,60,120,180,240,300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 30 30)`}>
              <ellipse
                cx="30"
                cy="12"
                rx="8"
                ry="14"
                fill="url(#lensGrad)"
                opacity="0.55"
              />
            </g>
          ))}
          {/* Inner lens circle */}
          <circle cx="30" cy="30" r="10" fill="none" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
          <circle
            cx="30"
            cy="30"
            r="5"
            fill="rgba(255,220,120,0.7)"
            style={{ filter: "blur(1px)" }}
          />
        </svg>
      </div>

      {/* ── Twin-portal brand links below the mandala ── */}
      <div
        className="absolute"
        style={{
          top: "calc(50% + 128px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          whiteSpace: "nowrap",
        }}
      >
        {/* Thin divider line above */}
        <div style={{ width: 1, height: 18, background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.25))" }} />

        {/* Two pills side by side */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* AIwithNoBrain — amber */}
          <a
            href="https://www.aiwithnobrain.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "rgba(245,158,11,0.6)",
              textDecoration: "none",
              border: "1px solid rgba(245,158,11,0.2)",
              padding: "5px 12px",
              borderRadius: 99,
              background: "rgba(245,158,11,0.04)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#f59e0b";
              el.style.borderColor = "rgba(245,158,11,0.5)";
              el.style.background = "rgba(245,158,11,0.09)";
              el.style.boxShadow = "0 0 18px rgba(245,158,11,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "rgba(245,158,11,0.6)";
              el.style.borderColor = "rgba(245,158,11,0.2)";
              el.style.background = "rgba(245,158,11,0.04)";
              el.style.boxShadow = "none";
            }}
          >
            {/* YT icon tiny */}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            AIWITHNOBRAIN
          </a>

          {/* Dot separator */}
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(254,243,199,0.12)", flexShrink: 0 }} />

          {/* ZeroOrigins — purple */}
          <a
            href="https://www.zeroorigins.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "rgba(139,92,246,0.6)",
              textDecoration: "none",
              border: "1px solid rgba(139,92,246,0.2)",
              padding: "5px 12px",
              borderRadius: 99,
              background: "rgba(139,92,246,0.04)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#8b5cf6";
              el.style.borderColor = "rgba(139,92,246,0.5)";
              el.style.background = "rgba(139,92,246,0.09)";
              el.style.boxShadow = "0 0 18px rgba(139,92,246,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "rgba(139,92,246,0.6)";
              el.style.borderColor = "rgba(139,92,246,0.2)";
              el.style.background = "rgba(139,92,246,0.04)";
              el.style.boxShadow = "none";
            }}
          >
            {/* Atom / SaaS icon */}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeOpacity="0.4"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" strokeOpacity="0.7"/>
            </svg>
            ZEROORIGINS
          </a>
        </div>

        {/* Shared micro-tagline */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: "0.18em",
            color: "rgba(254,243,199,0.15)",
          }}
        >
          AI · CONTENT · SAAS · MUSIC
        </div>
      </div>
    </div>
  );
}

// ── Cinematic Ticker ────────────────────────────────────────
function CinematicTicker() {
  const items = [
    "● AIWITHNOBRAIN.COM",
    "▶ @AIWITHNOBRAIN ON YOUTUBE",
    "◆ AI RAMAYANAM: WAR OF DHARMA",
    "● WHERE AI MEETS IMAGINATION",
    "▶ ZEROORIGINS.IN",
    "◆ AI · SAAS · BUILDER COMMUNITY",
    "● STOP THINKING · START CREATING",
    "▶ AI MUSIC · SONIC MYTHOLOGY",
    "◆ 27 EPISODES · AI RAMAYANAM",
    "● FROM THOUGHT TO THUNDER",
    "▶ ZERO ORIGINS · BUILD WITH AI",
  ];
  // Duplicate for seamless loop
  const full = [...items, ...items];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(245,158,11,0.08)",
        borderBottom: "1px solid rgba(245,158,11,0.04)",
        background: "rgba(245,158,11,0.02)",
        height: 36,
        display: "flex",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          animation: "ticker-scroll 40s linear infinite",
          whiteSpace: "nowrap",
          paddingLeft: 60,
        }}
      >
        {full.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color:
                item.startsWith("▶")
                  ? "rgba(239,68,68,0.55)"
                  : item.startsWith("◆")
                  ? "rgba(139,92,246,0.55)"
                  : "rgba(245,158,11,0.5)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: "#0a0606" }}
    >
      {/* ── Ambient colour blobs ── */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 60%)",
          top: "10%", left: "18%",
          transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)`,
          transition: "transform 0.4s ease",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 60%)",
          bottom: "8%", right: "8%",
          transform: `translate(${mouse.x * -0.2}px, ${mouse.y * -0.2}px)`,
          transition: "transform 0.4s ease",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)",
          top: "50%", right: "28%",
          transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.15}px)`,
          transition: "transform 0.4s ease",
        }}
      />

      {/* ── Aperture Mandala — desktop only as absolute centrepiece ── */}
      <div className="hidden md:block">
        <ApertureMandala mouse={mouse} />
      </div>

      {/* ── Desktop layout: absolute left/right text ── */}
      <>
        {/* Left text — desktop */}
        <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 z-10">
          <div
            className="mb-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 300,
              color: "rgba(254,243,199,0.4)",
            }}
          >
            Hello! I&apos;m
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#fef3c7",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            NAVEEN
          </div>
          <div
            className="mt-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.25em",
              color: "rgba(245,158,11,0.5)",
            }}
          >
            CREATOR • STORYTELLER • BUILDER
          </div>
          <a
            href="https://www.youtube.com/@AIwithnobrain?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.18em",
              border: "1px solid rgba(255,0,0,0.3)",
              color: "rgba(255,100,100,0.7)",
              textDecoration: "none",
              background: "rgba(255,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#ff4444";
              (e.currentTarget as HTMLAnchorElement).style.color = "#ff6666";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(255,0,0,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,0,0,0.09)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,0,0,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,100,100,0.7)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,0,0,0.05)";
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            SUBSCRIBE ON YOUTUBE
          </a>
        </div>

        {/* Right text — desktop */}
        <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 text-right z-10">
          <div
            className="mb-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(254,243,199,0.3)",
            }}
          >
            An
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.8rem)",
              color: "rgba(245,158,11,0.2)",
              lineHeight: 1.1,
            }}
          >
            AI CINEMATIC
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
              color: "#fef3c7",
              lineHeight: 1.1,
              minHeight: 44,
            }}
          >
            <TypedText
              texts={[
                "MYTHOLOGY STORYTELLER",
                "CINEMATIC CREATOR",
                "AI FILMMAKER",
                "CONTENT ALCHEMIST",
              ]}
            />
          </div>
          <div
            className="mt-5"
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}
          >
            <div style={{ width: 40, height: 1, background: "rgba(139,92,246,0.25)" }} />
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <a
                href="https://www.zeroorigins.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  color: "rgba(139,92,246,0.5)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8b5cf6"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(139,92,246,0.5)"; }}
              >
                ↗ ZEROORIGINS.IN
              </a>
              <span style={{ color: "rgba(254,243,199,0.1)", fontSize: 8 }}>·</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "rgba(239,68,68,0.35)" }}>
                AI MUSIC
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                letterSpacing: "0.14em",
                color: "rgba(254,243,199,0.12)",
              }}
            >
              LEARN · BUILD · CREATE
            </div>
          </div>
        </div>
      </>

      {/* ── Mobile layout: stacked, centered column ── */}
      <div
        className="md:hidden w-full flex flex-col items-center text-center z-10 px-6 pb-24"
        style={{ paddingTop: "88px" }}
      >
        {/* Scaled-down mandala */}
        <div
          className="relative mb-6"
          style={{ width: 200, height: 200, flexShrink: 0 }}
        >
          <ApertureMandala mouse={{ x: 0, y: 0 }} />
        </div>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(254,243,199,0.4)",
            marginBottom: 4,
          }}
        >
          Hello! I&apos;m
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 13vw, 4.5rem)",
            color: "#fef3c7",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          NAVEEN
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "rgba(245,158,11,0.5)",
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          CREATOR • STORYTELLER • BUILDER
        </div>

        <div style={{ width: 36, height: 1, background: "rgba(245,158,11,0.2)", marginBottom: 14 }} />

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(254,243,199,0.3)",
            marginBottom: 2,
          }}
        >
          An
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 4.5vw, 1.8rem)",
            color: "rgba(245,158,11,0.25)",
            lineHeight: 1.1,
          }}
        >
          AI CINEMATIC
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 5.5vw, 2.2rem)",
            color: "#fef3c7",
            lineHeight: 1.15,
            minHeight: 38,
            marginBottom: 8,
          }}
        >
          <TypedText
            texts={[
              "MYTHOLOGY STORYTELLER",
              "CINEMATIC CREATOR",
              "AI FILMMAKER",
              "CONTENT ALCHEMIST",
            ]}
          />
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 22 }}>
          <a
            href="https://www.zeroorigins.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.13em",
              color: "rgba(139,92,246,0.5)",
              textDecoration: "none",
            }}
          >
            ↗ ZEROORIGINS.IN
          </a>
          <span style={{ color: "rgba(254,243,199,0.1)", fontSize: 8 }}>·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(239,68,68,0.35)" }}>
            AI MUSIC
          </span>
        </div>

        <a
          href="https://www.youtube.com/@AIwithnobrain?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            border: "1px solid rgba(255,0,0,0.3)",
            color: "rgba(255,100,100,0.8)",
            textDecoration: "none",
            background: "rgba(255,0,0,0.06)",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
          </svg>
          SUBSCRIBE ON YOUTUBE
        </a>
      </div>

      {/* ── Background watermark ── */}
      <div
        className="absolute -bottom-5 left-0 w-full text-center select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 12vw, 12rem)",
          color: "rgba(245,158,11,0.015)",
          letterSpacing: "0.05em",
        }}
      >
        ZERO ORIGINS
      </div>

      {/* ── Cinematic ticker strip at the very bottom ── */}
      <CinematicTicker />
    </section>
  );
}

// ── Story ──────────────────────────────────────────────────
function Story() {
  return (
    <section
      id="story"
      className="py-16 md:py-32 px-5 md:px-20 relative overflow-hidden"
      style={{ background: "#080505" }}
    >
      {/* Subtle color accent */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full"
        style={{
          background: "radial-gradient(ellipse at right, rgba(245,158,11,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#f59e0b",
            marginBottom: 20,
          }}
        >
          THE STORY
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "#fef3c7",
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          Started With Nothing.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Built Everything.
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.9,
                color: "rgba(254,243,199,0.5)",
                marginBottom: 20,
              }}
            >
              It didn&apos;t start with a plan. Just a guy, a weekend, and a
              raw curiosity about what AI could actually create. No pitch deck.
              No roadmap. Then one late night, a scene from the Ramayanam
              rendered itself on screen — and everything shifted.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.9,
                color: "rgba(254,243,199,0.5)",
              }}
            >
              Today,{" "}
              <span style={{ color: "#8b5cf6", fontWeight: 500 }}>ZeroOrigins</span>{" "}
              is the engine behind it all — AI SaaS products,{" "}
              <span style={{ color: "#f59e0b" }}>AIwithNoBrain</span> on YouTube,
              cinematic mythology, and music. Still built on weekends.
              Still driven by one question: what&apos;s actually possible?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "WKD", label: "Built on Weekends", color: "#f59e0b" },
              { num: "∅→", label: "Started With No Goal", color: "#ef4444" },
              { num: "2AM", label: "When Ideas Hit", color: "#8b5cf6" },
              { num: "∞", label: "Under ZeroOrigins", color: "#f59e0b" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-5 rounded-xl"
                style={{
                  background: `${s.color}06`,
                  border: `1px solid ${s.color}15`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 36,
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "rgba(254,243,199,0.3)",
                    letterSpacing: "0.1em",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: "AI Ramayanam: War of Dharma",
      tag: "CINEMATIC SERIES",
      desc: "27-episode AI-generated cinematic series bringing Hindu mythology to life. Photorealistic visuals, authentic cultural representation, shot-by-shot storyboards.",
      tech: ["WAN 2.2", "Midjourney", "AI Video", "Storyboarding"],
      gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.1))",
      accent: "#f59e0b",
    },
    {
      title: "ZeroOrigins.in",
      tag: "AI NEWS PLATFORM",
      desc: "Automated AI news aggregation platform built with n8n. Real-time content curation and delivery from multiple sources.",
      tech: ["n8n", "Automation", "Web Scraping", "Content AI"],
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(245,158,11,0.08))",
      accent: "#8b5cf6",
    },
    {
      title: "Epic AI: Mythology Storytelling Course",
      tag: "EDUCATION",
      desc: "Teaching creators how to produce cinematic AI content — from prompt engineering to production workflows.",
      tech: ["Course", "AI Workflows", "Prompt Engineering", "Production"],
      gradient: "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(139,92,246,0.08))",
      accent: "#ef4444",
    },
   
    {
      title: "AI Pre-Production Studio",
      tag: "PASSION PROJECT",
      desc: "Exploring AI-assisted storyboarding, concept art, and pre-visualization for cinematic storytelling — applied hands-on to every episode of AI Ramayanam.",
      tech: ["Storyboarding", "Concept Art", "Pre-Viz", "Cinema"],
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(239,68,68,0.08))",
      accent: "#8b5cf6",
    },
  ];

  return (
    <section
      id="projects"
      className="py-16 md:py-32 px-5 md:px-20 relative"
      style={{ background: "#0a0606" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#f59e0b",
            marginBottom: 20,
          }}
        >
          CREATIONS
        </div>
        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "#fef3c7",
            lineHeight: 1.1,
          }}
        >
          Projects & Episodes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group p-7 rounded-xl cursor-pointer transition-all duration-500 hover:-translate-y-1"
              style={{
                background: p.gradient,
                border: `1px solid ${p.accent}12`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  `${p.accent}40`;
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 12px 50px ${p.accent}18`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  `${p.accent}12`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: p.accent,
                }}
              >
                {p.tag}
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  color: "#fef3c7",
                  lineHeight: 1.15,
                  letterSpacing: "0.01em",
                }}
              >
                {p.title}
              </h3>
              <p
                className="mb-5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "rgba(254,243,199,0.4)",
                }}
              >
                {p.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.05em",
                      border: `1px solid ${p.accent}20`,
                      color: `${p.accent}88`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ── Connect ────────────────────────────────────────────────
function Connect() {
  const email = "hello@aiwithnobrain.com";

  return (
    <section
      id="connect"
      className="py-16 md:py-32 px-5 md:px-20 relative"
      style={{
        background: "#0a0606",
        borderTop: "1px solid rgba(245,158,11,0.05)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#f59e0b",
            marginBottom: 20,
          }}
        >
          A CREATIVE SIDE
        </div>

        <h2
          className="mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "#fef3c7",
            lineHeight: 1.05,
          }}
        >
          BUILT ON
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PURE PASSION
          </span>
        </h2>

        <p
          className="mb-4 max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(254,243,199,0.45)",
          }}
        >
          This is the ZeroOrigins universe — mythology, AI SaaS tools,
          cinematic storytelling, music made from scratch. No investors.
          No timeline. Just obsessive building on every free weekend.
        </p>

        <p
          className="mb-10 max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.8,
            color: "rgba(254,243,199,0.3)",
          }}
        >
          If you&apos;re into AI, storytelling, or mythology — let&apos;s talk.
        </p>

        {/* CTA row — YouTube first, email second */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://www.youtube.com/@AIwithnobrain?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.15em",
              background: "linear-gradient(135deg, #cc0000, #ef4444)",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 0 40px rgba(239,68,68,0.2)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            WATCH ON YOUTUBE
          </a>

          <a
            href="https://music.youtube.com/channel/UCEtEPGlyMff6rhroYZpU-Vg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.15em",
              background: "linear-gradient(135deg, #1a1a2e, #16213e)",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 30px rgba(139,92,246,0.15)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
            LISTEN TO MY MUSIC
          </a>

          <a
            href={`mailto:${email}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "rgba(254,243,199,0.3)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,158,11,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(254,243,199,0.3)"; }}
          >
            or say hi → {email}
          </a>
        </div>

        {/* Footer */}
        <div
          className="mt-16 md:mt-32 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(245,158,11,0.05)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(254,243,199,0.2)",
              letterSpacing: "0.1em",
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>© 2025 NAVEEN</span>
            <span style={{ opacity: 0.3 }}>•</span>
            <a
              href="https://www.aiwithnobrain.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(245,158,11,0.4)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f59e0b"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,158,11,0.4)"; }}
            >
              AIWITHNOBRAIN
            </a>
            <span style={{ opacity: 0.3 }}>•</span>
            <a
              href="https://www.zeroorigins.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(139,92,246,0.4)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8b5cf6"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(139,92,246,0.4)"; }}
            >
              ZEROORIGINS
            </a>
            <span style={{ opacity: 0.3 }}>•</span>
            <span style={{ color: "rgba(239,68,68,0.35)" }}>MUSIC</span>
          </span>

          <Link
            href="/professional"
            className="transition-colors duration-300 hover:text-blue-400"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(254,243,199,0.2)",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            VIEW PROFESSIONAL SIDE →
          </Link>
        </div>
      </div>
    </section>
  );
}


// ── Page ───────────────────────────────────────────────────

export default function CreatorPage() {
  return (
    <main style={{ background: "#0a0606" }}>
      <CursorThemeSetter />
      <Navbar />
      <SocialSidebar />
      <Hero />
      <Story />
      <Projects />
      <Connect />
    </main>
  );
}