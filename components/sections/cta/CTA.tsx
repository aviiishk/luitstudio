import { ArrowUpRight } from "lucide-react";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { CtaContent } from "@/types/cta";

const backgroundClasses = {
  gradient:
    "border border-border bg-[linear-gradient(90deg,#cdeffb_0%,#fff_33%,#fff_66%,#fdeecb_100%)]",
  surface: "border border-border bg-surface",
  none: "bg-transparent",
} as const;

export function CTA({
  background = "gradient",
  buttons,
  description,
  emphasis,
  id,
  title,
}: CtaContent) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="py-16 md:py-20 xl:py-24"
    >
      <Container>
        <div
          className={`overflow-hidden rounded-3xl px-5 py-16 sm:px-8 md:py-20 xl:py-24 ${backgroundClasses[background]}`}
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
            <div className="flex flex-col gap-4">
              <AnimatedHeadline
                as="h2"
                id={headingId}
                text={title}
                italicText={emphasis}
                delay={0.05}
                animateOnView
                className="text-ink text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
                italicClassName="font-display font-normal"
              />
              <Reveal delay={0.14}>
                <p className="text-ink/75 mx-auto max-w-2xl text-base leading-7 sm:text-lg">
                  {description}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.23}>
              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                {buttons.map((button) => (
                  <ButtonLink
                    key={`${button.label}-${button.href}`}
                    href={button.href}
                    variant={button.variant}
                    icon={ArrowUpRight}
                    className="pr-2"
                  >
                    {button.label}
                  </ButtonLink>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
