import { AboutContent } from "@/components/sections/about/AboutContent";
import { Container } from "@/components/ui/container";

export function About() {
  return (
    <section
      id="aboutus"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col gap-16 md:gap-20">
        <AboutContent />
      </Container>
    </section>
  );
}
