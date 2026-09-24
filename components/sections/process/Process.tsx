import {
  ChevronRight,
  FileText,
  Layers,
  PenLine,
  Phone,
  Rocket,
  Users,
} from "lucide-react";
import Image from "next/image";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

// Deliberately generic (no specific timelines promised) — the studio
// hasn't committed to a fixed turnaround, so this describes the shape of
// an engagement, not a schedule.
const steps = [
  {
    id: "discovery-call",
    icon: Phone,
    title: "Discovery Call",
    description: "We learn about your goals, ideas, and what you need.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    numberColor: "text-blue-600",
    ringColor: "ring-blue-50",
  },
  {
    id: "proposal",
    icon: FileText,
    title: "Proposal",
    description:
      "A tailored plan with scope, timeline, and pricing — no surprises.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    numberColor: "text-emerald-600",
    ringColor: "ring-emerald-50",
  },
  {
    id: "planning",
    icon: PenLine,
    title: "Planning",
    description: "We map the roadmap together and lock the final scope.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    numberColor: "text-orange-600",
    ringColor: "ring-orange-50",
  },
  {
    id: "design-development",
    icon: Layers,
    title: "Design & Development",
    description:
      "Our team builds it, with regular updates and previews along the way.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    numberColor: "text-violet-600",
    ringColor: "ring-violet-50",
  },
  {
    id: "review-feedback",
    icon: Users,
    title: "Review & Feedback",
    description: "We refine the work against your feedback until it's right.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    numberColor: "text-pink-600",
    ringColor: "ring-pink-50",
  },
  {
    id: "launch-support",
    icon: Rocket,
    title: "Launch & Support",
    description: "We go live, hand everything over, and stay on for support.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    numberColor: "text-blue-600",
    ringColor: "ring-blue-50",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-12 sm:py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col gap-10 sm:gap-14 md:gap-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="bg-border h-px w-8" />
            <span className="text-body text-xs font-semibold tracking-[0.18em] uppercase">
              Our Process
            </span>
            <span aria-hidden="true" className="bg-border h-px w-8" />
          </div>

          <AnimatedHeadline
            as="h2"
            id="process-heading"
            text="How a project"
            italicText="actually works"
            delay={0.05}
            animateOnView
            className="text-ink max-w-lg text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
            italicClassName="font-display font-normal"
          />

          <p className="text-body max-w-lg text-sm leading-6 sm:text-base">
            A clear, transparent process from the first call to the final
            launch — so you always know what&apos;s happening, and
            what&apos;s next.
          </p>
        </div>

        <div className="relative lg:pt-24">
          <div className="pointer-events-none absolute top-0 left-0 hidden -rotate-3 flex-col items-start gap-1 lg:flex">
            <span className="font-handwriting text-brand/85 text-lg leading-tight">
              It starts
              <br />
              with a conversation
            </span>
            <Image
              src="/images/illustrations/process-arrow-start.png"
              alt=""
              width={240}
              height={300}
              className="h-14 w-auto"
            />
          </div>

          <div className="pointer-events-none absolute top-0 right-0 hidden rotate-3 flex-col items-end gap-1 text-right lg:flex">
            <span className="font-handwriting text-brand/85 text-lg leading-tight">
              From idea
              <br />
              to impact
            </span>
            <Image
              src="/images/illustrations/process-arrow-end.png"
              alt=""
              width={240}
              height={300}
              className="h-14 w-auto"
            />
          </div>

          <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:flex lg:items-start lg:gap-x-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 48"
              preserveAspectRatio="none"
              className="text-border pointer-events-none absolute inset-x-0 top-8 hidden h-12 w-full -translate-y-1/2 lg:block"
            >
              <path
                d="M0,24 C100,4 200,44 300,24 C400,4 500,44 600,24 C700,4 800,44 900,24 C1000,4 1100,44 1200,24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>

            <svg
              aria-hidden="true"
              viewBox="0 0 400 900"
              preserveAspectRatio="none"
              className="text-border pointer-events-none absolute inset-0 block h-full w-full md:hidden"
            >
              <path
                d="M100,100 C150,70 250,130 300,100 C380,160 20,390 100,450 C150,420 250,480 300,450 C380,510 20,740 100,800 C150,770 250,830 300,800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <path
                d="M280,780 L305,803 L278,815"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.id}
                  className="flex items-start lg:basis-0 lg:grow"
                >
                  <Reveal delay={0.05 + index * 0.05} className="w-full">
                    <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
                      <span
                        className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full ring-8 sm:size-16 ${step.iconBg} ${step.iconColor} ${step.ringColor}`}
                      >
                        <Icon
                          aria-hidden="true"
                          size={24}
                          strokeWidth={1.8}
                        />
                      </span>

                      <div>
                        <p className={`text-xs font-bold ${step.numberColor}`}>
                          0{index + 1}
                        </p>
                        <h3 className="text-ink mt-1 text-base font-semibold sm:min-h-12 sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="text-body mt-1.5 hidden text-sm leading-6 sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  {!isLast ? (
                    <div className="hidden h-16 w-10 shrink-0 items-center justify-center lg:flex">
                      <span className="bg-canvas border-border relative z-10 grid size-6 place-items-center rounded-full border">
                        <ChevronRight size={12} className="text-muted" />
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-4 text-center">
          <Image
            src="/images/illustrations/process-paper-plane.png"
            alt=""
            width={480}
            height={160}
            className="pointer-events-none absolute -top-4 right-0 hidden h-auto w-32 sm:block"
          />
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="bg-border h-px w-10" />
            <span className="text-body text-xs font-semibold tracking-[0.18em] uppercase">
              Let&apos;s build something great together
            </span>
            <span aria-hidden="true" className="bg-border h-px w-10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
