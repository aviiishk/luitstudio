import { MapPin } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Happy Clients" },
  { value: "1", label: "Mission" },
] as const;

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 md:pt-40 md:pb-24 xl:pt-[180px] xl:pb-28"
    >
      <Container className="mx-auto grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-start gap-6 text-left">
          <Reveal delay={0.02}>
            <span className="text-brand text-xs font-semibold tracking-[0.16em] uppercase">
              Our Story
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              id="about-hero-heading"
              className="text-ink text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[1.06] tracking-[-0.03em] text-balance"
            >
              Built by the river,
              <br />
              <em className="font-display text-brand font-normal">
                for a bigger world.
              </em>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-body max-w-md text-base sm:text-lg">
              Luit Studio is a creative digital studio from Guwahati, Assam.
              Ideas flow, people collaborate, and digital products take
              shape.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <ButtonLink href="#origin" variant="brand" className="pr-2">
              Our Story
            </ButtonLink>
          </Reveal>

          <Reveal
            delay={0.18}
            className="border-border flex items-center gap-8 border-t pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-ink text-2xl font-semibold">
                  {stat.value}
                </span>
                <span className="text-body text-xs">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/illustrations/about-hero-landscape.png"
              alt="Guwahati, on the Brahmaputra's south bank"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>

          <span className="bg-canvas border-border text-ink absolute -top-4 left-5 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm">
            <MapPin aria-hidden="true" size={14} className="text-brand" />
            Guwahati, Assam, India
          </span>

          <span className="font-handwriting text-brand/80 absolute -top-10 -right-4 hidden -rotate-6 text-xl leading-tight lg:block">
            Ideas flow like a river.
            <br />
            Keep moving.
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
