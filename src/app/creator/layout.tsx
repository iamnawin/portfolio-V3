import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naveen | AI Cinematic Creator — AIwithNoBrain",
  description:
    "AI-powered cinematic storytelling, Hindu mythology, and creative automation. AIwithNoBrain + ZeroOrigins.",
};

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
