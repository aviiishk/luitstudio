import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Program — Batch 01",
  description: "Join Luit Studio's first internship batch. Learn web development, UI/UX design, SEO, and digital marketing from industry professionals.",
  alternates: { canonical: "/intern" },
};

export default function InternLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
