"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
    { icon: "YT", label: "YouTube" },
    { icon: "IG", label: "Instagram" },
    { icon: "X", label: "Twitter" },
    { icon: "GH", label: "GitHub" },
  ];
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-50">
      {links.map((l) => (
        <a
          key={l.label}
          href="#"
          title={l.label}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: "1px solid rgba(245,158,11,0.2)",
            color: "rgba(245,158,11,0.5)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textDecoration: "none",
            background: "rgba(245,158,11,0.03)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f59e0b";
            e.currentTarget.style.color = "#fbbf24";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(245,158,11,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)";
            e.currentTarget.style.color = "rgba(245,158,11,0.5)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {l.icon}
        </a>
      ))}
      <div
        className="w-[1px] h-14 mx-auto"
        style={{
          background: "linear-gradient(to bottom, rgba(245,158,11,0.25), transparent)",
        }}
      />
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-5"
      style={{
        background: scrolled ? "rgba(10,6,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(245,158,11,0.06)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          color: "#f59e0b",
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
      >
        ← NAVEEN
      </Link>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(168,137,107,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        AIWITHNOBRAIN
      </div>
      <div className="flex gap-9">
        {["story", "projects", "studio", "connect"].map((s) => (
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
    </nav>
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
      {/* Multi-color ambient blobs */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 60%)",
          top: "10%",
          left: "20%",
          transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)`,
          transition: "transform 0.4s ease",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 60%)",
          bottom: "5%",
          right: "10%",
          transform: `translate(${mouse.x * -0.2}px, ${mouse.y * -0.2}px)`,
          transition: "transform 0.4s ease",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)",
          top: "50%",
          right: "30%",
          transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.15}px)`,
          transition: "transform 0.4s ease",
        }}
      />

      {/* Center Orb */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mouse.x * 0.08}px), calc(-50% + ${mouse.y * 0.08}px))`,
          transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <div
          className="w-48 h-48 rounded-full relative"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #ffd080, #d4a040 40%, #8b5e1a 80%, #3d2600)",
            boxShadow: `
              0 0 80px rgba(245,158,11,0.35),
              0 0 160px rgba(239,68,68,0.15),
              inset 0 -20px 40px rgba(0,0,0,0.4),
              inset 0 10px 30px rgba(255,220,150,0.3)
            `,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            style={{
              fontSize: 52,
              color: "rgba(255,240,200,0.65)",
              fontFamily: "serif",
              textShadow: "0 0 30px rgba(255,200,100,0.5)",
            }}
          >
            ॐ
          </div>
        </div>
        {/* Ring */}
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 -mt-36 -ml-36 rounded-full"
          style={{
            border: "1px solid rgba(245,158,11,0.1)",
            animation: "spin 25s linear infinite",
          }}
        >
          <div
            className="absolute -top-1 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: "#f59e0b",
              boxShadow: "0 0 12px #f59e0b",
            }}
          />
        </div>
      </div>

      {/* Left text */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2 z-10">
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
      </div>

      {/* Right text */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 text-right z-10">
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
      </div>

      {/* Background watermark */}
      <div
        className="absolute -bottom-5 left-0 w-full text-center select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 12vw, 12rem)",
          color: "rgba(245,158,11,0.02)",
          letterSpacing: "0.05em",
        }}
      >
        ZERO ORIGINS
      </div>
    </section>
  );
}

// ── Story ──────────────────────────────────────────────────
function Story() {
  return (
    <section
      id="story"
      className="py-32 px-10 md:px-20 relative overflow-hidden"
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
          Where Ancient Epics
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Meet AI Cinema
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
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
              Through{" "}
              <span style={{ color: "#f59e0b" }}>AIwithNoBrain</span> and{" "}
              <span style={{ color: "#ef4444" }}>ZeroOrigins</span>, I&apos;m
              producing &quot;AI Ramayanam: War of Dharma&quot; — a 27-episode
              cinematic series that brings Hindu mythology to life using
              AI-generated visuals with Spielbergian production values.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.9,
                color: "rgba(254,243,199,0.5)",
              }}
            >
              Every frame is crafted with obsessive attention to cultural
              authenticity — from Sanskrit terminology to mythological
              accuracy — while pushing the boundaries of what AI can create
              in cinematic storytelling.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "27", label: "Episodes", color: "#f59e0b" },
              { num: "9:16", label: "Vertical Cinema", color: "#ef4444" },
              { num: "AI", label: "Generated Visuals", color: "#8b5cf6" },
              { num: "∞", label: "Stories Untold", color: "#f59e0b" },
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
      title: "Kala Bhairava Episode",
      tag: "FEATURED EPISODE",
      desc: "Dramatic cinematic sequence featuring Kala Bhairava and Kali Mata. Dark, powerful visuals with authentic mythological depth.",
      tech: ["AI Cinema", "VFX", "Mythology", "Storytelling"],
      gradient: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.12))",
      accent: "#f59e0b",
    },
    {
      title: "Sacred Bow — Lanka Episode",
      tag: "FEATURED EPISODE",
      desc: "Hanuman's epic journey to Lanka. Cinematic aerial sequences, divine encounters, and battle choreography — all AI-generated.",
      tech: ["AI Cinema", "Action", "Mythology", "Visual FX"],
      gradient: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(245,158,11,0.1))",
      accent: "#ef4444",
    },
    {
      title: "AI Pre-Production Studio",
      tag: "B2B SERVICES",
      desc: "Offering storyboarding, concept art, and pre-visualization services for Indian cinema. Packages from ₹15K to ₹2.5L.",
      tech: ["Storyboarding", "Concept Art", "Pre-Viz", "Cinema"],
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(239,68,68,0.08))",
      accent: "#8b5cf6",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 px-10 md:px-20 relative"
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

// ── Studio Services ────────────────────────────────────────
function Studio() {
  const tiers = [
    {
      name: "Starter",
      price: "₹15,000",
      desc: "Perfect for indie creators and small projects",
      features: [
        "5 AI-generated concept frames",
        "Basic storyboard (10 scenes)",
        "1 revision round",
        "Standard delivery (7 days)",
      ],
    },
    {
      name: "Professional",
      price: "₹75,000",
      desc: "For production houses and serious content",
      features: [
        "25 cinematic concept frames",
        "Full storyboard (40+ scenes)",
        "Character consistency guide",
        "3 revision rounds",
        "Priority delivery (5 days)",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "₹2,50,000",
      desc: "Full pre-production for feature films",
      features: [
        "100+ concept frames",
        "Complete pre-visualization",
        "Character & world bible",
        "Unlimited revisions",
        "Dedicated project manager",
        "Express delivery (3 days)",
      ],
    },
  ];

  return (
    <section
      id="studio"
      className="py-32 px-10 md:px-20 relative"
      style={{ background: "#080505" }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#8b5cf6",
            marginBottom: 20,
          }}
        >
          AI PRE-PRODUCTION STUDIO
        </div>
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "#fef3c7",
            lineHeight: 1.1,
          }}
        >
          B2B Studio Services
        </h2>
        <p
          className="mb-16 max-w-2xl"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(254,243,199,0.4)",
          }}
        >
          AI-powered pre-production for Indian cinema. From storyboards to
          cinematic concept art — everything a production house needs before
          cameras roll.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-xl transition-all duration-500 hover:-translate-y-1"
              style={{
                background: t.featured
                  ? "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(139,92,246,0.06))"
                  : "rgba(255,255,255,0.01)",
                border: t.featured
                  ? "1px solid rgba(245,158,11,0.2)"
                  : "1px solid rgba(255,255,255,0.04)",
                boxShadow: t.featured
                  ? "0 0 60px rgba(245,158,11,0.08)"
                  : "none",
              }}
            >
              {t.featured && (
                <div
                  className="mb-4 inline-block px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    background: "rgba(245,158,11,0.15)",
                    color: "#f59e0b",
                  }}
                >
                  POPULAR
                </div>
              )}
              <div
                className="mb-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "rgba(254,243,199,0.5)",
                }}
              >
                {t.name.toUpperCase()}
              </div>
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 40,
                  color: t.featured ? "#f59e0b" : "#fef3c7",
                  lineHeight: 1,
                }}
              >
                {t.price}
              </div>
              <p
                className="mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(254,243,199,0.35)",
                  lineHeight: 1.6,
                }}
              >
                {t.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(254,243,199,0.5)",
                    }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: t.featured ? "#f59e0b" : "rgba(254,243,199,0.3)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#connect"
                className="block text-center py-3 rounded-full transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  background: t.featured
                    ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                    : "transparent",
                  color: t.featured ? "#0a0606" : "rgba(254,243,199,0.5)",
                  border: t.featured ? "none" : "1px solid rgba(254,243,199,0.1)",
                }}
              >
                GET STARTED
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Connect ────────────────────────────────────────────────
function Connect() {
  return (
    <section
      id="connect"
      className="py-32 px-10 md:px-20 relative"
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
          CONNECT
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
          LET&apos;S CREATE
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SOMETHING EPIC
          </span>
        </h2>
        <p
          className="mb-10 max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(254,243,199,0.45)",
          }}
        >
          Collaboration on mythology content, AI-powered cinema
          pre-production, or just want to talk about storytelling?
        </p>
        <a
          href="mailto:aiwithnobrain@gmail.com"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.15em",
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            color: "#0a0606",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(245,158,11,0.2)",
          }}
        >
          SAY HELLO →
        </a>

        {/* Footer */}
        <div
          className="mt-32 pt-8 flex justify-between items-center"
          style={{ borderTop: "1px solid rgba(245,158,11,0.05)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(254,243,199,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            © 2025 NAVEEN • AIWITHNOBRAIN • ZEROORIGINS
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
      <Navbar />
      <SocialSidebar />
      <Hero />
      <Story />
      <Projects />
      <Studio />
      <Connect />
    </main>
  );
}
