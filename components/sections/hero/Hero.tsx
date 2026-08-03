import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { HeroContent } from "@/components/sections/hero/HeroContent";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 md:pt-40 md:pb-20 xl:pt-[180px] xl:pb-24"
    >
      <HeroBackground />
      <Container className="relative z-10">
        <HeroContent />
      </Container>
    </section>
  );
}
