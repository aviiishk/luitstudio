import { AboutExperience } from "@/components/sections/about/AboutExperience";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { pricingPlans } from "@/data/pricing";

const statistics = [
  { label: "Creative Services Under One Roof", value: services.length },
  { label: "Flexible Monthly Plans", value: pricingPlans.length },
  { label: "End-to-End Creative Studio", value: 1 },
] as const;

export function AboutStats() {
  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-0">
      {statistics.map((statistic, index) => (
        <Reveal key={statistic.label} delay={0.08 + index * 0.08}>
          <AboutExperience
            label={statistic.label}
            value={statistic.value}
            divider={index < statistics.length - 1}
          />
        </Reveal>
      ))}
    </div>
  );
}
