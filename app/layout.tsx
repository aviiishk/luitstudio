import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

// 🔤 Body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// 🔥 Display font (Gothic)
const displayFont = localFont({
  src: "../public/fonts/UnifrakturCook-Bold.woff2",
  variable: "--font-display",
});

// Optional (keep if needed)
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luit Studio",
  description: "We build digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displayFont.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F5F5F4] text-black">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}