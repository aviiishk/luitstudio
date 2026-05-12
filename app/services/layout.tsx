import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Luit Studio's full range of digital services: web development, UI/UX design, cloud systems, mobile-first experiences, SEO optimisation, social media management, performance marketing, and branding.",
  openGraph: {
    title: "Services | Luit Studio",
    description:
      "High-performance digital solutions designed to scale with your business.",
    images: [{ url: "/hero/cinematic-environment.png", width: 1200, height: 630, alt: "Luit Studio Services" }],
  },
  twitter: {
    title: "Services | Luit Studio",
    description:
      "High-performance digital solutions designed to scale with your business.",
    images: ["/hero/cinematic-environment.png"],
  },
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
