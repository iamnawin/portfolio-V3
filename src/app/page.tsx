"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Preloader from "@/components/Preloader";

// ─────────────────────────────────────────────────────────────
//  NAVEEN — Holographic 3D nameplate
//  • Always centered, never scattered
//  • CSS perspective tilt driven by mouse / device gyroscope
//  • Animated gradient simulates a moving light source (specular)
//  • Letter-level stagger on entrance (slide up from below + fade)
//  • Idle breath keeps it alive when user isn't moving
// ─────────────────────────────────────────────────────────────

const LETTERS = ["N", "A", "V", "E", "E", "N"];

function HolographicName({
  tilt,
  hoveredTrack,
}: {
  tilt: { x: number; y: number };
  hoveredTrack: string;
}) {
  const [ready, setReady] = useState(false);
  const [breath, setBreath] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const t0 = useRef(0);

  // Delay entrance so letters animate in after preloader
  useEffect(() => {
    t0.current = performance.now();
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  // Subtle idle sinusoidal breath — keeps it alive when user isn't moving
  useEffect(() => {
    const tick = (now: number) => {
      const t = (now - t0.current) / 1000;
      setBreath({
        x: Math.sin(t * 0.4) * 1.5,
        y: Math.cos(t * 0.3) * 1.2,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // 3D rotation angles from tilt input
  const rotX = -tilt.y * 0.45 + breath.y;   // tilt up/down
  const rotY =  tilt.x * 0.45 + breath.x;   // tilt left/right

  // Light position for specular highlight — shifts with tilt
  const lightX = 50 + tilt.x * 1.8;         // % across name
  const lightY = 50 + tilt.y * 1.8;

  // Opacity: dim slightly when a track is hovered so track content reads
  const nameOpacity = hoveredTrack === "none" ? 1 : 0.18;

  return (
    <div
      style={{
        perspective: "900px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* The rotating word container */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: "transform 0.08s cubic-bezier(0.23,1,0.32,1), opacity 0.5s ease",
          opacity: nameOpacity,
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          gap: 0,
          position: "relative",
        }}
      >
        {/* ── Specular light sweep — moves with tilt ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-20px -30px",
            borderRadius: 8,
            background: `radial-gradient(ellipse 55% 60% at ${lightX}% ${lightY}%,
              rgba(255,255,255,0.13) 0%,
              rgba(255,255,255,0.04) 40%,
              transparent 70%)`,
            pointerEvents: "none",
            zIndex: 2,
            transition: "background 0.08s ease",
          }}
        />

        {/* ── Each letter ── */}
        {LETTERS.map((letter, i) => {
          const delay = i * 80; // entrance stagger
          // Slight Z-depth variation per letter for parallax
          const zDepth = Math.sin((i / (LETTERS.length - 1)) * Math.PI) * 18;

          return (
            <div
              key={i}
              style={{
                position: "relative",
                display: "inline-block",
                transform: ready
                  ? `translateZ(${zDepth}px)`
                  : `translateZ(${zDepth}px) translateY(60px)`,
                opacity: ready ? 1 : 0,
                transition: ready
                  ? `transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     opacity 500ms ease ${delay}ms`
                  : "none",
              }}
            >
              {/* Main letter — chrome gradient fill */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(5.5rem, 11vw, 11rem)",
                  lineHeight: 1,
                  letterSpacing: "0.06em",
                  display: "block",
                  // Chrome / polished steel gradient
                  background: `
                    linear-gradient(
                      170deg,
                      #ffffff 0%,
                      #e8e8e8 18%,
                      #b0b0b0 35%,
                      #d8d8d8 50%,
                      #888 65%,
                      #c0c0c0 78%,
                      #f0f0f0 100%
                    )`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  // 3D extrusion: layered drop shadows give thickness
                  filter: `
                    drop-shadow(0 1px 0 rgba(255,255,255,0.6))
                    drop-shadow(0 2px 0 rgba(180,180,180,0.4))
                    drop-shadow(0 4px 0 rgba(120,120,120,0.3))
                    drop-shadow(0 6px 0 rgba(80,80,80,0.2))
                    drop-shadow(0 10px 24px rgba(0,0,0,0.7))
                    drop-shadow(0 2px 40px rgba(0,0,0,0.4))
                  `,
                  userSelect: "none",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {letter}
              </span>

              {/* Per-letter tilt-shifted colour bloom */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(5.5rem, 11vw, 11rem)",
                  lineHeight: 1,
                  letterSpacing: "0.06em",
                  // Coloured halo that shifts with tilt — half blue, half amber
                  background: `radial-gradient(ellipse at ${lightX}% ${lightY}%,
                    rgba(100,180,255,0.25) 0%,
                    rgba(255,180,50,0.12) 50%,
                    transparent 70%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  zIndex: 3,
                  pointerEvents: "none",
                  transition: "background 0.08s ease",
                }}
              >
                {letter}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Ground reflection / shadow ── */}
      {ready && (
        <div
          aria-hidden
          style={{
            marginTop: 6,
            height: 28,
            background: `radial-gradient(ellipse 70% 100% at ${50 - rotY * 1.2}% 0%,
              rgba(255,255,255,0.06) 0%,
              transparent 80%)`,
            filter: "blur(4px)",
            transform: `scaleY(-1) scaleX(${1 - Math.abs(rotY) * 0.004})`,
            opacity: 0.5,
            transition: "background 0.08s ease",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main page
// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<"none" | "pro" | "creator">("none");
  const [entered, setEntered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setEntered(true), 80);
  }, []);

  useEffect(() => {
    // Smooth mouse → tilt (lerped in rAF)
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf: number;

    const onMouse = (e: MouseEvent) => {
      target = {
        x: (e.clientX / window.innerWidth  - 0.5) * 28,
        y: (e.clientY / window.innerHeight - 0.5) * 28,
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.x = lerp(current.x, target.x, 0.08);
      current.y = lerp(current.y, target.y, 0.08);
      setTilt({ x: current.x, y: current.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouse);

    // Gyroscope for mobile
    const onOrientation = (e: DeviceOrientationEvent) => {
      target = {
        x: Math.max(-18, Math.min(18, (e.gamma ?? 0) * 0.55)),
        y: Math.max(-18, Math.min(18, ((e.beta  ?? 0) - 20) * 0.45)),
      };
    };
    window.addEventListener("deviceorientation", onOrientation);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  const mouse = tilt; // blobs use same tilt

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoad} />}

      {loaded && (
        <div className="h-screen w-screen flex relative overflow-hidden bg-black">

          {/* ── Center divider ── */}
          <div
            className="absolute top-0 left-1/2 w-[1px] h-full z-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
              opacity: hoveredTrack === "none" ? 1 : 0.15,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* ── Holographic NAVEEN — pinned centre, z above everything ── */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none select-none text-center"
          >
            {entered && (
              <>
                <HolographicName tilt={tilt} hoveredTrack={hoveredTrack} />

                {/* Subtitle */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    color: hoveredTrack === "none"
                      ? "rgba(255,255,255,0.28)"
                      : "rgba(255,255,255,0.06)",
                    marginTop: 20,
                    transition: "color 0.5s ease",
                    transform: `translateX(${tilt.x * 0.12}px)`,
                    textShadow: "0 2px 16px rgba(0,0,0,1)",
                  }}
                >
                  CHOOSE YOUR PATH
                </div>
              </>
            )}
          </div>

          {/* ── LEFT: PROFESSIONAL ── */}
          <Link
            href="/professional"
            className="relative flex-1 flex flex-col items-center justify-center cursor-pointer no-underline"
            style={{
              background: hoveredTrack === "pro" ? "#0b1120" : "#080c16",
              transition: "all 0.6s cubic-bezier(0.25,0.1,0.25,1)",
              flex: hoveredTrack === "pro" ? 1.3 : hoveredTrack === "creator" ? 0.7 : 1,
            }}
            onMouseEnter={() => setHoveredTrack("pro")}
            onMouseLeave={() => setHoveredTrack("none")}
          >
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            {/* Blue glow */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                top: "40%", left: "50%",
                transform: `translate(calc(-50% + ${mouse.x * 0.5}px), calc(-50% + ${mouse.y * 0.5}px))`,
                transition: "transform 0.3s ease",
                opacity: hoveredTrack === "pro" ? 1 : 0.3,
              }}
            />

            <div className="relative z-10 text-center px-8">
              <div
                className="mx-auto mb-8 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  border: "1px solid rgba(59,130,246,0.2)",
                  background: "rgba(59,130,246,0.05)",
                  transition: "all 0.4s ease",
                  boxShadow: hoveredTrack === "pro" ? "0 0 40px rgba(59,130,246,0.2)" : "none",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.8)" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(96,165,250,0.6)", marginBottom: 16 }}>
                PROFESSIONAL
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3vw,2.5rem)", color: hoveredTrack === "pro" ? "#60a5fa" : "rgba(241,245,249,0.7)", lineHeight: 1.1, transition: "color 0.4s ease", letterSpacing: "0.02em" }}>
                AI-DRIVEN<br />APPLICATION<br />DESIGNER
              </h2>

              <p className="mt-6 max-w-[280px] mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: hoveredTrack === "pro" ? "rgba(148,163,184,0.9)" : "rgba(148,163,184,0.6)", transition: "color 0.4s ease" }}>
                Enterprise architecture, intelligent automation, and scalable application design.
              </p>

              <div className="mt-10 flex items-center gap-3 mx-auto w-fit" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "rgba(96,165,250,0.4)", opacity: hoveredTrack === "pro" ? 1 : 0, transform: hoveredTrack === "pro" ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s ease" }}>
                ENTER →
              </div>
            </div>
          </Link>

          {/* ── RIGHT: CREATOR ── */}
          <Link
            href="/creator"
            className="relative flex-1 flex flex-col items-center justify-center cursor-pointer no-underline"
            style={{
              background: hoveredTrack === "creator" ? "#0a0606" : "#080606",
              transition: "all 0.6s cubic-bezier(0.25,0.1,0.25,1)",
              flex: hoveredTrack === "creator" ? 1.3 : hoveredTrack === "pro" ? 0.7 : 1,
            }}
            onMouseEnter={() => setHoveredTrack("creator")}
            onMouseLeave={() => setHoveredTrack("none")}
          >
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(245,158,11,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(239,68,68,0.2) 0%, transparent 50%)" }} />

            {/* Amber glow */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
                top: "40%", left: "50%",
                transform: `translate(calc(-50% + ${mouse.x * 0.5}px), calc(-50% + ${mouse.y * 0.5}px))`,
                transition: "transform 0.3s ease",
                opacity: hoveredTrack === "creator" ? 1 : 0.3,
              }}
            />

            <div className="relative z-10 text-center px-8">
              <div
                className="mx-auto mb-8 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  border: "1px solid rgba(245,158,11,0.2)",
                  background: "rgba(245,158,11,0.05)",
                  transition: "all 0.4s ease",
                  boxShadow: hoveredTrack === "creator" ? "0 0 40px rgba(245,158,11,0.2)" : "none",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.8)" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(245,158,11,0.6)", marginBottom: 16 }}>
                CREATIVE
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3vw,2.5rem)", color: hoveredTrack === "creator" ? "#f59e0b" : "rgba(254,243,199,0.7)", lineHeight: 1.1, transition: "color 0.4s ease", letterSpacing: "0.02em" }}>
                AI CINEMATIC<br />CREATOR &<br />STORYTELLER
              </h2>

              <p className="mt-6 max-w-[280px] mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: hoveredTrack === "creator" ? "rgba(168,137,107,0.9)" : "rgba(168,137,107,0.6)", transition: "color 0.4s ease" }}>
                AI-powered cinematic storytelling, mythology, automation, and content creation.
              </p>

              <div className="mt-10 flex items-center gap-3 mx-auto w-fit" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "rgba(245,158,11,0.4)", opacity: hoveredTrack === "creator" ? 1 : 0, transform: hoveredTrack === "creator" ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s ease" }}>
                ENTER →
              </div>
            </div>
          </Link>

          {/* ── Bottom bar ── */}
          <div
            className="absolute bottom-6 left-0 right-0 z-40 flex justify-between items-center px-10"
            style={{ opacity: entered ? 1 : 0, transition: "opacity 1s ease 0.8s" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>© 2025</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>AIWITHNOBRAIN • ZEROORIGINS</span>
          </div>
        </div>
      )}
    </>
  );
}
