# Naveen's Portfolio V3

A dual-identity portfolio built with a flip-card concept — one person, two professional faces: **PROFESSIONAL** (AI-Driven Application Designer) and **CREATIVE** (AI Cinematic Creator).

---

## The Idea

Started as a simple two-track portfolio. The landing page needed to communicate that Naveen works in two very different spaces — enterprise Salesforce/AI architecture and cinematic/storytelling content creation — without those two identities fighting each other.

The solution: a **3D flip card** on the home page. Visitors see a card with a PRO|CREATIVE toggle. Flipping it reveals the other side of the person. Both sides share the same card, same physics, same personality — they just show different professional faces.

---

## How It Evolved

| Phase | What happened |
|-------|---------------|
| **V3 init** | Two-track portfolio scaffold — `/professional` and `/creator` routes |
| **Landing experiments** | Tried holographic 3D nameplate, magnetic scatter-snap name, perspective tilt physics — then reverted to clean |
| **Professional page** | AI chat-style hero, scroll animations, certifications section, open-to-work badge |
| **Creator page** | Full redesign with cursor system, multi-brand integration, mobile responsive |
| **Analytics** | Vercel Web Analytics added for visitor tracking |
| **Flip card (`/v2`)** | New home page concept — coin-flip card design, real profile photos, PRO|CREATIVE toggle |
| **Spring physics** | Framer Motion spring animation, floating card, shimmer sweep, pulsing glow |
| **Sound** | Replaced Web Audio API synth sound with real MP3 pop click |
| **Toggle refinement** | Water ripple → spark burst particles; 3D raised pill with depth; swipe/drag support |
| **Pill precision** | Framer Motion `layoutId` for pixel-perfect pill; inset-only shadows to fix color bleed |

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Analytics | Vercel Web Analytics |
| Hosting | Vercel |
| React | React 19 |

---

## Project Structure

```
src/app/
├── page.tsx          # Home — 3D flip card with PRO|CREATIVE toggle
├── professional/     # Enterprise track (Salesforce, AI architecture)
├── creator/          # Creative track (cinematic, storytelling, B2B studio)
├── layout.tsx        # Root layout with fonts and analytics
├── globals.css       # Global styles + Tailwind v4 config
└── providers.tsx     # Client-side providers
public/
├── comedy_pop_finger_in_mouth_001.mp3   # Flip sound
└── [profile photos]
```

---

## Key Design Decisions

- **Single card, two sides** — both PRO and CREATIVE live on the same flip card. The toggle pill (blue = PRO, amber = CREATIVE) slides between states using Framer Motion `layoutId`.
- **No outer shadows on the pill** — outer `box-shadow` was bleeding color past the center boundary into the opposite label. Switched to inset-only shadows.
- **Pointer capture for swipe** — `setPointerCapture` routes pointer events to the toggle even when the finger leaves the element mid-swipe.
- **Spark burst instead of ripple** — water ripple was too heavy. Replaced with 6 tiny directional spark particles that burst and fade in 700ms.
- **Real MP3 over Web Audio API** — synthesized sounds felt cheap. Uses a pop click from `/public`.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy

Push to GitHub and connect the repo at [vercel.com](https://vercel.com). Auto-deploys on every push to `main`.

```bash
git push origin main
```
