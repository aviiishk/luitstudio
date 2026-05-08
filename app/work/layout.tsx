import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse Luit Studio's portfolio of real projects — web apps, mobile apps, SEO campaigns, and social media strategies — each built for measurable results.",
  openGraph: {
    title: "Our Work | Luit Studio",
    description:
      "Real products for real businesses. Every project built with a focus on performance, design, and measurable results.",
    images: [{ url: "/projects/dashboard.png", width: 1200, height: 630, alt: "Luit Studio Portfolio" }],
  },
  twitter: {
    title: "Our Work | Luit Studio",
    description:
      "Real products for real businesses. Every project built with a focus on performance, design, and measurable results.",
    images: ["/projects/dashboard.png"],
  },
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
