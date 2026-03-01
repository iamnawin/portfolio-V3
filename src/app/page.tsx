"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, LayoutGroup } from "framer-motion";

// ─── Profile data for each side ───────────────────────────
const SIDES = {
  pro: {
    id: "pro",
    label: "PROFESSIONAL",
    name: "NAVEEN",
    title: "AI Solutions Architect",
    subtitle: "Solution Design · Business Analysis · FDE",
    tags: ["Solution Design", "Business Analysis", "FDE"],
    desc: "I turn business problems into scalable solutions — AI, Salesforce, and enterprise delivery.",
    enter: "/professional",
    enterLabel: "VIEW PROFESSIONAL PROFILE",
    flipLabel: "SEE CREATIVE SIDE",
    accent: "#3b82f6",
    accentSoft: "rgba(59,130,246,",
    bg: "#060d1a",
    cardBg: "rgba(11,17,32,0.95)",
    avatarBg: "linear-gradient(135deg, #1e3a5f 0%, #0b1120 100%)",
    avatarAccent: "#3b82f6",
    photo: "/naveen-pro.jpg?v=2",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="16" width="32" height="24" rx="4" stroke="#60a5fa" strokeWidth="2" fill="none"/>
        <rect x="16" y="10" width="16" height="8" rx="2" stroke="#60a5fa" strokeWidth="2" fill="none"/>
        <line x1="8" y1="26" x2="40" y2="26" stroke="#60a5fa" strokeWidth="2"/>
        <circle cx="24" cy="26" r="3" fill="#3b82f6"/>
      </svg>
    ),
  },
  creative: {
    id: "creative",
    label: "CREATIVE",
    name: "NAVEEN",
    title: "AI Cinematic Enthusiast",
    subtitle: "Storyteller · Founder @AIWITHNOBRAIN · @ZeroOrigins",
    tags: ["AI Content", "AI Music", "AI Ads"],
    desc: "I craft AI-powered stories and cinematic worlds — where mythology meets machine intelligence.",
    enter: "/creator",
    enterLabel: "VIEW CREATIVE PROFILE",
    flipLabel: "SEE PROFESSIONAL SIDE",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,",
    bg: "#110900",
    cardBg: "rgba(20,12,0,0.95)",
    avatarBg: "linear-gradient(135deg, #3d1f00 0%, #110900 100%)",
    avatarAccent: "#f59e0b",
    photo: "/naveen-creative.jpg",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="14" width="30" height="20" rx="4" stroke="#f59e0b" strokeWidth="2" fill="none"/>
        <path d="M34 20l10-6v20l-10-6V20z" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <circle cx="19" cy="24" r="5" stroke="#f59e0b" strokeWidth="2" fill="none"/>
        <circle cx="19" cy="24" r="2" fill="#f59e0b"/>
      </svg>
    ),
  },
};

// ─── Floating particle ────────────────────────────────────
function Particle({ accent }: { accent: string }) {
  const style = {
    position: "absolute" as const,
    width: Math.random() * 3 + 1 + "px",
    height: Math.random() * 3 + 1 + "px",
    borderRadius: "50%",
    background: accent,
    opacity: Math.random() * 0.4 + 0.1,
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    animation: `float-particle ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 4}s infinite`,
  };
  return <div style={style} />;
}

// ─── Avatar ────────────────────────────────────────────────
function Avatar({ side, size = 140 }: { side: typeof SIDES.pro; size?: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: side.avatarBg,
        border: `2px solid ${side.accentSoft}0.2)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
        overflow: "hidden",
        boxShadow: `0 0 40px ${side.accentSoft}0.15), inset 0 0 30px ${side.accentSoft}0.05)`,
      }}
    >
      {/* Outer ring */}
      <div style={{
        position: "absolute", inset: -6, borderRadius: "50%",
        border: `1px solid ${side.accentSoft}0.15)`,
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Inner ring */}
      <div style={{
        position: "absolute", inset: -12, borderRadius: "50%",
        border: `1px solid ${side.accentSoft}0.07)`,
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Photo or icon fallback */}
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={side.photo}
          alt={`Naveen - ${side.label}`}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
            borderRadius: "50%",
          }}
        />
      ) : (
        side.icon
      )}
    </div>
  );
}

// ─── Flip sound via MP3 ────────────────────────
function playFlipSound() {
  try {
    const audio = new Audio("/comedy_pop_finger_in_mouth_001.mp3");
    audio.volume = 0.6;
    audio.play().catch(() => { /* silent fail if blocked */ });
  } catch { /* silent fail */ }
}

// ─── The flip card ────────────────────────────────────────
export default function HomeV2() {
  const [flipped, setFlipped] = useState(false);
  const [bgReady, setBgReady] = useState(false);
  const [sparks, setSparks] = useState<number[]>([]);

  const current = flipped ? SIDES.creative : SIDES.pro;

  useEffect(() => {
    setBgReady(true);
  }, []);

  const handleFlip = () => {
    playFlipSound();
    const id = Date.now();
    setSparks(prev => [...prev, id]);
    setTimeout(() => setSparks(prev => prev.filter(s => s !== id)), 700);
    setFlipped(f => !f);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: flipped ? SIDES.creative.bg : SIDES.pro.bg,
        transition: "background 0.9s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Ambient particles */}
      {bgReady && Array.from({ length: 18 }).map((_, i) => (
        <Particle key={i} accent={current.accent} />
      ))}

      {/* Large ambient glow behind card */}
      <div style={{
        position: "absolute",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${current.accentSoft}0.08) 0%, transparent 70%)`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        transition: "background 0.9s ease",
        pointerEvents: "none",
      }} />


      {/* ── The 3D flip card container with float ── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 10 }}
      >
        {/* Spark burst — fires from toggle area on flip */}
        {sparks.map(id => (
          <div key={id} style={{ position: "absolute", top: "11%", left: "50%", pointerEvents: "none", zIndex: 30 }}>
            {[0,1,2,3,4,5].map(i => {
              const angle = (i * 60 - 15) * (Math.PI / 180);
              const dist = 28 + (i % 2) * 16;
              return (
                <div key={i} style={{
                  position: "absolute",
                  width: i % 2 === 0 ? 3 : 2,
                  height: i % 2 === 0 ? 3 : 2,
                  borderRadius: "50%",
                  background: current.accent,
                  top: "50%", left: "50%",
                  ["--spark-tx" as string]: `${Math.cos(angle) * dist}px`,
                  ["--spark-ty" as string]: `${Math.sin(angle) * dist}px`,
                  animation: `spark-burst 0.55s ease-out ${i * 0.04}s forwards`,
                }} />
              );
            })}
          </div>
        ))}

        {/* Pulsing glow halo behind the card */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.97, 1.02, 0.97] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: 26,
            background: `radial-gradient(ellipse at 50% 0%, ${current.accentSoft}0.18) 0%, transparent 70%)`,
            filter: "blur(12px)",
            pointerEvents: "none",
            transition: "background 0.9s ease",
          }}
        />
        <div style={{ perspective: "1000px", width: "100%" }}>
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 16,
              mass: 0.9,
            }}
          >
            {/* ── FRONT: Professional ── */}
            <CardFace side={SIDES.pro} onFlip={handleFlip} hidden={false} flipped={flipped} />

            {/* ── BACK: Creative ── */}
            <CardFace side={SIDES.creative} onFlip={handleFlip} hidden={true} flipped={flipped} />
          </motion.div>
        </div>
      </motion.div>

      {/* Side indicator dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 28, position: "relative", zIndex: 10 }}>
        {[false, true].map((isCreative) => (
          <button
            key={String(isCreative)}
            onClick={() => { if (flipped !== isCreative) handleFlip(); }}
            style={{
              width: flipped === isCreative ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: flipped === isCreative ? current.accent : "rgba(255,255,255,0.15)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Wordmark */}
      <p style={{
        position: "relative", zIndex: 10,
        marginTop: 16,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.4em",
        color: `${current.accentSoft}0.3)`,
        transition: "color 0.9s ease",
        whiteSpace: "nowrap",
      }}>
        NAVEEN TATIKAYALA
      </p>

      {/* Keyframes */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
          66% { transform: translateY(-10px) translateX(-8px); opacity: 0.2; }
        }
        @keyframes shimmer-sweep {
          0%   { transform: rotate(15deg) translateX(-120%); opacity: 0; }
          10%  { opacity: 1; }
          60%  { opacity: 1; }
          100% { transform: rotate(15deg) translateX(350%); opacity: 0; }
        }
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 20px rgba(255,255,255,0.03); }
          50%       { box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.14), 0 0 40px rgba(255,255,255,0.06); }
        }
        @keyframes spark-burst {
          0%   { transform: translate(-50%, -50%) translateX(0px) translateY(0px); opacity: 1; }
          60%  { opacity: 0.5; }
          100% { transform: translate(-50%, -50%) translateX(var(--spark-tx)) translateY(var(--spark-ty)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Toggle switch — single sliding pill (fixed 176px track) ────
// W=176, H=34, PAD=3 → pill: width=82 (=W/2-PAD*2), height=28 (=H-PAD*2)
// PRO:      pill left = PAD = 3          → spans [3 … 85]
// CREATIVE: pill left = W/2+PAD = 91     → spans [91 … 173]  (right inset = 3 ✓)
// CREATIVE label centered in right half [88…176] → "C" ≈ 106px → 15px amber before "C" ✓
function ToggleSwitch({
  pillOnCreative,
  onFlip,
}: {
  pillOnCreative: boolean;
  sideId: string; // kept for API compat
  onFlip: () => void;
}) {
  const dragStartX = useRef<number | null>(null);

  const handlePointerDown = (e: { pointerId: number; clientX: number; currentTarget: HTMLDivElement }) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
  };
  const handlePointerUp = (e: { clientX: number }) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 8) {
      onFlip();
    } else if (delta > 10 && !pillOnCreative) {
      onFlip();
    } else if (delta < -10 && pillOnCreative) {
      onFlip();
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{
        position: "relative",
        width: 176,
        height: 34,
        background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 100%)",
        borderRadius: 34,
        marginBottom: 6,
        zIndex: 1,
        cursor: "pointer",
        userSelect: "none" as const,
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06)",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      {/* Single pill that slides left ↔ right */}
      <motion.div
        animate={{ x: pillOnCreative ? 88 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: 82,
          height: 28,
          borderRadius: 28,
          background: pillOnCreative
            ? "linear-gradient(180deg, #fcd34d 0%, #f59e0b 100%)"
            : "linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.18)",
        }}
      />

      {/* Labels — absolutely overlay the full track */}
      <div style={{
        position: "absolute", inset: 0,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        pointerEvents: "none",
        zIndex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em",
            color: !pillOnCreative ? "#fff" : "rgba(148,163,184,0.35)",
            fontWeight: !pillOnCreative ? 600 : 400,
            textShadow: !pillOnCreative ? "0 1px 2px rgba(0,0,0,0.6)" : "none",
            transition: "color 0.3s ease",
          }}>PRO</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em",
            color: pillOnCreative ? "#fff" : "rgba(148,163,184,0.35)",
            fontWeight: pillOnCreative ? 600 : 400,
            textShadow: pillOnCreative ? "0 1px 2px rgba(0,0,0,0.6)" : "none",
            transition: "color 0.3s ease",
          }}>CREATIVE</span>
        </div>
      </div>
    </div>
  );
}

// ─── Single card face ─────────────────────────────────────
function CardFace({
  side,
  onFlip,
  hidden,
  flipped,
}: {
  side: typeof SIDES.pro;
  onFlip: () => void;
  hidden: boolean;
  flipped: boolean;
}) {
  const isCreative = side.id === "creative";
  // pill position: creative side always shows creative, pro side slides based on flipped state
  const pillOnCreative = isCreative ? true : flipped;
  return (
    <div
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: hidden ? "rotateY(180deg)" : "rotateY(0deg)",
        position: hidden ? "absolute" : "relative",
        top: 0, left: 0, width: "100%",
        background: side.cardBg,
        border: `1px solid ${side.accentSoft}0.12)`,
        borderRadius: 24,
        padding: "28px 32px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${side.accentSoft}0.12)`,
        animation: "border-glow 4s ease-in-out infinite",
      }}
    >
      {/* Shimmer sweep overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: 24, overflow: "hidden", pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{
          position: "absolute",
          top: "-80%", left: "-60%",
          width: "40%", height: "260%",
          background: `linear-gradient(105deg, transparent 30%, ${side.accentSoft}0.07) 50%, transparent 70%)`,
          transform: "rotate(15deg)",
          animation: "shimmer-sweep 6s ease-in-out infinite",
        }} />
      </div>

      {/* ── Toggle switch — single sliding pill ── */}
      <ToggleSwitch
        pillOnCreative={pillOnCreative}
        sideId={side.id}
        onFlip={onFlip}
      />

      {/* Hint */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: 8,
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.18)",
        textAlign: "center",
        marginBottom: 18,
        marginTop: 0,
        position: "relative",
        zIndex: 1,
      }}>↔ SLIDE OR TAP</p>

      {/* Avatar */}
      <Avatar side={side} size={130} />

      {/* Name */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.8rem, 8vw, 3.8rem)",
        color: "#f1f5f9",
        letterSpacing: "0.06em",
        lineHeight: 1,
        marginTop: 22,
        marginBottom: 4,
      }}>
        {side.name}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: 16,
        color: side.accent,
        fontWeight: 500,
        marginBottom: 4,
        textAlign: "center",
      }}>
        {side.title}
      </div>

      {/* Subtitle */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "rgba(148,163,184,0.45)",
        marginBottom: 20,
        textAlign: "center",
      }}>
        {side.subtitle}
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: `${side.accentSoft}0.08)`, marginBottom: 20 }} />

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 18 }}>
        {side.tags.map(t => (
          <span key={t} style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
            color: `${side.accentSoft}0.7)`,
            background: `${side.accentSoft}0.06)`,
            border: `1px solid ${side.accentSoft}0.15)`,
            borderRadius: 50, padding: "4px 12px",
          }}>{t}</span>
        ))}
      </div>

      {/* Desc */}
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: 13,
        lineHeight: 1.7,
        color: "rgba(148,163,184,0.55)",
        textAlign: "center",
        marginBottom: 26,
        maxWidth: 300,
      }}>
        {side.desc}
      </p>

      {/* ENTER button */}
      <Link
        href={side.enter}
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "#fff",
          background: side.accent,
          borderRadius: 50,
          padding: "14px 24px",
          textDecoration: "none",
          transition: "all 0.3s ease",
          marginBottom: 12,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${side.accentSoft}0.35)`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "none";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
        }}
      >
        {side.enterLabel} →
      </Link>

    </div>
  );
}
