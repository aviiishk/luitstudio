import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Luit Studio. Tell us about your project — web development, UI/UX design, SEO, or performance marketing — and we'll turn your idea into reality.",
  openGraph: {
    title: "Contact | Luit Studio",
    description:
      "Start a project with Luit Studio. Tell us about your idea and we'll turn it into reality.",
    images: [{ url: "/hero/contact-visual.png", width: 1200, height: 630, alt: "Contact Luit Studio" }],
  },
  twitter: {
    title: "Contact | Luit Studio",
    description:
      "Start a project with Luit Studio. Tell us about your idea and we'll turn it into reality.",
    images: ["/hero/contact-visual.png"],
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
