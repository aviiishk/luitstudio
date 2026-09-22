import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { HeroCapabilities } from "@/components/sections/hero/HeroCapabilities";
import { HeroContent } from "@/components/sections/hero/HeroContent";
import { HeroScrollCue } from "@/components/sections/hero/HeroScrollCue";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-32 pb-8 sm:pt-36 md:pt-40 md:pb-12 xl:pt-[180px] xl:pb-16"
    >
      <HeroBackground />
      <Container className="relative z-10">
        <HeroContent />
      </Container>
      <div className="relative z-10">
        <HeroCapabilities />
        <HeroScrollCue />
      </div>
    </section>
  );
}
