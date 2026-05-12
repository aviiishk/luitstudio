import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import localFont from "next/font/local";

const displayFont = localFont({
  src: "../public/fonts/UnifrakturCook-Bold.woff2",
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const SITE_URL = "https://luitstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luit Studio — Digital Agency",
    template: "%s | Luit Studio",
  },
  description:
    "Luit Studio is a digital agency specialising in web development, UI/UX design, SEO optimisation, social media management, and performance marketing. We build high-performance digital products.",
  keywords: [
    "digital agency", "web development", "UI/UX design",
    "SEO optimisation", "performance marketing",
    "social media management", "branding", "Next.js agency", "Luit Studio",
  ],
  authors: [{ name: "Luit Studio", url: SITE_URL }],
  creator: "Luit Studio",
  openGraph: {
    type: "website", locale: "en_US", url: SITE_URL, siteName: "Luit Studio",
    title: "Luit Studio — Digital Agency",
    description: "High-performance websites, apps, and digital marketing solutions built for scale.",
    images: [{ url: "/hero/cinematic-environment.png", width: 1200, height: 630, alt: "Luit Studio — Digital Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luit Studio — Digital Agency",
    description: "High-performance websites, apps, and digital marketing solutions built for scale.",
    images: ["/hero/cinematic-environment.png"],
    creator: "@luitstudio",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white font-body transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
