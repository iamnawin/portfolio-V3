"use client";
import { useState, useEffect, useCallback } from "react";
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
      <div className="flex gap-9">
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
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
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

      {/* Ambient circles */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
          bottom: "10%",
          left: "5%",
        }}
      />

      <div className="relative z-10 px-10 md:px-20 max-w-5xl">
        <div
          className="mb-6"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.3em",
            color: "rgba(96,165,250,0.5)",
          }}
        >
          HELLO, I&apos;M NAVEEN
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            lineHeight: 0.95,
            color: "#f1f5f9",
            letterSpacing: "0.02em",
          }}
        >
          AI-DRIVEN
          <br />
          <span style={{ color: "#3b82f6" }}>APPLICATION</span>
          <br />
          DESIGNER
        </h1>

        <div
          className="mt-8"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "#60a5fa",
            minHeight: 28,
          }}
        >
          <TypedText
            texts={[
              "Intelligent Systems Designer",
              "Automation & Application Architect",
              "Enterprise Solutions Engineer",
              "Salesforce Platform Expert",
            ]}
          />
        </div>

        <p
          className="mt-8 max-w-xl"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(148,163,184,0.7)",
          }}
        >
          I bring over 6 years of experience designing enterprise applications, starting with Salesforce CRM and large-scale automation projects. 
          As AI began transforming workflows, I integrated AI-driven automation and intelligent systems into enterprise solutions, focusing on building scalable architectures that actually work in production environments
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              background: "#3b82f6",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full text-sm transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#60a5fa",
              textDecoration: "none",
            }}
          >
            CONTACT
          </a>
        </div>
      </div>
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
              { num: "50+", label: "Projects Delivered" },
              { num: "3", label: "Platform Certifications" },
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
      role: "Application Solutions Designer",
      company: "Current Position",
      period: "2023 — Present",
      desc: "Designing and architecting enterprise applications with AI-augmented workflows. Leading system integrations across Salesforce, automation platforms, and custom solutions.",
      tech: ["Salesforce", "Apex", "LWC", "Integration", "AI Automation"],
    },
    {
      role: "Senior Salesforce Developer",
      company: "Enterprise Client",
      period: "2021 — 2023",
      desc: "Built complex Lightning Web Components, Apex solutions, and automated business processes. Managed incident workflows and case management systems.",
      tech: ["Apex", "LWC", "Flows", "REST API", "Platform Events"],
    },
    {
      role: "Salesforce Developer",
      company: "Technology Firm",
      period: "2018 — 2021",
      desc: "Full-cycle Salesforce development from requirements to deployment. Created custom objects, triggers, batch processes, and Lightning components.",
      tech: ["Apex", "Visualforce", "SOQL", "Lightning", "Admin"],
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
      title: "AI-Augmented Workflow Engine",
      desc: "n8n-based automation platform integrating AI agents for document processing, lead scoring, and intelligent data enrichment.",
      tech: ["n8n", "AI Agents", "Automation", "Integration"],
      color: "#a855f7",
    },
    {
      title: "Drivour — Route Discovery App",
      desc: "Open-source React Native mobile app that shows interesting stops along driving routes, not just the fastest path. Location-based discovery engine.",
      tech: ["React Native", "Maps API", "Mobile", "Open Source"],
      color: "#3b82f6",
    },
    {
      title: "Customer 360 Data Architecture",
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
          Looking for an Application Designer who thinks in systems,
          not just screens? Let&apos;s talk.
        </p>
        <a
          href="t_naveen@outlook.in"
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
