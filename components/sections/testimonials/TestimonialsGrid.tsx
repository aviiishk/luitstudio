import { TestimonialCard } from "@/components/sections/testimonials/TestimonialCard";
import { Reveal } from "@/components/shared/reveal";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialsGridProps {
  testimonials: readonly Testimonial[];
}

const layoutClasses = {
  wide: "lg:col-span-8",
  narrow: "lg:col-span-4",
} as const;

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
      {testimonials.map((testimonial, index) => (
        <Reveal
          key={testimonial.id}
          delay={0.08 + index * 0.08}
          className={`h-full ${layoutClasses[testimonial.layout]}`}
        >
          <TestimonialCard testimonial={testimonial} />
        </Reveal>
      ))}
    </div>
  );
}
