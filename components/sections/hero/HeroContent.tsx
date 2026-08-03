import { HeroCTA } from "@/components/sections/hero/HeroCTA";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/config/site";

export function HeroContent() {
  return (
    <header className="mx-auto flex max-w-6xl flex-col gap-8 text-center sm:gap-9 lg:gap-10">
      <AnimatedHeadline
        id="hero-heading"
        text="Building bold brands with"
        italicText="thoughtful design"
        delay={0.05}
        className="text-ink text-[clamp(2.75rem,11vw,8rem)] leading-[0.92] font-medium tracking-[-0.055em] text-balance"
        italicClassName="font-display font-normal tracking-[-0.025em]"
      />

      <Reveal delay={0.14} className="mx-auto max-w-2xl">
        <p className="text-body text-base leading-7 sm:text-lg sm:leading-8">
          At {siteConfig.name}, we help small startups tackle the world&apos;s
          biggest challenges with tailored solutions, guiding you from strategy
          to success in a competitive market.
        </p>
      </Reveal>

      <Reveal delay={0.23}>
        <HeroCTA />
      </Reveal>
    </header>
  );
}
