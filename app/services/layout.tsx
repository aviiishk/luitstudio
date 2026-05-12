import type { Metadata } from "next";
import { absoluteUrl, seoImages, siteConfig } from "@/lib/seo";

const description =
  "Explore Luit Studio services for web design, web development, UI/UX, branding, SEO, social media, and performance marketing in Guwahati.";

export const metadata: Metadata = {
  title: "Services",
  description,
  keywords: [
    "web design guwahati",
    "SEO agency guwahati",
    "UI UX agency guwahati",
    "branding agency guwahati",
    "performance marketing guwahati",
  ],
  alternates: {
    canonical: absoluteUrl("/services"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/services"),
    siteName: siteConfig.name,
    title: "Services | Luit Studio",
    description,
    images: [
      {
        url: seoImages.services,
        width: 1200,
        height: 630,
        alt: "Luit Studio digital services for web, UI UX, SEO, and branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@luitstudio",
    title: "Services | Luit Studio",
    description,
    images: [seoImages.services],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
