import { ArrowUpRight } from "lucide-react";

import { PricingFeature } from "@/components/sections/pricing/PricingFeature";
import { ButtonLink } from "@/components/ui/button";
import type { PricingPlan } from "@/types/pricing";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article
      aria-labelledby={`${plan.id}-plan-title`}
      className={`hover:shadow-soft h-full rounded-2xl border border-transparent p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none sm:p-8 ${
        plan.highlighted
          ? "bg-brand text-white hover:border-white/20"
          : "bg-yellow text-ink hover:border-ink/15"
      }`}
    >
      <div className="grid h-full gap-10 md:grid-cols-2 md:gap-0">
        <div
          className={`flex flex-col justify-between gap-10 md:pr-8 ${plan.highlighted ? "md:border-r md:border-white/15" : "md:border-ink/10 md:border-r"}`}
        >
          <div className="flex flex-col gap-4">
            <h3
              id={`${plan.id}-plan-title`}
              className="bg-ink w-fit rounded-full px-4 py-2 text-base font-medium text-white"
            >
              {plan.title}
            </h3>
            <p className={plan.highlighted ? "text-white/80" : "text-ink/70"}>
              {plan.description}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[clamp(2.5rem,5vw,3rem)] leading-none font-medium tracking-[-0.04em]">
              {plan.currency ? (
                <>
                  <span aria-hidden="true">{plan.currency}</span>
                  <span className="sr-only">{plan.currency}</span>
                </>
              ) : null}
              {plan.price}
              {plan.duration ? (
                <span
                  className={`ml-1 text-base tracking-normal ${plan.highlighted ? "text-white/80" : "text-ink/70"}`}
                >
                  /{plan.duration}
                </span>
              ) : null}
            </p>
            <ButtonLink
              href={plan.cta.href}
              variant="light"
              icon={ArrowUpRight}
              className="w-fit pr-2"
            >
              {plan.cta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:pl-8">
          <h4
            className={`text-lg ${plan.highlighted ? "text-white" : "text-ink"}`}
          >
            Features
          </h4>
          <ul className="flex flex-col gap-3">
            {plan.features.map((feature) => (
              <PricingFeature key={feature} highlighted={plan.highlighted}>
                {feature}
              </PricingFeature>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
