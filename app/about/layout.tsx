import type { Metadata } from "next";
import { absoluteUrl, seoImages, siteConfig } from "@/lib/seo";

const description =
  "Meet Luit Studio, a Guwahati-based creative digital agency building fast websites, polished UI/UX, brand systems, and growth-focused digital products.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  keywords: [
    "creative agency guwahati",
    "UI UX agency guwahati",
    "branding agency guwahati",
    "digital product studio guwahati",
  ],
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/about"),
    siteName: siteConfig.name,
    title: "About Us | Luit Studio",
    description,
    images: [
      {
        url: seoImages.about,
        width: 1200,
        height: 630,
        alt: "About Luit Studio, a creative digital agency in Guwahati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@luitstudio",
    title: "About Us | Luit Studio",
    description,
    images: [seoImages.about],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
