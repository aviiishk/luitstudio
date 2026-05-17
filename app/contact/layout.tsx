import type { Metadata } from "next";
import { absoluteUrl, seoImages, siteConfig } from "@/lib/seo";

const description =
  "Contact Luit Studio in Guwahati for web design, UI/UX, SEO, branding, and digital product development projects.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  keywords: [
    "contact Luit Studio",
    "web design guwahati",
    "creative agency guwahati",
    "SEO agency guwahati",
  ],
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/contact"),
    siteName: siteConfig.name,
    title: "Contact | Luit Studio",
    description,
    images: [
      {
        url: seoImages.contact,
        width: 1200,
        height: 630,
        alt: "Contact Luit Studio for a digital project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@luitstudio",
    title: "Contact | Luit Studio",
    description,
    images: [seoImages.contact],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
