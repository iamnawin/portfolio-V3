"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
          backgroundColor: "#3b82f6",
          animation: "blink 0.8s step-end infinite",
        }}
      />
    </span>
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5"
      style={{
        background: scrolled ? "rgba(11,17,32,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(59,130,246,0.08)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          color: "#3b82f6",
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
      >
        ← NAVEEN
      </Link>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-9">
          {["about", "experience", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="hover:text-blue-400 transition-colors duration-300"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "rgba(148,163,184,0.6)",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {s}
            </a>
          ))}
        </div>
        {/* Social icons */}
        <div className="flex items-center gap-4" style={{ borderLeft: "1px solid rgba(59,130,246,0.12)", paddingLeft: 24 }}>
          <a
            href="https://www.linkedin.com/in/naveen-tatikayala/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "rgba(148,163,184,0.5)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/iamnawin"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "rgba(148,163,184,0.5)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Chat-style Hero ────────────────────────────────────────
const QUICK_RESPONSES: Record<string, { label: string; icon: string; answer: string; href: string }> = {
  about: {
    label: "About",
    icon: "◎",
    href: "#about",
    answer: "6+ years designing enterprise systems — started deep in Salesforce CRM, then expanded into AI-driven automation and intelligent application architecture. I don't just ship features, I design the whole system around them.",
  },
  experience: {
    label: "Experience",
    icon: "◈",
    href: "#experience",
    answer: "Worked across fintech, logistics, and SaaS companies as an Application Designer & Salesforce Architect. Led teams building automation pipelines, custom CRM platforms, and AI-augmented workflows at scale.",
  },
  skills: {
    label: "Skills",
    icon: "◆",
    href: "#skills",
    answer: "Salesforce (8 certs) · n8n & Zapier automation · AI/LLM integration · React & Next.js · System architecture · API design · Enterprise application design.",
  },
  projects: {
    label: "Projects",
    icon: "◉",
    href: "#projects",
    answer: "13+ enterprise projects delivered — from custom Salesforce orgs to full AI automation stacks. Currently building AI-first tools that replace manual ops workflows with intelligent pipelines.",
  },
  contact: {
    label: "Contact",
    icon: "◇",
    href: "#contact",
    answer: "Best reached at t_naveen@outlook.in — or connect on LinkedIn. Open to senior roles, consulting, and interesting AI architecture problems.",
  },
};

function Hero() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const handlePill = useCallback((key: string) => {
    // Clear any running typer
    if (typingRef.current) clearTimeout(typingRef.current);
    setActiveKey(key);
    setDisplayed("");
    setIsTyping(true);

    const full = QUICK_RESPONSES[key].answer;
    let i = 0;
    const type = () => {
      i++;
      setDisplayed(full.slice(0, i));
      if (i < full.length) {
        typingRef.current = setTimeout(type, 14);
      } else {
        setIsTyping(false);
      }
    };
    typingRef.current = setTimeout(type, 120); // small initial delay
  }, []);

  useEffect(() => () => { if (typingRef.current) clearTimeout(typingRef.current); }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 md:px-10"
      style={{ background: "#0b1120" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", top: "10%", right: "-15%" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)", bottom: "5%", left: "-5%" }} />

      {/* ── Top: name + title ── */}
      <div className="relative z-10 text-center mb-10 animate-fade-up">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "rgba(96,165,250,0.5)", marginBottom: 14 }}>
          HELLO, I&apos;M
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            lineHeight: 0.9,
            color: "#f1f5f9",
            letterSpacing: "0.03em",
          }}
        >
          NAVEEN
        </h1>
        <div className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "#60a5fa", minHeight: 26 }}>
          <TypedText texts={["Intelligent Systems Designer", "AI Application Architect", "Enterprise Solutions Engineer", "Salesforce Platform Expert"]} />
        </div>
      </div>

      {/* ── Chat card ── */}
      <div
        className="relative z-10 w-full max-w-2xl animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Response bubble — appears when a pill is tapped */}
        <div
          style={{
            minHeight: 90,
            marginBottom: 16,
            padding: "20px 24px",
            borderRadius: 18,
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.12)",
            transition: "all 0.3s ease",
            opacity: activeKey ? 1 : 0.4,
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            {/* Avatar dot */}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#fff" }}>N</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "rgba(96,165,250,0.6)" }}>
              NAVEEN · AI APPLICATION DESIGNER
            </span>
            {isTyping && (
              <span style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: `bounce 1s ease ${i*0.15}s infinite` }} />
                ))}
              </span>
            )}
          </div>

          {/* Answer text */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: activeKey ? "rgba(241,245,249,0.85)" : "rgba(148,163,184,0.4)", margin: 0 }}>
            {activeKey
              ? displayed || <>&nbsp;</>
              : "Click any button below to learn about me →"}
          </p>

          {/* Scroll to section link */}
          {activeKey && !isTyping && (
            <a
              href={QUICK_RESPONSES[activeKey].href}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "#3b82f6", textDecoration: "none", opacity: 0.8 }}
            >
              VIEW FULL SECTION ↓
            </a>
          )}
        </div>

        {/* Quick-tap pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {Object.entries(QUICK_RESPONSES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handlePill(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 20px",
                borderRadius: 50,
                border: activeKey === key
                  ? "1px solid rgba(59,130,246,0.6)"
                  : "1px solid rgba(59,130,246,0.15)",
                background: activeKey === key
                  ? "rgba(59,130,246,0.12)"
                  : "rgba(59,130,246,0.04)",
                color: activeKey === key ? "#60a5fa" : "rgba(148,163,184,0.6)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: activeKey === key ? "0 0 20px rgba(59,130,246,0.15)" : "none",
              }}
            >
              <span style={{ fontSize: 13, opacity: 0.7 }}>{val.icon}</span>
              {val.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bounce dots keyframe */}
      <style>{`
        @keyframes bounce {
          0%,80%,100% { transform:translateY(0); opacity:0.4; }
          40% { transform:translateY(-5px); opacity:1; }
        }
      `}</style>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      className="py-32 px-10 md:px-20 relative"
      style={{ background: "#0a0f1e" }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#3b82f6",
            marginBottom: 20,
          }}
        >
          ABOUT
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#f1f5f9",
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          Not Just a Developer.
          <br />
          <span style={{ color: "#3b82f6" }}>A Solutions Architect.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.9,
                color: "rgba(148,163,184,0.7)",
                marginBottom: 20,
              }}
            >
              I don&apos;t just write code — I design the system around it. 
              With deep expertise in Salesforce CRM, enterprise automation, 
              and AI-augmented workflows, I build applications that solve 
              real business problems at scale.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.9,
                color: "rgba(148,163,184,0.7)",
              }}
            >
              My approach combines business analysis, platform architecture,
              and intelligent automation to create systems that are not just
              functional — but thoughtfully designed for the humans who use
              them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { num: "6+", label: "Years Experience" },
              { num: "13+", label: "Projects Delivered" },
              { num: "8", label: "Platform Certifications" },
              { num: "∞", label: "Problems to Solve" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(59,130,246,0.03)",
                  border: "1px solid rgba(59,130,246,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 40,
                    color: "#3b82f6",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "rgba(148,163,184,0.5)",
                    letterSpacing: "0.1em",
                    marginTop: 8,
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

// ── Experience ─────────────────────────────────────────────
function Experience() {
  const jobs = [
    {
      role: "Technical Business Analyst & Solutions Architect",
      company: "Current Position",
      period: "Present",
      desc: "Designing and architecting enterprise applications with Business workflows. Leading system integrations across Salesforce, automation platforms, and custom solutions.",
      tech: ["Salesforce", "ServiceNOW", "CoPilot", "Integration", "AI Automation"],
    },
    {
      role: "Senior Salesforce Developer",
      company: "Enterprise Client",
      period: "2023 — 2024",
      desc: "Built complex Lightning Web Components, Apex solutions, and automated business processes. Managed incident workflows and case management systems.",
      tech: ["Apex", "LWC", "Flows", "REST API", "Platform Events"],
    },
    {
      role: "Salesforce Developer",
      company: "Technology Firm",
      period: "2019 — 2023",
      desc: "Full-cycle Salesforce development from requirements to deployment. ChatBots, Created custom objects, triggers, batch processes, and Lightning components.",
      tech: ["Apex", "Visualforce", "SOQL", "Chat Agents", "Admin"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-32 px-10 md:px-20 relative"
      style={{ background: "#0b1120" }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#3b82f6",
            marginBottom: 20,
          }}
        >
          EXPERIENCE
        </div>
        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#f1f5f9",
            lineHeight: 1.1,
          }}
        >
          Where I&apos;ve Built
        </h2>

        <div className="space-y-0">
          {jobs.map((j, i) => (
            <div
              key={i}
              className="group relative pl-8 pb-16 border-l transition-all duration-500"
              style={{ borderColor: "rgba(59,130,246,0.1)" }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[5px] top-1 w-[10px] h-[10px] rounded-full transition-all duration-300"
                style={{
                  background: "#3b82f6",
                  boxShadow: "0 0 0 4px rgba(59,130,246,0.15)",
                }}
              />

              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 20,
                      fontWeight: 500,
                      color: "#f1f5f9",
                    }}
                  >
                    {j.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#3b82f6",
                      marginTop: 4,
                    }}
                  >
                    {j.company}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "rgba(148,163,184,0.4)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {j.period}
                </div>
              </div>

              <p
                className="mb-5 max-w-2xl"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "rgba(148,163,184,0.6)",
                }}
              >
                {j.desc}
              </p>

              <div className="flex gap-2 flex-wrap">
                {j.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-[10px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                      border: "1px solid rgba(59,130,246,0.15)",
                      color: "rgba(96,165,250,0.6)",
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

// ── Skills ─────────────────────────────────────────────────
function Skills() {
  const skillGroups = [
    {
      title: "Platform & CRM",
      items: [
        "Salesforce (Sales, Service, Experience Cloud)",
        "Apex & Lightning Web Components",
        "Flows & Process Automation",
        "Platform Events & CDC",
        "SOQL / SOSL",
      ],
    },
    {
      title: "Architecture & Integration",
      items: [
        "REST / SOAP API Design",
        "Middleware & ETL Pipelines",
        "System Integration Patterns",
        "Data Modeling & Migration",
        "CI/CD & DevOps (Git, SFDX)",
      ],
    },
    {
      title: "AI & Automation",
      items: [
        "n8n Workflow Automation",
        "AI Agent Orchestration",
        "Prompt Engineering",
        "Intelligent Document Processing",
        "RAG Concepts & Implementation",
        "Custom AI Integrations",
      ],
    },
    {
      title: "Frontend & General",
      items: [
        "React / Next.js",
        "TypeScript / JavaScript",
        "HTML / CSS / Tailwind",
        "React Native (Mobile)",
        "Node.js",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-32 px-10 md:px-20 relative"
      style={{ background: "#0a0f1e" }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#3b82f6",
            marginBottom: 20,
          }}
        >
          SKILLS
        </div>
        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#f1f5f9",
            lineHeight: 1.1,
          }}
        >
          Tools & Technologies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((g) => (
            <div
              key={g.title}
              className="p-6 rounded-xl transition-all duration-300 hover:border-blue-500/20"
              style={{
                background: "rgba(59,130,246,0.02)",
                border: "1px solid rgba(59,130,246,0.06)",
              }}
            >
              <h3
                className="mb-5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "#60a5fa",
                }}
              >
                {g.title}
              </h3>
              <ul className="space-y-3">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(148,163,184,0.7)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "rgba(59,130,246,0.4)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: "Enterprise Incident Management System",
      desc: "End-to-end incident tracking with custom LWC dashboards, automated escalation flows, and real-time notification system via Platform Events.",
      tech: ["Apex", "LWC", "Platform Events", "Flows"],
      color: "#3b82f6",
    },
    {
      title: "Multi-Cloud Integration Hub",
      desc: "Middleware architecture connecting Salesforce with ERP, billing, and analytics platforms. REST API orchestration with error handling and retry logic.",
      tech: ["REST API", "Apex", "Integration", "Middleware"],
      color: "#6366f1",
    },
    {
      title: "Automated Case Management",
      desc: "Intelligent case routing and alert system with custom Lightning components. Reduced resolution time by 40% through smart assignment rules.",
      tech: ["LWC", "Flows", "Apex", "Case Management"],
      color: "#8b5cf6",
    },
    {
      title: "Customer ChatBot Agents",
      desc: "automation platform integrating AI agents for document processing, lead scoring, and intelligent data enrichment.",
      tech: ["n8n", "AI Agents", "Automation", "Integration"],
      color: "#a855f7",
    },
    {
      title: "Loan Lifecycle Management",
      desc: "Unified data model across Sales, Service, and Marketing clouds. Custom objects, relationships, and roll-up summaries for complete customer visibility.",
      tech: ["Data Model", "SOQL", "Admin", "Reports"],
      color: "#6366f1",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 px-10 md:px-20 relative"
      style={{ background: "#0b1120" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#3b82f6",
            marginBottom: 20,
          }}
        >
          PROJECTS
        </div>
        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#f1f5f9",
            lineHeight: 1.1,
          }}
        >
          Selected Work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group p-7 rounded-xl cursor-pointer transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(59,130,246,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  `${p.color}33`;
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 8px 40px ${p.color}11`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(59,130,246,0.06)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Project number */}
              <div
                className="mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  color: `${p.color}22`,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#f1f5f9",
                  lineHeight: 1.3,
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
                  color: "rgba(148,163,184,0.5)",
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
                      border: `1px solid ${p.color}22`,
                      color: `${p.color}88`,
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

// ── Contact ────────────────────────────────────────────────
function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-10 md:px-20 relative"
      style={{
        background: "#0a0f1e",
        borderTop: "1px solid rgba(59,130,246,0.06)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#3b82f6",
            marginBottom: 20,
          }}
        >
          CONTACT
        </div>

        <h2
          className="mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "#f1f5f9",
            lineHeight: 1.05,
          }}
        >
          LET&apos;S BUILD
          <br />
          <span style={{ color: "#3b82f6" }}>SOMETHING SOLID</span>
        </h2>

        <p
          className="mb-10 max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(148,163,184,0.6)",
          }}
        >
          Looking for an Application Designer who thinks in systems, not just
          screens? Let&apos;s talk.
        </p>

        <a
          href="mailto:t_naveen@outlook.in"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.15em",
            background: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          GET IN TOUCH →
        </a>

        {/* visible email */}
        <p
          style={{
            marginTop: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "rgba(148,163,184,0.45)",
          }}
        >
          t_naveen@outlook.in
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <a
            href="https://www.linkedin.com/in/naveen-tatikayala/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "rgba(148,163,184,0.5)",
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: 50,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.12)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LINKEDIN
          </a>
          <a
            href="https://github.com/iamnawin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "rgba(148,163,184,0.5)",
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: 50,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.12)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GITHUB
          </a>
        </div>

        {/* Footer */}
        <div
          className="mt-32 pt-8 flex justify-between items-center"
          style={{ borderTop: "1px solid rgba(59,130,246,0.06)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(148,163,184,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            © 2025 NAVEEN
          </span>

          <Link
            href="/creator"
            className="transition-colors duration-300 hover:text-amber-400"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(148,163,184,0.3)",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            VIEW CREATOR SIDE →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function ProfessionalPage() {
  return (
    <main style={{ background: "#0b1120" }}>
      <CursorThemeSetter />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
