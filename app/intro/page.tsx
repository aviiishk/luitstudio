import type { Metadata } from "next";
import Link from "next/link";
import CalEmbed from "./CalEmbed";

export const metadata: Metadata = {
  title: "Book an Intro Call — Luit Studio",
  description: "Schedule a free 30-minute intro call to discuss your project.",
};

const BG     = "#FAFAF7";
const INK    = "#111110";
const MUTED  = "#6B6B68";
const BORDER = "#E5E3DE";

export default function IntroPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-5 pt-24 pb-24"
      style={{ backgroundColor: BG }}
    >
      {/* Header */}
      <div className="text-center mb-10 max-w-lg">
        <h1
          className="font-heading font-black tracking-tight leading-[1.08] mb-4"
          style={{ color: INK, fontSize: "clamp(32px, 4.5vw, 52px)" }}
        >
          Let&apos;s chat!
        </h1>
        <p className="font-body leading-[1.72]" style={{ color: MUTED, fontSize: "15px" }}>
          Walk us through what you&apos;re building.<br />
          We&apos;ll outline how we can help.
        </p>
      </div>

      {/* Embed card */}
      <div
        className="w-full max-w-4xl rounded-2xl border overflow-hidden"
        style={{ borderColor: BORDER, backgroundColor: "#fff", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}
      >
        <CalEmbed />
      </div>

      {/* Back */}
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-1.5 font-body text-[13px] transition-opacity hover:opacity-55"
        style={{ color: MUTED }}
      >
        ← Back to home
      </Link>
    </main>
  );
}
