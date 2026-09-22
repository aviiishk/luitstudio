import {
  ArrowUpRight,
  Brush,
  Code2,
  Compass,
  Layers3,
  MessageCircle,
  Play,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IllustrationProps = {
  className?: string;
};

function SignalCard({
  label,
  detail,
  icon: Icon,
  accent,
  className,
}: {
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: string;
  className: string;
}) {
  return (
    <div
      className={
        "luit-float-a border-border absolute hidden w-36 rounded-xl border bg-white p-3 shadow-[0_16px_40px_rgb(27_29_30/10%)] sm:block " +
        className
      }
    >
      <span
        className="grid size-8 place-items-center rounded-lg"
        style={{ backgroundColor: accent + "18", color: accent }}
      >
        <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
      </span>
      <span className="text-ink mt-3 block text-sm font-semibold">{label}</span>
      <span className="text-body mt-1 block text-[0.68rem] leading-4">
        {detail}
      </span>
    </div>
  );
}

export function CareerOrbitGraphic({ className = "" }: IllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={
        "relative mx-auto aspect-[1.06] w-full max-w-[640px] overflow-hidden rounded-xl border border-[#ded9ff] bg-[#f7f5ff] p-5 " +
        className
      }
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 600"
        fill="none"
      >
        <path
          className="luit-draw-line"
          d="M102 174 C194 80 248 208 320 130 C400 44 458 148 548 94"
          stroke="#4928fd"
          strokeDasharray="7 10"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="luit-draw-line luit-delay-1"
          d="M86 430 C188 320 244 482 330 386 C414 290 456 416 564 336"
          stroke="#f4889a"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="luit-draw-line luit-delay-2"
          d="M136 520 C244 456 322 536 414 476 C472 438 514 470 558 448"
          stroke="#79d45e"
          strokeDasharray="5 9"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>

      <span className="font-handwriting text-body/60 absolute top-5 left-6 -rotate-3 text-xl">
        work with intent
      </span>
      <span className="font-handwriting text-body/60 absolute right-6 bottom-5 rotate-2 text-xl">
        make room for ideas
      </span>

      <div className="absolute top-1/2 left-1/2 z-10 w-[45%] -translate-x-1/2 -translate-y-1/2 -rotate-2">
        <div className="border-border/80 shadow-floating overflow-hidden rounded-xl border bg-white p-2">
          <div className="border-border flex items-center gap-1.5 border-b px-2 py-1.5">
            <span className="size-1.5 rounded-full bg-[#f06d6d]" />
            <span className="size-1.5 rounded-full bg-[#f6d66d]" />
            <span className="size-1.5 rounded-full bg-[#79d45e]" />
            <span className="border-border bg-surface/70 ml-2 h-3.5 flex-1 rounded-full border" />
          </div>
          <div className="bg-[#fffaf3] px-4 py-7 text-center">
            <span className="text-body/55 text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
              Luit Studio
            </span>
            <p className="text-ink mt-3 text-[clamp(1.2rem,3vw,2.4rem)] leading-[0.9] tracking-[-0.04em]">
              Good work
              <br />
              <em className="font-display text-[1.18em] font-normal">
                travels.
              </em>
            </p>
            <span className="bg-brand mx-auto mt-5 block h-1.5 w-12 rounded-full" />
          </div>
        </div>
      </div>

      <SignalCard
        label="Build"
        detail="Make the idea useful."
        icon={Code2}
        accent="#4928fd"
        className="top-[17%] left-[4%] -rotate-6"
      />
      <SignalCard
        label="Design"
        detail="Make the path clear."
        icon={Brush}
        accent="#f4889a"
        className="top-[9%] right-[5%] rotate-5"
      />
      <SignalCard
        label="Think together"
        detail="No layers between the work and the people making it."
        icon={Users}
        accent="#79d45e"
        className="bottom-[8%] left-[5%] rotate-4"
      />
      <SignalCard
        label="Tell better stories"
        detail="Give good ideas a point of view."
        icon={Play}
        accent="#ba81ee"
        className="right-[4%] bottom-[18%] -rotate-5"
      />

      <span className="luit-glow-node bg-brand absolute top-[46%] left-[23%] size-3 rounded-full" />
      <span className="bg-rose absolute top-[28%] right-[25%] size-2.5 rotate-45" />
      <span className="border-green absolute right-[19%] bottom-[26%] size-3 rounded-full border-2" />
    </div>
  );
}

export function CareerPracticeGraphic({ className = "" }: IllustrationProps) {
  const lanes = [
    { label: "Question", icon: Compass, color: "#4928fd" },
    { label: "Make", icon: Layers3, color: "#f4889a" },
    { label: "Share", icon: MessageCircle, color: "#79d45e" },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={
        "border-border relative min-h-[310px] overflow-hidden rounded-xl border bg-white p-5 " +
        className
      }
    >
      <span className="font-handwriting text-body/60 absolute top-5 right-6 rotate-2 text-xl">
        a studio that stays close
      </span>
      <div className="absolute inset-x-8 top-20 bottom-8 grid grid-cols-3 gap-3">
        {lanes.map((lane, index) => {
          const Icon = lane.icon;

          return (
            <div
              key={lane.label}
              className="relative flex flex-col items-center"
            >
              <div
                className="luit-float-b grid size-12 place-items-center rounded-full"
                style={{
                  backgroundColor: lane.color + "16",
                  color: lane.color,
                  animationDelay: index * 0.18 + "s",
                }}
              >
                <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
              </div>
              <span className="text-ink mt-3 text-sm font-semibold">
                {lane.label}
              </span>
              <span className="text-body mt-1 text-center text-[0.68rem] leading-4">
                {index === 0
                  ? "Stay curious."
                  : index === 1
                    ? "Own the outcome."
                    : "Make it clearer."}
              </span>
              {index < lanes.length - 1 ? (
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-border absolute top-5 -right-5"
                  size={18}
                />
              ) : null}
              <span
                className="absolute top-20 bottom-0 w-px"
                style={{ backgroundColor: lane.color + "35" }}
              />
            </div>
          );
        })}
      </div>
      <div className="bg-surface absolute right-8 bottom-5 left-8 h-2 rounded-full">
        <span className="bg-brand block h-full w-[68%] rounded-full" />
      </div>
    </div>
  );
}

export function CareerProcessGraphic({ className = "" }: IllustrationProps) {
  const steps = [
    { label: "Say hello", icon: MessageCircle },
    { label: "Share your work", icon: Sparkles },
    { label: "Meet the studio", icon: Users },
    { label: "Make something", icon: Code2 },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={
        "border-border relative overflow-hidden rounded-xl border bg-white p-4 " +
        className
      }
    >
      <svg
        className="text-brand pointer-events-none absolute top-20 left-10 hidden h-16 w-[calc(100%-5rem)] sm:block"
        viewBox="0 0 800 80"
        preserveAspectRatio="none"
      >
        <path
          className="luit-draw-line"
          d="M30 38 C166 4 214 72 344 38 C470 4 550 72 770 30"
          fill="none"
          stroke="currentColor"
          strokeDasharray="6 10"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
      <div className="relative grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="luit-float-b flex min-h-28 flex-col items-center justify-center text-center"
              style={{ animationDelay: index * 0.16 + "s" }}
            >
              <span className="border-border bg-canvas text-brand shadow-soft grid size-11 place-items-center rounded-full border">
                <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
              </span>
              <span className="text-ink mt-3 text-sm font-semibold">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
