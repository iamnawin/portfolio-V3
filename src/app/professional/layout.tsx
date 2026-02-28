import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naveen | AI-Driven Application Solutions Designer",
  description:
    "Enterprise architecture, intelligent automation, and scalable application design.",
};

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
