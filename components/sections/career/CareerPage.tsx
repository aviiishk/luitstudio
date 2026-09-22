import {
  ArrowDownRight,
  ArrowUpRight,
  Brush,
  Code2,
  MapPin,
  Megaphone,
  Play,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  CareerOrbitGraphic,
  CareerPracticeGraphic,
  CareerProcessGraphic,
} from "@/components/sections/career/CareerIllustrations";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";
import type { JobOpening } from "@/types/career";

interface CareerPageProps {
  openings: JobOpening[];
}

const values = [
  {
    label: "Own the outcome",
    detail: "Bring care to the last ten percent, not just the first idea.",
    color: "#4928fd",
  },
  {
    label: "Make it clearer",
    detail:
      "Good work earns attention by making something easier to understand.",
    color: "#f4889a",
  },
  {
    label: "Stay curious",
    detail: "Ask better questions, learn quickly, and keep the work moving.",
    color: "#79d45e",
  },
] as const;

const roleLanes = [
  {
    title: "Product designers",
    detail: "Make complex things feel obvious.",
    icon: Brush,
    color: "#4928fd",
  },
  {
    title: "Developers",
    detail: "Build systems that stay useful.",
    icon: Code2,
    color: "#70b5ff",
  },
  {
    title: "Visual designers",
    detail: "Give good ideas a point of view.",
    icon: Sparkles,
    color: "#f4889a",
  },
  {
    title: "Editors and makers",
    detail: "Make stories impossible to skip.",
    icon: Play,
    color: "#ba81ee",
  },
] as const;

const departmentStyles: Record<string, { color: string; icon: LucideIcon }> = {
  Design: { color: "#4928fd", icon: Brush },
  Engineering: { color: "#155b8a", icon: Code2 },
  Content: { color: "#6d3b98", icon: Play },
  Marketing: { color: "#2f6b24", icon: Megaphone },
};
const defaultDepartmentStyle = { color: "#9e3e50", icon: Sparkles };

export function CareerPage({ openings }: CareerPageProps) {
  const hasOpenings = openings.length > 0;

  return (
    <main id="main-content">
      <section className="relative overflow-hidden pt-20 pb-10 md:pb-12">
        <Container className="grid min-h-0 items-center gap-8 lg:min-h-[620px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
          <div className="flex max-w-3xl flex-col items-start gap-6">
            <Reveal delay={0.04}>
              <span className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
                Careers at Luit Studio
              </span>
            </Reveal>

            <AnimatedHeadline
              as="h1"
              id="career-hero-heading"
              text="Make work that"
              secondLineText="moves people"
              italicText="forward."
              delay={0.06}
              className="text-ink max-w-4xl text-[clamp(2.75rem,5.8vw,5.1rem)] leading-[0.96] tracking-[-0.04em] text-balance"
              italicClassName="font-display pb-1 font-normal leading-[1.12]"
            />

            <Reveal delay={0.18}>
              <p className="text-body max-w-lg text-base leading-7 sm:text-lg sm:leading-8">
                {hasOpenings ? (
                  <>
                    We are a small design and build studio in Guwahati.{" "}
                    {openings.length === 1
                      ? "There is one open role"
                      : `There are ${openings.length} open roles`}{" "}
                    below, and we are always interested in meeting thoughtful
                    people who care about useful, beautiful work.
                  </>
                ) : (
                  <>
                    We are a small design and build studio in Guwahati. There
                    is no open role today, but we are always interested in
                    meeting thoughtful people who care about useful, beautiful
                    work.
                  </>
                )}
              </p>
            </Reveal>

            <Reveal delay={0.24} className="flex flex-wrap gap-3">
              <ButtonLink
                href={ROUTES.careerApply}
                variant="brand"
                icon={ArrowUpRight}
              >
                Send your work
              </ButtonLink>
              <ButtonLink href="#roles" variant="outline" icon={ArrowDownRight}>
                {hasOpenings ? "See open roles" : "Find your lane"}
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <CareerOrbitGraphic />
          </Reveal>
        </Container>
      </section>

      <section
        aria-labelledby="career-values-heading"
        className="border-border border-y bg-white py-12 md:py-14 xl:py-16"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_2.18fr] lg:items-start lg:gap-12">
            <Reveal className="max-w-sm">
              <p className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
                The working agreement
              </p>
              <h2
                id="career-values-heading"
                className="text-ink mt-3 text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.02] tracking-[-0.035em] text-balance"
              >
                Good people make{" "}
                <em className="font-display leading-[1.12] font-normal">
                  good work.
                </em>
              </h2>
            </Reveal>

            <div className="grid gap-3 md:grid-cols-3">
              {values.map((value, index) => (
                <Reveal
                  key={value.label}
                  delay={0.05 + index * 0.06}
                  className="border-border border-t pt-4"
                >
                  <span
                    className="mb-6 block size-3 rounded-full"
                    style={{ backgroundColor: value.color }}
                  />
                  <h3 className="text-ink text-lg font-semibold">
                    {value.label}
                  </h3>
                  <p className="text-body mt-2 text-sm leading-6">
                    {value.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="career-studio-heading"
        className="bg-[#f7f5ff] py-12 md:py-14 xl:py-16"
      >
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <div className="flex flex-col gap-6">
            <Reveal className="max-w-xl">
              <p className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
                Life at Luit
              </p>
              <h2
                id="career-studio-heading"
                className="text-ink mt-3 text-[clamp(2.25rem,5vw,3.8rem)] leading-[1.02] tracking-[-0.035em] text-balance"
              >
                Small team.{" "}
                <em className="font-display leading-[1.12] font-normal">
                  Serious output.
                </em>
              </h2>
              <p className="text-body mt-5 max-w-lg text-base leading-7 sm:text-lg">
                You will work close to the people making the decisions, across
                product, brand, content and the spaces between them.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="grid gap-3 text-sm sm:grid-cols-2">
                {[
                  "Direct access to the founders",
                  "Ownership from first thought to final release",
                  "A mix of product, brand and motion work",
                  "Room to shape how the studio works",
                ].map((item) => (
                  <li
                    key={item}
                    className="border-border/70 flex items-start gap-2 border-t pt-3"
                  >
                    <span className="bg-brand mt-1 size-2 shrink-0 rounded-full" />
                    <span className="text-body leading-5">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <CareerPracticeGraphic />
          </Reveal>
        </Container>
      </section>

      <section
        id="roles"
        aria-labelledby="career-roles-heading"
        className="bg-surface/55 scroll-mt-24 py-12 md:py-14 xl:py-16"
      >
        <Container className="flex flex-col gap-8 md:gap-10">
          <Reveal className="flex max-w-3xl flex-col gap-3">
            <p className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
              {hasOpenings ? "Open roles" : "Open invitation"}
            </p>
            <h2
              id="career-roles-heading"
              className="text-ink text-[clamp(2rem,4.5vw,3.3rem)] leading-[1.04] tracking-[-0.035em] text-balance"
            >
              {hasOpenings ? (
                <>
                  Roles we are{" "}
                  <em className="font-display leading-[1.12] font-normal">
                    hiring for now.
                  </em>
                </>
              ) : (
                <>
                  We are always open to a{" "}
                  <em className="font-display leading-[1.12] font-normal">
                    strong introduction.
                  </em>
                </>
              )}
            </h2>
            <p className="text-body max-w-xl text-base leading-7">
              {hasOpenings
                ? "Apply below, or send your work anyway if none of these are quite right."
                : "This is not an active job board. Think of it as an open door for the people who can make the work sharper."}
            </p>
          </Reveal>

          {hasOpenings ? (
            <div className="grid gap-4 md:grid-cols-2">
              {openings.map((opening, index) => {
                const style =
                  (opening.department && departmentStyles[opening.department]) ||
                  defaultDepartmentStyle;
                const Icon = style.icon;

                return (
                  <Reveal key={opening.id} delay={0.04 + index * 0.05}>
                    <Link
                      href={`${ROUTES.careerApply}/${opening.slug}`}
                      className="group border-border bg-canvas relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgb(27_29_30/10%)] focus-visible:-translate-y-1 motion-reduce:transform-none"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ backgroundColor: style.color }}
                      />

                      <div className="flex items-start justify-between gap-4">
                        <span
                          className="grid size-11 shrink-0 place-items-center rounded-xl"
                          style={{
                            backgroundColor: `${style.color}16`,
                            color: style.color,
                          }}
                        >
                          <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                        </span>
                        <span className="text-green-ink flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap">
                          <span className="relative flex size-2">
                            <span className="bg-green-ink absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
                            <span className="bg-green-ink relative inline-flex size-2 rounded-full" />
                          </span>
                          Hiring now
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                          {opening.department ? (
                            <span
                              className="rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide uppercase"
                              style={{
                                backgroundColor: `${style.color}14`,
                                color: style.color,
                              }}
                            >
                              {opening.department}
                            </span>
                          ) : null}
                          <span className="bg-surface text-body rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide uppercase">
                            {opening.employmentType}
                          </span>
                        </div>
                        <h3 className="text-ink text-xl font-semibold">
                          {opening.title}
                        </h3>
                        <p className="text-body text-sm leading-6">
                          {opening.summary}
                        </p>
                      </div>

                      <div className="border-border mt-auto flex items-center justify-between gap-4 border-t pt-4">
                        <span className="text-body/70 flex items-center gap-1.5 text-xs">
                          <MapPin aria-hidden="true" size={13} />
                          {opening.location}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                          style={{ color: style.color }}
                        >
                          Apply now
                          <ArrowUpRight aria-hidden="true" size={15} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {roleLanes.map((role, index) => {
                const Icon = role.icon;

                return (
                  <Reveal key={role.title} delay={0.04 + index * 0.05}>
                    <ButtonLink
                      href={`${ROUTES.careerApply}?role=${encodeURIComponent(role.title)}`}
                      variant="outline"
                      className="group border-border bg-canvas flex min-h-32 w-full items-end justify-between gap-6 rounded-xl border p-5 text-left transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(27_29_30/8%)] focus-visible:-translate-y-1 motion-reduce:transform-none"
                    >
                      <span>
                        <span
                          className="mb-8 grid size-9 place-items-center rounded-lg"
                          style={{
                            backgroundColor: role.color + "16",
                            color: role.color,
                          }}
                        >
                          <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
                        </span>
                        <span className="text-ink block text-lg font-semibold">
                          {role.title}
                        </span>
                        <span className="text-body mt-1 block text-sm leading-5">
                          {role.detail}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="text-body/45 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        size={20}
                      />
                    </ButtonLink>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section
        id="process"
        aria-labelledby="career-process-heading"
        className="scroll-mt-24 py-12 md:py-14 xl:py-16"
      >
        <Container className="flex flex-col gap-8">
          <Reveal className="max-w-2xl">
            <p className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
              The first conversation
            </p>
            <h2
              id="career-process-heading"
              className="text-ink mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.04] tracking-[-0.035em] text-balance"
            >
              See where a good fit{" "}
              <em className="font-display leading-[1.12] font-normal">
                could take us.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <CareerProcessGraphic />
          </Reveal>
        </Container>
      </section>

      <section
        aria-labelledby="career-cta-heading"
        className="bg-[#fffaf3] py-14 md:py-16 xl:py-20"
      >
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <span className="font-handwriting text-body/60 -rotate-2 text-xl">
              bring your point of view
            </span>
          </Reveal>
          <AnimatedHeadline
            as="h2"
            id="career-cta-heading"
            text="Have a point of view?"
            secondLineText="Let's"
            italicText="hear it."
            delay={0.05}
            animateOnView
            className="text-ink mx-auto max-w-2xl text-[clamp(2.25rem,5.5vw,3.85rem)] leading-[1.05] tracking-[-0.035em] text-balance"
            italicClassName="font-display pb-1 font-normal leading-[1.12]"
          />
          <Reveal delay={0.12}>
            <p className="text-body max-w-md text-base leading-7">
              Tell us what you make, what you want to learn, and where you think
              you could make the work better.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ButtonLink
              href={ROUTES.careerApply}
              variant="brand"
              icon={ArrowUpRight}
            >
              Start a conversation
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
