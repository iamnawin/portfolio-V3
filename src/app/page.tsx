"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Preloader from "@/components/Preloader";

// ── Magnetic scattered letters ──────────────────────────────
const LETTERS = ["N", "A", "V", "E", "E", "N"];

// Each letter gets a random launch position outside its resting spot
function randomScatter() {
  const angle = Math.random() * Math.PI * 2;
  const dist = 200 + Math.random() * 300;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: (Math.random() - 0.5) * 360,
    scale: 0.2 + Math.random() * 0.5,
  };
}

function MagneticName({
  tilt,
  faded,
}: {
  tilt: { x: number; y: number };
  faded: boolean;
}) {
  // settled: are letters in their resting position
  const [settled, setSettled] = useState(false);
  // per-letter scatter offsets (only used before settling)
  const [scatters] = useState(() => LETTERS.map(() => randomScatter()));
  // idle drift — small sinusoidal breath after settle
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const t0 = useRef(performance.now());

  // Fire settle after a staggered delay
  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Continuous idle breath after settling
  useEffect(() => {
    if (!settled) return;
    const tick = (now: number) => {
      const elapsed = (now - t0.current) / 1000;
      setDrift({
        x: Math.sin(elapsed * 0.4) * 4,
        y: Math.cos(elapsed * 0.55) * 3,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [settled]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.02em",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(4rem, 8vw, 8rem)",
        lineHeight: 0.9,
        letterSpacing: "0.04em",
        // Group-level tilt from mouse/gyro — applied after settle
        transform: settled
          ? `translate(${tilt.x * 0.55 + drift.x}px, ${tilt.y * 0.55 + drift.y}px)`
          : "none",
        transition: settled
          ? "transform 0.18s cubic-bezier(0.23,1,0.32,1)"
          : "none",
        opacity: faded ? 0.12 : 1,
      }}
    >
      {LETTERS.map((letter, i) => {
        const s = scatters[i];
        const delay = i * 55; // stagger ms
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: "#fff",
              // Before settle: scatter position + random rotation; after: home
              transform: settled
                ? `translate(0,0) rotate(0deg) scale(1)`
                : `translate(${s.x}px, ${s.y}px) rotate(${s.rotate}deg) scale(${s.scale})`,
              opacity: settled ? 1 : 0,
              transition: settled
                ? `transform ${420 + delay}ms cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms,
                   opacity ${200}ms ease ${delay}ms`
                : "none",
              // Per-letter micro-parallax based on index offset
              filter: settled ? "none" : "blur(4px)",
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<"none" | "pro" | "creator">(
    "none"
  );
  const [entered, setEntered] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setEntered(true), 100);
  }, []);

  // Unified tilt from mouse (desktop) or gyroscope (mobile)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Desktop: mouse
    const onMouse = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", onMouse);

    // Mobile: device orientation (gyroscope)
    const onOrientation = (e: DeviceOrientationEvent) => {
      // gamma = left/right tilt (-90..90), beta = front/back tilt (-180..180)
      const x = Math.max(-20, Math.min(20, (e.gamma ?? 0) * 0.6));
      const y = Math.max(-20, Math.min(20, ((e.beta ?? 0) - 20) * 0.5));
      setTilt({ x, y });
    };
    window.addEventListener("deviceorientation", onOrientation);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  // Keep mouse parallax for background blobs
  const mouse = { x: tilt.x * 0.67, y: tilt.y * 0.67 };

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoad} />}

      {loaded && (
        <div className="h-screen w-screen flex relative overflow-hidden bg-black">
          {/* Center divider line */}
          <div
            className="absolute top-0 left-1/2 w-[1px] h-full z-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
              transition: "opacity 0.5s ease",
              opacity: hoveredTrack === "none" ? 1 : 0.3,
            }}
          />

          {/* Center name — magnetic scatter + tilt */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none text-center select-none"
          >
            {entered && (
              <>
                <MagneticName
                  tilt={tilt}
                  faded={hoveredTrack !== "none"}
                />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.3)",
                    marginTop: 18,
                    opacity: hoveredTrack === "none" ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    transform: `translate(${tilt.x * 0.25}px, ${tilt.y * 0.25}px)`,
                  }}
                >
                  CHOOSE YOUR PATH
                </div>
              </>
            )}
          </div>

          {/* ── LEFT: PROFESSIONAL TRACK ── */}
          <Link
            href="/professional"
            className="relative flex-1 flex flex-col items-center justify-center cursor-pointer group no-underline"
            style={{
              background: hoveredTrack === "pro" ? "#0b1120" : "#080c16",
              transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
              flex: hoveredTrack === "pro" ? 1.3 : hoveredTrack === "creator" ? 0.7 : 1,
            }}
            onMouseEnter={() => setHoveredTrack("pro")}
            onMouseLeave={() => setHoveredTrack("none")}
          >
            {/* Background grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Blue ambient glow */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                top: "40%",
                left: "50%",
                transform: `translate(calc(-50% + ${mouse.x * 0.5}px), calc(-50% + ${mouse.y * 0.5}px))`,
                transition: "transform 0.3s ease",
                opacity: hoveredTrack === "pro" ? 1 : 0.3,
              }}
            />

            <div className="relative z-10 text-center px-8">
              {/* Icon */}
              <div
                className="mx-auto mb-8 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  border: "1px solid rgba(59,130,246,0.2)",
                  background: "rgba(59,130,246,0.05)",
                  transition: "all 0.4s ease",
                  boxShadow:
                    hoveredTrack === "pro"
                      ? "0 0 40px rgba(59,130,246,0.2)"
                      : "none",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(96,165,250,0.8)"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(96,165,250,0.6)",
                  marginBottom: 16,
                }}
              >
                PROFESSIONAL
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color: hoveredTrack === "pro" ? "#60a5fa" : "rgba(241,245,249,0.7)",
                  lineHeight: 1.1,
                  transition: "color 0.4s ease",
                  letterSpacing: "0.02em",
                }}
              >
                AI-DRIVEN
                <br />
                APPLICATION
                <br />
                DESIGNER
              </h2>

              <p
                className="mt-6 max-w-[280px] mx-auto"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "rgba(148,163,184,0.6)",
                  transition: "color 0.4s ease",
                  ...(hoveredTrack === "pro" && {
                    color: "rgba(148,163,184,0.9)",
                  }),
                }}
              >
                Enterprise architecture, intelligent automation, and scalable
                application design.
              </p>

              {/* Enter arrow */}
              <div
                className="mt-10 flex items-center gap-3 mx-auto w-fit"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "rgba(96,165,250,0.4)",
                  opacity: hoveredTrack === "pro" ? 1 : 0,
                  transform:
                    hoveredTrack === "pro"
                      ? "translateY(0)"
                      : "translateY(10px)",
                  transition: "all 0.4s ease",
                }}
              >
                ENTER →
              </div>
            </div>
          </Link>

          {/* ── RIGHT: CREATOR TRACK ── */}
          <Link
            href="/creator"
            className="relative flex-1 flex flex-col items-center justify-center cursor-pointer group no-underline"
            style={{
              background: hoveredTrack === "creator" ? "#0a0606" : "#080606",
              transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
              flex:
                hoveredTrack === "creator"
                  ? 1.3
                  : hoveredTrack === "pro"
                    ? 0.7
                    : 1,
            }}
            onMouseEnter={() => setHoveredTrack("creator")}
            onMouseLeave={() => setHoveredTrack("none")}
          >
            {/* Background noise texture */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(245,158,11,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(239,68,68,0.2) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(139,92,246,0.2) 0%, transparent 50%)`,
              }}
            />

            {/* Warm ambient glow */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
                top: "40%",
                left: "50%",
                transform: `translate(calc(-50% + ${mouse.x * 0.5}px), calc(-50% + ${mouse.y * 0.5}px))`,
                transition: "transform 0.3s ease",
                opacity: hoveredTrack === "creator" ? 1 : 0.3,
              }}
            />

            <div className="relative z-10 text-center px-8">
              {/* Icon */}
              <div
                className="mx-auto mb-8 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  border: "1px solid rgba(245,158,11,0.2)",
                  background: "rgba(245,158,11,0.05)",
                  transition: "all 0.4s ease",
                  boxShadow:
                    hoveredTrack === "creator"
                      ? "0 0 40px rgba(245,158,11,0.2)"
                      : "none",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(245,158,11,0.8)"
                  strokeWidth="1.5"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(245,158,11,0.6)",
                  marginBottom: 16,
                }}
              >
                CREATIVE
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color:
                    hoveredTrack === "creator"
                      ? "#f59e0b"
                      : "rgba(254,243,199,0.7)",
                  lineHeight: 1.1,
                  transition: "color 0.4s ease",
                  letterSpacing: "0.02em",
                }}
              >
                AI CINEMATIC
                <br />
                CREATOR &
                <br />
                STORYTELLER
              </h2>

              <p
                className="mt-6 max-w-[280px] mx-auto"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "rgba(168,137,107,0.6)",
                  transition: "color 0.4s ease",
                  ...(hoveredTrack === "creator" && {
                    color: "rgba(168,137,107,0.9)",
                  }),
                }}
              >
                AI-powered cinematic storytelling, mythology, automation, and
                content creation.
              </p>

              {/* Enter arrow */}
              <div
                className="mt-10 flex items-center gap-3 mx-auto w-fit"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "rgba(245,158,11,0.4)",
                  opacity: hoveredTrack === "creator" ? 1 : 0,
                  transform:
                    hoveredTrack === "creator"
                      ? "translateY(0)"
                      : "translateY(10px)",
                  transition: "all 0.4s ease",
                }}
              >
                ENTER →
              </div>
            </div>
          </Link>

          {/* Bottom bar */}
          <div
            className="absolute bottom-6 left-0 right-0 z-40 flex justify-between items-center px-10"
            style={{
              opacity: entered ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              © 2025
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              AIWITHNOBRAIN • ZEROORIGINS
            </span>
          </div>
        </div>
      )}
    </>
  );
}
