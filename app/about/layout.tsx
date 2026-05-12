import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Luit Studio. We build high-performance digital products — websites, apps, and marketing systems — that deliver real-world impact.",
  openGraph: {
    title: "About Us | Luit Studio",
    description:
      "We build products with a clear focus on performance, usability, and real-world impact.",
    images: [{ url: "/about/about-hero-journey.png", width: 1200, height: 630, alt: "About Luit Studio" }],
  },
  twitter: {
    title: "About Us | Luit Studio",
    description:
      "We build products with a clear focus on performance, usability, and real-world impact.",
    images: ["/about/about-hero-journey.png"],
  },
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
