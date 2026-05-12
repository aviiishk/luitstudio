import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import localFont from "next/font/local";
import { Archivo, Space_Grotesk } from "next/font/google";
import {
  SITE_URL,
  absoluteUrl,
  defaultDescription,
  seoImages,
  siteConfig,
  structuredData,
} from "@/lib/seo";

const displayFont = localFont({
  src: "../public/fonts/UnifrakturCook-Bold.woff2",
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.name,
  title: {
    default: "Luit Studio | Creative Digital Agency in Guwahati",
    template: "%s | Luit Studio",
  },
  description: defaultDescription,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Digital agency",
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: "Luit Studio | Creative Digital Agency in Guwahati",
    description: defaultDescription,
    images: [
      {
        url: seoImages.home,
        width: 1200,
        height: 630,
        alt: "Luit Studio creative digital agency in Guwahati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luit Studio | Creative Digital Agency in Guwahati",
    description: defaultDescription,
    creator: "@luitstudio",
    images: [seoImages.home],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${archivo.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-[#fafafa] dark:bg-[#08080f] text-gray-900 dark:text-white font-body transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
