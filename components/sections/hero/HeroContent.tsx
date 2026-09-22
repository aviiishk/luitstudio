import { HeroCTA } from "@/components/sections/hero/HeroCTA";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";

export function HeroContent() {
  return (
    <header className="mx-auto flex max-w-6xl flex-col gap-8 text-center sm:gap-9 lg:gap-10">
      <AnimatedHeadline
        id="hero-heading"
        text="Building bold products"
        secondLineText="with"
        italicText="measurable growth."
        delay={0.05}
        className="text-ink text-[clamp(2.75rem,11vw,8rem)] leading-[0.92] font-medium tracking-[-0.055em] text-balance"
        italicClassName="font-display font-normal tracking-[-0.02em]"
      />

      <Reveal delay={0.14} className="mx-auto max-w-2xl">
        <p className="text-body text-base leading-7 sm:text-lg sm:leading-8">
          We build products people want, then make sure the right people
          find them.
        </p>
      </Reveal>

      <Reveal delay={0.23}>
        <HeroCTA />
      </Reveal>
    </header>
  );
}
