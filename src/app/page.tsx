"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Preloader from "@/components/Preloader";

// ── 3D Floating Name ────────────────────────────────────────
const LETTERS = ["N", "A", "V", "E", "E", "N"];

function randomScatter() {
  const angle = Math.random() * Math.PI * 2;
  const dist = 300 + Math.random() * 400;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rz: (Math.random() - 0.5) * 540,
    ry: (Math.random() - 0.5) * 180,
    scale: 0.1 + Math.random() * 0.4,
  };
}

function FloatingName({
  tilt,
  faded,
}: {
  tilt: { x: number; y: number };
  faded: boolean;
}) {
  const [settled, setSettled] = useState(false);
  const [scatters] = useState(() => LETTERS.map(() => randomScatter()));
  const [drift, setDrift] = useState({ x: 0, y: 0, z: 0 });
  const rafRef = useRef<number>(0);
  const t0 = useRef(0);

  useEffect(() => {
    t0.current = performance.now();
    const timer = setTimeout(() => setSettled(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Sinusoidal idle float after settle
  useEffect(() => {
    if (!settled) return;
    const tick = (now: number) => {
      const t = (now - t0.current) / 1000;
      setDrift({
        x: Math.sin(t * 0.35) * 5,
        y: Math.sin(t * 0.28) * 4 + Math.cos(t * 0.5) * 2,
        z: Math.sin(t * 0.22) * 8, // subtle z-bob adds depth feel
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [settled]);

  // 3D rotation driven by tilt — clamp to ±20°
  const rotX = Math.max(-20, Math.min(20, -tilt.y * 0.55));
  const rotY = Math.max(-20, Math.min(20, tilt.x * 0.55));

  return (
    // Perspective container — this is what creates the 3D depth
    <div
      style={{
        perspective: "800px",
        perspectiveOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      }}
    >
      {/* The name group — rotates in 3D + idle drift */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.01em",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 10vw, 10rem)",
          lineHeight: 0.9,
          letterSpacing: "0.06em",
          transformStyle: "preserve-3d",
          transform: settled
            ? `translate(${drift.x}px, ${drift.y}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
            : "rotateX(0deg) rotateY(0deg)",
          transition: settled
            ? "transform 0.12s cubic-bezier(0.23,1,0.32,1), opacity 0.5s ease"
            : "none",
          opacity: faded ? 0 : 1,
          willChange: "transform",
        }}
      >
        {LETTERS.map((letter, i) => {
          const s = scatters[i];
          const delay = i * 60;
          // Each letter at a slightly different Z depth — creates parallax within the word
          const letterZ = (i - 2.5) * 6;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                position: "relative",
                // Settled: rest at depth + tilt-driven 3D; unsettled: scattered
                transform: settled
                  ? `translateZ(${letterZ + drift.z}px)`
                  : `translate(${s.x}px, ${s.y}px) rotateZ(${s.rz}deg) rotateY(${s.ry}deg) scale(${s.scale})`,
                opacity: settled ? 1 : 0,
                transition: settled
                  ? `transform ${500 + delay}ms cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms,
                     opacity 250ms ease ${delay}ms`
                  : "none",
                // 3D text — foreground fill + layered text-shadow for depth extrusion
                color: "transparent",
                backgroundImage:
                  "linear-gradient(170deg, #ffffff 0%, #d4d4d4 40%, #a8a8a8 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                // Multi-layer text-shadow = 3D extrusion effect
                textShadow: `
                  1px 1px 0px rgba(255,255,255,0.15),
                  2px 2px 0px rgba(200,200,200,0.12),
                  3px 3px 0px rgba(150,150,150,0.10),
                  4px 4px 0px rgba(100,100,100,0.08),
                  5px 5px 0px rgba(80,80,80,0.06),
                  6px 6px 0px rgba(60,60,60,0.05),
                  8px 8px 20px rgba(0,0,0,0.6),
                  0px 20px 60px rgba(0,0,0,0.4)
                `,
                filter: settled ? "none" : "blur(8px)",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Ground shadow — moves opposite to tilt for realism */}
      {settled && (
        <div
          style={{
            position: "absolute",
            bottom: "-18px",
            left: "50%",
            width: "90%",
            height: "20px",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)",
            transform: `translateX(-50%) translateX(${-rotY * 1.5}px) scaleX(${
              1 - Math.abs(rotY) * 0.01
            })`,
            transition: "transform 0.12s ease",
            filter: "blur(6px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}
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
    setTimeout(() => setEntered(true), 80);
  }, []);

  // Unified tilt — mouse on desktop, gyroscope on mobile
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", onMouse);

    const onOrientation = (e: DeviceOrientationEvent) => {
      const x = Math.max(-25, Math.min(25, (e.gamma ?? 0) * 0.7));
      const y = Math.max(-25, Math.min(25, ((e.beta ?? 0) - 20) * 0.55));
      setTilt({ x, y });
    };
    window.addEventListener("deviceorientation", onOrientation);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  const mouse = { x: tilt.x * 0.67, y: tilt.y * 0.67 };

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoad} />}

      {loaded && (
        <div className="h-screen w-screen flex relative overflow-hidden bg-black">
          {/* Center divider */}
          <div
            className="absolute top-0 left-1/2 w-[1px] h-full z-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
              transition: "opacity 0.5s ease",
              opacity: hoveredTrack === "none" ? 1 : 0.2,
            }}
          />

          {/* ── 3D Name — always on top, never fades to invisible ── */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none text-center select-none"
            style={{
              // Lift above the track cards entirely
              isolation: "isolate",
            }}
          >
            {entered && (
              <>
                <FloatingName
                  tilt={tilt}
                  faded={false} // never fully hide — always shows
                />

                {/* Subtitle — slides under the name, fades when hovering */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.32em",
                    color:
                      hoveredTrack === "none"
                        ? "rgba(255,255,255,0.35)"
                        : "rgba(255,255,255,0.08)",
                    marginTop: 22,
                    transition: "color 0.4s ease, transform 0.12s ease",
                    transform: `translate(${tilt.x * 0.18}px, ${tilt.y * 0.18}px)`,
                    textShadow: "0 2px 12px rgba(0,0,0,0.8)",
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
            {/* Background grid */}
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
