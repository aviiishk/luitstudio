import { TestimonialsGrid } from "@/components/sections/testimonials/TestimonialsGrid";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col gap-12 md:gap-16">
        <AnimatedHeadline
          as="h2"
          id="testimonials-heading"
          text="What our satisfied customers are saying"
          italicText="about us"
          delay={0.05}
          animateOnView
          className="text-ink mx-auto max-w-3xl text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
          italicClassName="font-display font-normal"
        />
        <TestimonialsGrid testimonials={testimonials} />
      </Container>
    </section>
  );
}
