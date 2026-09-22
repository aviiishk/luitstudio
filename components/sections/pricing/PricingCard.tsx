import { ArrowUpRight } from "lucide-react";

import { PricingFeature } from "@/components/sections/pricing/PricingFeature";
import { services } from "@/components/sections/services/service-data";
import { ButtonLink } from "@/components/ui/button";
import type { PricingTrack } from "@/types/pricing";

interface PricingCardProps {
  track: PricingTrack;
}

export function PricingCard({ track }: PricingCardProps) {
  const includedServices = track.serviceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <article
      aria-labelledby={`${track.id}-plan-title`}
      className={`bg-canvas hover:shadow-soft h-full rounded-2xl border p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none sm:p-8 ${
        track.highlighted
          ? "border-brand/25"
          : "border-border"
      }`}
    >
      <div className="grid h-full gap-10 md:grid-cols-2 md:gap-0">
        <div className="border-border flex flex-col justify-between gap-10 md:border-r md:pr-8">
          <div className="flex flex-col gap-4">
            <h3
              id={`${track.id}-plan-title`}
              className={`w-fit rounded-full px-4 py-2 text-base font-medium text-white ${
                track.highlighted ? "bg-brand" : "bg-ink"
              }`}
            >
              {track.title}
            </h3>
            <p className="text-body">{track.description}</p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="text-ink text-lg leading-snug font-medium">
                {track.priceNote}
              </p>
              <p className="text-body/80 text-sm">
                Final scope and price confirmed on a quick call — no
                surprises.
              </p>
            </div>
            <ButtonLink
              href={track.cta.href}
              variant={track.highlighted ? "brand" : "dark"}
              icon={ArrowUpRight}
              className="w-fit pr-2"
            >
              {track.cta.label}
            </ButtonLink>
            <p className="text-body/70 text-xs font-medium">
              Run personally by our co-founders — no hand-offs.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:pl-8">
          <h4 className="text-ink text-lg">Includes</h4>
          <ul className="flex flex-col gap-3">
            {includedServices.map((service) => (
              <PricingFeature
                key={service.id}
                icon={service.icon}
                highlighted={track.highlighted}
              >
                {service.title}
              </PricingFeature>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
