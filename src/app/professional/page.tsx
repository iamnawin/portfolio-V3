"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import CursorThemeSetter from "@/components/CursorThemeSetter";

// ── useInView hook ──────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Animated counter ────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.3);
  const isNum = typeof target === "number";
  useEffect(() => {
    if (!inView || !isNum) return;
    let start = 0;
    const end = target as number;
    const dur = 1400;
    const step = 16;
    const inc = end / (dur / step);
    const t = setInterval(() => {
      start += inc;
      if (start >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(t);
  }, [inView, isNum, target]);
  return (
    <span ref={ref}>
      {isNum ? val : target}{suffix}
    </span>
  );
}

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
        style={{ backgroundColor: "#3b82f6", animation: "blink 0.8s step-end infinite" }}
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
      style={{
        background: scrolled ? "rgba(11,17,32,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(59,130,246,0.08)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link
        href="/"
        style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#3b82f6", letterSpacing: "0.05em", textDecoration: "none" }}
      >
        ← NAVEEN
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-9">
          {["about", "experience", "skills", "projects", "ai-projects", "certifications", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="hover:text-blue-400 transition-colors duration-300"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "rgba(148,163,184,0.6)", textDecoration: "none", textTransform: "uppercase" }}
            >
              {s}
            </a>
          ))}
        </div>
        {/* Social icons */}
        <div className="flex items-center gap-4" style={{ borderLeft: "1px solid rgba(59,130,246,0.12)", paddingLeft: 24 }}>
          <a href="https://www.linkedin.com/in/naveen-tatikayala/" target="_blank" rel="noopener noreferrer" title="LinkedIn"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "rgba(148,163,184,0.5)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/iamnawin" target="_blank" rel="noopener noreferrer" title="GitHub"
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
    answer: "Worked across fintech, logistics, and SaaS companies as a Solutions Architect & Business Analyst. Led teams designing AI-powered solutions, custom CRM platforms, and enterprise delivery at scale.",
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
    if (typingRef.current) clearTimeout(typingRef.current);
    setActiveKey(key);
    setDisplayed("");
    setIsTyping(true);
    const full = QUICK_RESPONSES[key].answer;
    let i = 0;
    const type = () => {
      i++;
      setDisplayed(full.slice(0, i));
      if (i < full.length) { typingRef.current = setTimeout(type, 14); }
      else { setIsTyping(false); }
    };
    typingRef.current = setTimeout(type, 120);
  }, []);

  useEffect(() => () => { if (typingRef.current) clearTimeout(typingRef.current); }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 md:px-10"
      style={{ background: "#0b1120" }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      {/* Ambient glow */}
      <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", top: "10%", right: "-15%" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)", bottom: "5%", left: "-5%" }} />

      {/* ── Top: name + title ── */}
      <div className="relative z-10 text-center mb-10 animate-fade-up">
        {/* Open to work badge */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
            color: "rgba(74,222,128,0.8)", background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.2)", borderRadius: 50, padding: "5px 14px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-green 2s ease infinite" }} />
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "rgba(96,165,250,0.5)", marginBottom: 14 }}>
          HELLO, I&apos;M
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.9, color: "#f1f5f9", letterSpacing: "0.03em" }}>
          NAVEEN
        </h1>
        <div className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "#60a5fa", minHeight: 26 }}>
          <TypedText texts={["AI Solutions Architect", "Business Analyst & FDE", "Enterprise Solutions Designer", "Salesforce Platform Expert"]} />
        </div>
      </div>

      {/* ── Chat card ── */}
      <div className="relative z-10 w-full max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div style={{
          minHeight: 90, marginBottom: 16, padding: "20px 24px", borderRadius: 18,
          background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)",
          transition: "all 0.3s ease", opacity: activeKey ? 1 : 0.4,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
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
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: activeKey ? "rgba(241,245,249,0.85)" : "rgba(148,163,184,0.4)", margin: 0 }}>
            {activeKey ? displayed || <>&nbsp;</> : "Click any button below to learn about me →"}
          </p>
          {activeKey && !isTyping && (
            <a href={QUICK_RESPONSES[activeKey].href} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "#3b82f6", textDecoration: "none", opacity: 0.8 }}>
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
                display: "flex", alignItems: "center", gap: 7,
                padding: "10px 20px", borderRadius: 50,
                border: activeKey === key ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(59,130,246,0.15)",
                background: activeKey === key ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.04)",
                color: activeKey === key ? "#60a5fa" : "rgba(148,163,184,0.6)",
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em",
                cursor: "pointer", transition: "all 0.25s ease",
                boxShadow: activeKey === key ? "0 0 20px rgba(59,130,246,0.15)" : "none",
              }}
            >
              <span style={{ fontSize: 13, opacity: 0.7 }}>{val.icon}</span>
              {val.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ animation: "float 2.5s ease-in-out infinite" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.25em", color: "rgba(96,165,250,0.35)" }}>SCROLL</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ opacity: 0.35 }}>
          <path d="M8 0v16M1 9l7 7 7-7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes bounce { 0%,80%,100% { transform:translateY(0); opacity:0.4; } 40% { transform:translateY(-5px); opacity:1; } }
        @keyframes pulse-green { 0%,100% { box-shadow:0 0 0 0 rgba(74,222,128,0.4); } 50% { box-shadow:0 0 0 6px rgba(74,222,128,0); } }
      `}</style>
    </section>
  );
}

// ── Fade-in wrapper ─────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── About ──────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-20 relative" style={{ background: "#0a0f1e" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#3b82f6", marginBottom: 20 }}>ABOUT</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f1f5f9", lineHeight: 1.1, marginBottom: 40 }}>
            Not Just a Developer.
            <br />
            <span style={{ color: "#3b82f6" }}>A Solutions Architect.</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn delay={0.1} direction="left">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.9, color: "rgba(148,163,184,0.7)", marginBottom: 20 }}>
              I don&apos;t just write code — I design the system around it.
              With deep expertise in Salesforce CRM, enterprise automation,
              and AI-augmented workflows, I build applications that solve
              real business problems at scale.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.9, color: "rgba(148,163,184,0.7)" }}>
              My approach combines business analysis, platform architecture,
              and intelligent automation to create systems that are not just
              functional — but thoughtfully designed for the humans who use them.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-6">
            {[
              { num: 6, suffix: "+", label: "Years Experience" },
              { num: 13, suffix: "+", label: "Projects Delivered" },
              { num: 8, suffix: "", label: "Platform Certifications" },
              { num: "∞", suffix: "", label: "Problems to Solve" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={0.1 + i * 0.1} direction="right">
                <div className="p-6 rounded-xl" style={{ background: "rgba(59,130,246,0.03)", border: "1px solid rgba(59,130,246,0.08)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "#3b82f6", lineHeight: 1 }}>
                    <Counter target={s.num as number} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(148,163,184,0.5)", letterSpacing: "0.1em", marginTop: 8 }}>
                    {s.label}
                  </div>
                </div>
              </FadeIn>
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
    <section id="experience" className="py-32 px-6 md:px-20 relative" style={{ background: "#0b1120" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#3b82f6", marginBottom: 20 }}>EXPERIENCE</div>
          <h2 className="mb-16" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f1f5f9", lineHeight: 1.1 }}>
            Where I&apos;ve Built
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {jobs.map((j, i) => (
            <FadeIn key={i} delay={i * 0.12} direction="left">
              <div className="group relative pl-8 pb-16 border-l" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                <div className="absolute -left-[5px] top-1 w-[10px] h-[10px] rounded-full" style={{ background: "#3b82f6", boxShadow: "0 0 0 4px rgba(59,130,246,0.15)" }} />
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 style={{ fontFamily: "var(--font-body)", fontSize: 20, fontWeight: 500, color: "#f1f5f9" }}>{j.role}</h3>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#3b82f6", marginTop: 4 }}>{j.company}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(148,163,184,0.4)", letterSpacing: "0.1em" }}>{j.period}</div>
                </div>
                <p className="mb-5 max-w-2xl" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.8, color: "rgba(148,163,184,0.6)" }}>{j.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {j.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-[10px]" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em", border: "1px solid rgba(59,130,246,0.15)", color: "rgba(96,165,250,0.6)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────
function Skills() {
  const skillGroups = [
    { title: "Platform & CRM", items: ["Salesforce (Sales, Service, Experience Cloud)", "Apex & Lightning Web Components", "Flows & Process Automation", "Platform Events & CDC", "SOQL / SOSL"] },
    { title: "Architecture & Integration", items: ["REST / SOAP API Design", "Middleware & ETL Pipelines", "System Integration Patterns", "Data Modeling & Migration", "CI/CD & DevOps (Git, SFDX)"] },
    { title: "AI & Automation", items: ["n8n Workflow Automation", "AI Agent Orchestration", "Prompt Engineering", "Intelligent Document Processing", "RAG Concepts & Implementation", "Custom AI Integrations"] },
    { title: "Frontend & General", items: ["React / Next.js", "TypeScript / JavaScript", "HTML / CSS / Tailwind", "React Native (Mobile)", "Node.js"] },
  ];

  return (
    <section id="skills" className="py-32 px-6 md:px-20 relative" style={{ background: "#0a0f1e" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#3b82f6", marginBottom: 20 }}>SKILLS</div>
          <h2 className="mb-16" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f1f5f9", lineHeight: 1.1 }}>
            Tools & Technologies
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((g, i) => (
            <FadeIn key={g.title} delay={i * 0.1} direction="up">
              <div className="p-6 rounded-xl h-full" style={{ background: "rgba(59,130,246,0.02)", border: "1px solid rgba(59,130,246,0.06)" }}>
                <h3 className="mb-5" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", color: "#60a5fa" }}>{g.title}</h3>
                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(148,163,184,0.7)", lineHeight: 1.5 }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(59,130,246,0.4)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────
function Projects() {
  const projects = [
    { title: "Enterprise Incident Management System", desc: "End-to-end incident tracking with custom LWC dashboards, automated escalation flows, and real-time notification system via Platform Events.", tech: ["Apex", "LWC", "Platform Events", "Flows"], color: "#3b82f6" },
    { title: "Multi-Cloud Integration Hub", desc: "Middleware architecture connecting Salesforce with ERP, billing, and analytics platforms. REST API orchestration with error handling and retry logic.", tech: ["REST API", "Apex", "Integration", "Middleware"], color: "#6366f1" },
    { title: "Automated Case Management", desc: "Intelligent case routing and alert system with custom Lightning components. Reduced resolution time by 40% through smart assignment rules.", tech: ["LWC", "Flows", "Apex", "Case Management"], color: "#8b5cf6" },
    { title: "Customer ChatBot Agents", desc: "Automation platform integrating AI agents for document processing, lead scoring, and intelligent data enrichment.", tech: ["n8n", "AI Agents", "Automation", "Integration"], color: "#a855f7" },
    { title: "Loan Lifecycle Management", desc: "Unified data model across Sales, Service, and Marketing clouds. Custom objects, relationships, and roll-up summaries for complete customer visibility.", tech: ["Data Model", "SOQL", "Admin", "Reports"], color: "#6366f1" },
  ];

  return (
    <section id="projects" className="py-32 px-6 md:px-20 relative" style={{ background: "#0b1120" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#3b82f6", marginBottom: 20 }}>PROJECTS</div>
          <h2 className="mb-16" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f1f5f9", lineHeight: 1.1 }}>
            Selected Work
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08} direction="up">
              <div
                className="group p-7 rounded-xl cursor-pointer transition-all duration-500 hover:-translate-y-1 h-full"
                style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(59,130,246,0.06)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${p.color}33`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${p.color}11`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.06)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: 32, color: `${p.color}22`, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3" style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 500, color: "#f1f5f9", lineHeight: 1.3 }}>{p.title}</h3>
                <p className="mb-5" style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: "rgba(148,163,184,0.5)" }}>{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.05em", border: `1px solid ${p.color}22`, color: `${p.color}88` }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Personal AI Projects ────────────────────────────────────
function PersonalAIProjects() {
  const projects = [
    {
      name: "PLOTDNA AI",
      tagline: "Narrative DNA Engine",
      desc: "Deconstructs story structures and generates plot blueprints using language models. Drop a premise, get a full narrative skeleton.",
      tags: ["LLM", "Storytelling", "Next.js", "AI"],
      color: "#a855f7",
      glow: "rgba(168,85,247,0.15)",
      icon: "◈",
      href: "https://github.com/iamnawin/PLOTDNA-AI",
    },
    {
      name: "APPLYO",
      tagline: "AI-Powered Apply Engine",
      desc: "Upload one resume, approve a curated job list, Applyo auto-applies across Naukri, LinkedIn, and Indeed on your behalf. AI match scoring included.",
      tags: ["Next.js", "Supabase", "Playwright", "n8n", "AI"],
      color: "#3b82f6",
      glow: "rgba(59,130,246,0.15)",
      icon: "◉",
      href: "https://github.com/iamnawin/applyo-platform",
    },
    {
      name: "ORGBLUEPRINT",
      tagline: "AI Org Designer",
      desc: "Turn business goals into org structures. Generates department hierarchies, role definitions, and headcount plans from a single prompt.",
      tags: ["AI", "React", "Org Design", "LLM"],
      color: "#06b6d4",
      glow: "rgba(6,182,212,0.15)",
      icon: "◆",
      href: "https://github.com/iamnawin/orgblueprint-app",
    },
    {
      name: "STRUCTRA AI",
      tagline: "Architect Studio",
      desc: "AI-powered system design studio. Generates entity diagrams, API schemas, and full tech stack recommendations from a product brief.",
      tags: ["Architecture", "AI", "System Design", "Next.js"],
      color: "#f59e0b",
      glow: "rgba(245,158,11,0.15)",
      icon: "◇",
      href: "https://github.com/iamnawin/Structra-AI-Architect-Studio",
    },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const scrollTo = (idx: number) => {
    setActiveIdx(idx);
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll<HTMLDivElement>(".ai-card");
    cards[idx]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="ai-projects" className="py-32 relative overflow-hidden" style={{ background: "#0a0f1e" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)",
      }} />

      <div className="max-w-6xl mx-auto px-6 md:px-20">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#a855f7", marginBottom: 12 }}>PERSONAL AI BUILDS</div>
          <h2 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f1f5f9", lineHeight: 1.1 }}>
            Apps I Ship at Night
          </h2>
          <p className="mb-10" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(148,163,184,0.45)", maxWidth: 400 }}>
            Side projects. Real code. AI-first tools built for actual problems.
          </p>
        </FadeIn>
      </div>

      {/* Sliding track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex gap-5 overflow-x-auto pb-4 select-none"
        style={{
          cursor: "grab",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingLeft: "max(24px, calc((100vw - 1152px)/2 + 80px))",
          paddingRight: "max(24px, calc((100vw - 1152px)/2 + 80px))",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.name}
            className="ai-card shrink-0 flex flex-col"
            onClick={() => scrollTo(i)}
            style={{
              width: "clamp(280px, 40vw, 360px)",
              scrollSnapAlign: "center",
            }}
          >
            <div
              className="flex flex-col h-full rounded-2xl p-8 transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${p.color}22`,
                boxShadow: `0 0 0 1px ${p.color}08, inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px ${p.glow}`,
                minHeight: 300,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px ${p.color}30, inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px ${p.glow}`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${p.color}44`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px ${p.color}08, inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px ${p.glow}`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${p.color}22`;
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ background: `${p.color}12`, border: `1px solid ${p.color}25` }}
                >
                  <span style={{ fontSize: 20, color: p.color }}>{p.icon}</span>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-100"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: p.color, opacity: 0.55, textDecoration: "none" }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  VIEW →
                </a>
              </div>

              {/* Name + tagline */}
              <div className="mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: p.color, opacity: 0.7 }}>
                {p.tagline.toUpperCase()}
              </div>
              <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#f1f5f9", lineHeight: 1.1, letterSpacing: "0.02em" }}>
                {p.name}
              </h3>

              {/* Desc */}
              <p className="mb-6 flex-1" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.75, color: "rgba(148,163,184,0.6)" }}>
                {p.desc}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em",
                    padding: "3px 10px", borderRadius: 50,
                    border: `1px solid ${p.color}25`, color: `${p.color}88`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: activeIdx === i ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: activeIdx === i ? p.color : "rgba(148,163,184,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`.ai-card { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); } [style*="scrollbarWidth"] { scrollbar-width: none; } [style*="scrollbarWidth"]::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}

// ── Certifications ─────────────────────────────────────────
function Certifications() {
  const certs = [
    { name: "Salesforce Certified Administrator", abbr: "ADM", color: "#00A1E0" },
    { name: "Platform Developer I", abbr: "PD1", color: "#00A1E0" },
    { name: "Platform Developer II", abbr: "PD2", color: "#00A1E0" },
    { name: "Platform App Builder", abbr: "PAB", color: "#00A1E0" },
    { name: "Sales Cloud Consultant", abbr: "SCC", color: "#00A1E0" },
    { name: "Service Cloud Consultant", abbr: "SVC", color: "#00A1E0" },
    { name: "Experience Cloud Consultant", abbr: "EXP", color: "#00A1E0" },
    { name: "AI Associate", abbr: "AIA", color: "#8b5cf6" },
  ];

  return (
    <section id="certifications" className="py-32 px-6 md:px-20 relative" style={{ background: "#0a0f1e" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#3b82f6", marginBottom: 20 }}>CERTIFICATIONS</div>
          <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f1f5f9", lineHeight: 1.1 }}>
            Salesforce Certified
          </h2>
          <p className="mb-16" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(148,163,184,0.5)", lineHeight: 1.7, maxWidth: 480 }}>
            8 active certifications across the Salesforce platform — from core admin to advanced development and AI.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certs.map((c, i) => (
            <FadeIn key={c.abbr} delay={i * 0.07} direction="up">
              <div
                className="group p-5 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ background: "rgba(0,161,224,0.03)", border: "1px solid rgba(0,161,224,0.08)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${c.color}30`;
                  (e.currentTarget as HTMLDivElement).style.background = `${c.color}06`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px ${c.color}10`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,161,224,0.08)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,161,224,0.03)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Salesforce cloud icon */}
                <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-full" style={{ background: `${c.color}12` }}>
                  <svg width="22" height="16" viewBox="0 0 52 36" fill="none">
                    <path d="M21.6 7.2a10.8 10.8 0 0 1 20.16 5.4 8.4 8.4 0 0 1-1.44 16.8H12a10.8 10.8 0 0 1-.48-21.6 10.8 10.8 0 0 1 10.08-.6z" fill={c.color} opacity="0.9"/>
                  </svg>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: c.color, letterSpacing: "0.05em", marginBottom: 6 }}>{c.abbr}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(148,163,184,0.6)", lineHeight: 1.4 }}>{c.name}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Verify link */}
        <FadeIn delay={0.5}>
          <div className="mt-10 text-center">
            <a
              href="https://www.salesforce.com/trailblazer/naveentatikayala"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "rgba(0,161,224,0.5)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#00A1E0"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,161,224,0.5)"}
            >
              VERIFY ON TRAILHEAD →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-20 relative" style={{ background: "#0b1120", borderTop: "1px solid rgba(59,130,246,0.06)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "#3b82f6", marginBottom: 20 }}>CONTACT</div>
          <h2 className="mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#f1f5f9", lineHeight: 1.05 }}>
            LET&apos;S BUILD
            <br />
            <span style={{ color: "#3b82f6" }}>SOMETHING SOLID</span>
          </h2>
          <p className="mb-10 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "rgba(148,163,184,0.6)" }}>
            Looking for an AI Solutions Architect who bridges business and technology? Let&apos;s talk.
          </p>
          <a
            href="mailto:t_naveen@outlook.in"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", background: "#3b82f6", color: "#fff", textDecoration: "none" }}
          >
            GET IN TOUCH →
          </a>
          <p style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "rgba(148,163,184,0.45)" }}>
            t_naveen@outlook.in
          </p>
        </FadeIn>

        {/* Social links */}
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-6 mt-8">
            <a
              href="https://www.linkedin.com/in/naveen-tatikayala/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "rgba(148,163,184,0.5)", textDecoration: "none", padding: "10px 20px", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 50 }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.12)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LINKEDIN
            </a>
            <a
              href="https://github.com/iamnawin"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "rgba(148,163,184,0.5)", textDecoration: "none", padding: "10px 20px", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 50 }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(148,163,184,0.5)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.12)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GITHUB
            </a>
          </div>
        </FadeIn>

        {/* Footer */}
        <div className="mt-32 pt-8 flex justify-between items-center" style={{ borderTop: "1px solid rgba(59,130,246,0.06)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(148,163,184,0.3)", letterSpacing: "0.1em" }}>© 2025 NAVEEN</span>
          <Link href="/creator" className="transition-colors duration-300 hover:text-amber-400"
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(148,163,184,0.3)", letterSpacing: "0.1em", textDecoration: "none" }}>
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
      <PersonalAIProjects />
      <Certifications />
      <Contact />
    </main>
  );
}
