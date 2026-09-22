import { GrowthSystemGraphic } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const marketingCapabilities = [
  "Positioning",
  "Campaign strategy",
  "Paid acquisition",
  "Performance analytics",
];

const socialCapabilities = [
  "Creative direction",
  "Publishing rhythm",
  "Community replies",
  "Daily growth loops",
];

export function GrowShowcase() {
  const marketing = services.find((item) => item.id === "digital-marketing");
  const social = services.find((item) => item.id === "social-media-handling");
  if (!marketing || !social) return null;

  return (
    <section
      id="grow"
      aria-labelledby="grow-heading"
      className="scroll-mt-24 py-12 md:py-14 xl:py-16"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-green) 7%, var(--color-canvas))",
      }}
    >
      <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-6">
          <Reveal className="max-w-2xl">
            <p className="text-body/65 text-sm font-semibold">
              Marketing and Social Media
            </p>
            <h2
              id="grow-heading"
              className="text-ink mt-3 text-[clamp(2.25rem,5vw,3.65rem)] leading-[1.04] tracking-[-0.035em] text-balance"
            >
              Being good is not enough{" "}
              <em className="font-display leading-[1.12] font-normal">
                if nobody sees you.
              </em>
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.08} className="rounded-lg bg-white/72 p-4">
              <marketing.icon
                aria-hidden="true"
                size={24}
                style={{ color: marketing.accentColor }}
              />
              <h3 className="text-ink mt-4 text-lg font-semibold">
                Digital Marketing
              </h3>
              <p className="text-body mt-2 text-sm leading-6">
                {marketing.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {marketingCapabilities.map((item) => (
                  <span
                    key={item}
                    className="bg-surface text-body rounded-full px-3 py-1.5 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14} className="rounded-lg bg-white/72 p-4">
              <social.icon
                aria-hidden="true"
                size={24}
                style={{ color: social.accentColor }}
              />
              <h3 className="text-ink mt-4 text-lg font-semibold">
                Social Media Management
              </h3>
              <p className="text-body mt-2 text-sm leading-6">
                {social.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialCapabilities.map((item) => (
                  <span
                    key={item}
                    className="bg-surface text-body rounded-full px-3 py-1.5 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <GrowthSystemGraphic accent={marketing.accentColor} />
        </Reveal>
      </Container>
    </section>
  );
}
