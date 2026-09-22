import { VideoMotionGraphic } from "@/components/sections/services/ServiceIllustrations";
import { services } from "@/components/sections/services/service-data";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

export function ContentShowcase() {
  const videoService = services.find((item) => item.id === "video-editing");
  const motionService = services.find((item) => item.id === "motion-graphics");
  if (!videoService || !motionService) return null;

  return (
    <section
      id="content"
      aria-labelledby="content-heading"
      className="scroll-mt-24 py-12 md:py-14 xl:py-16"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-violet) 6%, var(--color-canvas))",
      }}
    >
      <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <Reveal className="lg:order-2">
          <VideoMotionGraphic accent={motionService.accentColor} />
        </Reveal>

        <div className="flex flex-col gap-6 lg:order-1">
          <Reveal className="max-w-2xl">
            <p className="text-body/65 text-sm font-semibold">
              Video and Motion
            </p>
            <h2
              id="content-heading"
              className="text-ink mt-3 text-[clamp(2.35rem,5.5vw,3.85rem)] leading-[1.04] tracking-[-0.035em] text-balance"
            >
              Make people{" "}
              <em className="font-display leading-[1.12] font-normal">
                stop scrolling.
              </em>
            </h2>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08} className="rounded-lg bg-white/75 p-4">
              <div className="flex items-center gap-3">
                <videoService.icon
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.6}
                  style={{ color: videoService.accentColor }}
                />
                <h3 className="text-ink text-lg font-semibold">
                  Video Editing
                </h3>
              </div>
              <p className="text-body mt-3 text-sm leading-6 sm:text-base">
                Documentaries, YouTube videos, brand films, reels, and
                short-form social content — cut for how each platform is
                actually watched.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="rounded-lg bg-white/75 p-4">
              <div className="flex items-center gap-3">
                <motionService.icon
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.6}
                  style={{ color: motionService.accentColor }}
                />
                <h3 className="text-ink text-lg font-semibold">
                  Motion Graphics
                </h3>
              </div>
              <p className="text-body mt-3 text-sm leading-6 sm:text-base">
                Animated identities, typography, explainers, and product
                motion — the titles and graphics that make footage feel
                alive.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
