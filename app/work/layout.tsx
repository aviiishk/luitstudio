import type { Metadata } from "next";
import { absoluteUrl, seoImages, siteConfig } from "@/lib/seo";

const description =
  "Browse Luit Studio work across web apps, mobile products, SEO campaigns, brand systems, and social media strategies built for measurable growth.";

export const metadata: Metadata = {
  title: "Our Work",
  description,
  keywords: [
    "Luit Studio portfolio",
    "web design portfolio guwahati",
    "SEO agency case studies",
    "UI UX agency work",
  ],
  alternates: {
    canonical: absoluteUrl("/work"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/work"),
    siteName: siteConfig.name,
    title: "Our Work | Luit Studio",
    description,
    images: [
      {
        url: seoImages.work,
        width: 1200,
        height: 630,
        alt: "Luit Studio portfolio of digital product and SEO work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@luitstudio",
    title: "Our Work | Luit Studio",
    description,
    images: [seoImages.work],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
