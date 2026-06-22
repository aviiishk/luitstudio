import Link from "next/link";
import { ArrowRight } from "lucide-react";

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";

export default function HomeCTA() {
  return (
    <section
      className="border-t"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 py-20 sm:py-28">

        {/* Section marker */}
        <div className="mb-6">
          <span
            className="font-body text-[10px] tracking-[0.34em] uppercase tabular-nums"
            style={{ color: LIGHT }}
          >
            [ 006 ]
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-heading font-black tracking-tight leading-[0.86] mb-8 sm:mb-10"
          style={{ color: INK }}
        >
          <span className="block text-[clamp(42px,6.5vw,104px)]">Let&apos;s build</span>
          <span
            className="block text-[clamp(42px,6.5vw,104px)] text-transparent select-none"
            style={{ WebkitTextStroke: `1.8px ${INK}` }}
          >
            something amazing.
          </span>
        </h2>

        {/* Subtext + actions */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">

          <p
            className="font-body text-[15px] sm:text-[16px] leading-[1.75] max-w-[440px]"
            style={{ color: MUTED }}
          >
            Ready to take your digital presence to the next level?
            Let&apos;s talk about what you&apos;re building.
          </p>

          <div className="flex flex-col gap-3 items-start sm:items-end shrink-0">
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/intro"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-body font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: INK }}
              >
                Book a call
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-150" />
              </Link>
              <a
                href="mailto:hello@luitstudio.com"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border font-body font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#111110] hover:text-[#111110]"
                style={{ borderColor: BORDER, color: MUTED }}
              >
                Send a message
              </a>
            </div>
            <p
              className="font-body text-[11px]"
              style={{ color: LIGHT }}
            >
              Usually responds within 24 hours
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
