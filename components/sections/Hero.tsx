import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { FaTelegram } from "react-icons/fa6";
import ParallaxShowcase from "@/components/sections/ParallaxShowcase";

const INK    = "#111110";
const MUTED  = "#6B6B68";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";

export default function Hero() {
  return (
    <section style={{ backgroundColor: BG }} className="flex flex-col overflow-x-hidden">

      <div className="flex flex-col items-center text-center px-5 sm:px-8 pt-24 sm:pt-28 pb-0 hero-enter">

        {/* Identity badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7"
          style={{ borderColor: BORDER }}
        >
          <span className="font-body text-[11px]" style={{ color: MUTED }}>
            Boutique design &amp; dev studio · Guwahati, Assam
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-black tracking-tight leading-[1.06] max-w-3xl mb-5"
          style={{ color: INK, fontSize: "clamp(28px, 3.8vw, 48px)" }}
        >
          A full-stack design and dev partner for ambitious businesses
        </h1>

        {/* Subheadline */}
        <p
          className="font-body leading-[1.72] max-w-sm mb-6"
          style={{ color: MUTED, fontSize: "clamp(13px, 1.2vw, 15px)" }}
        >
          Websites, apps, and digital products for businesses where quality is non-negotiable.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/intro"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-[14px] text-white transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: INK }}
          >
            <Phone size={13} />
            Book Intro Call
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
          <a
            href="https://t.me/luitstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-body font-medium text-[14px] transition-all duration-200 hover:border-[#111110]"
            style={{ borderColor: BORDER, color: INK }}
          >
            <FaTelegram size={14} style={{ color: "#229ED9" }} />
            Send Message
          </a>
        </div>

      </div>

      {/* 3D orbit carousel */}
      <ParallaxShowcase />

      {/* Section close */}
      <div
        className="flex items-center justify-center pb-14 pt-4 gap-3"
        style={{ color: BORDER }}
      >
        <span className="flex-1 max-w-24 h-px" style={{ backgroundColor: BORDER }} />
        <span className="font-body text-[10px] uppercase tracking-[0.22em]" style={{ color: "#C8C6C0" }}>
          scroll to explore
        </span>
        <span className="flex-1 max-w-24 h-px" style={{ backgroundColor: BORDER }} />
      </div>

      <style>{`
        .hero-enter {
          animation: heroEnter 0.55s ease both;
        }
        @keyframes heroEnter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
