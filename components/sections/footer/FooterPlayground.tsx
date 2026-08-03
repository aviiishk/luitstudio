import { Sparkles } from "lucide-react";

import { DraggablePlayfulCards } from "@/components/sections/footer/DraggablePlayfulCards";
import { Container } from "@/components/ui/container";

const processWords = ["Ideas", "Identity", "Interfaces", "Impact"] as const;

// Repeated so each half of the track comfortably overflows even very wide
// viewports — the 0%→-50% loop only looks seamless if a single half is
// already wider than the screen, otherwise a gap flashes mid-cycle.
const TICKER_REPEAT_COUNT = 8;
const tickerWords = Array.from(
  { length: TICKER_REPEAT_COUNT },
  () => processWords,
).flat();

export function FooterPlayground() {
  return (
    <section
      aria-labelledby="footer-playground-heading"
      className="relative overflow-hidden py-14 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute top-4 -right-12 size-44 rounded-full border border-white/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-14 -right-4 size-24 rounded-full border border-white/20"
      />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-white/65">
              <Sparkles aria-hidden="true" size={17} />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase">
                A note from the studio
              </p>
            </div>
            <h2
              id="footer-playground-heading"
              className="mt-5 text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.92] tracking-[-0.055em] text-balance text-white"
            >
              Serious about the work.{" "}
              <em className="font-display font-normal">Not ourselves.</em>
            </h2>
          </div>

          <DraggablePlayfulCards />
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="border-ink text-ink footer-ticker-viewport mt-14 -rotate-1 border-y-2 bg-[#f8f2e8] py-4 lg:mt-20"
      >
        <div className="footer-ticker-track">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className={`flex items-center gap-5 pr-5 text-lg font-semibold tracking-[-0.02em] sm:gap-8 sm:pr-8 sm:text-2xl ${
                groupIndex === 0 ? "footer-ticker-primary" : "footer-ticker-copy"
              }`}
            >
              {tickerWords.map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="flex items-center gap-5 sm:gap-8"
                >
                  {word}
                  <Sparkles
                    aria-hidden="true"
                    size={18}
                    className="text-brand"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
