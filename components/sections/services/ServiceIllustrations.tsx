import {
  BarChart3,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Layers3,
  LineChart,
  Megaphone,
  MessageSquare,
  MousePointer2,
  Palette,
  PanelsTopLeft,
  PenTool,
  Play,
  Rocket,
  Send,
  Server,
  Share2,
  Sparkles,
  Type,
  WandSparkles,
  Webhook,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IllustrationProps = {
  accent?: string;
  className?: string;
};

function Note({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-handwriting text-body/60 absolute text-lg ${className}`}
    >
      {children}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-body/65 text-[0.7rem] font-semibold tracking-[0.08em]">
      {children}
    </span>
  );
}

function DiagramNode({
  icon: Icon,
  label,
  accent = "var(--color-brand)",
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`border-border/70 bg-canvas shadow-soft absolute flex items-center gap-2 rounded-2xl border px-3 py-2 ${className}`}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `${accent}1f`, color: accent }}
      >
        <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
      </span>
      <Label>{label}</Label>
    </div>
  );
}

export function CategoryMiniIllustration({
  kind,
  accent,
}: {
  kind: "Build" | "Design" | "Grow" | "Tell";
  accent: string;
}) {
  if (kind === "Build") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-white/70 p-4">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 112">
          <path
            className="luit-draw-line"
            d="M43 64 C78 30 126 84 174 43"
            fill="none"
            stroke={accent}
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
        <div className="border-border absolute top-4 left-5 h-16 w-24 rounded-xl border bg-white shadow-sm">
          <div className="border-border flex gap-1 border-b px-2 py-1.5">
            <span className="bg-surface size-1.5 rounded-full" />
            <span className="bg-surface size-1.5 rounded-full" />
            <span className="bg-surface size-1.5 rounded-full" />
          </div>
          <div className="p-2">
            <span
              className="block h-2 w-12 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="bg-surface mt-2 block h-5 rounded-md" />
          </div>
        </div>
        <div className="border-border absolute right-7 bottom-4 h-20 w-10 rounded-xl border bg-white p-1.5 shadow-sm">
          <span
            className="block h-full rounded-lg"
            style={{ backgroundColor: `${accent}24` }}
          />
        </div>
      </div>
    );
  }

  if (kind === "Design") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-white/70 p-4">
        <div className="border-border absolute top-5 left-5 h-16 w-24 -rotate-6 rounded-xl border bg-white p-3 shadow-sm">
          <Type aria-hidden="true" size={34} style={{ color: accent }} />
          <span className="bg-surface mt-2 block h-1.5 w-full rounded-full" />
        </div>
        <div className="absolute right-5 bottom-5 grid grid-cols-2 gap-1.5">
          {[
            "var(--color-yellow)",
            "var(--color-rose)",
            "var(--color-green)",
            "var(--color-sky)",
          ].map((color) => (
            <span
              key={color}
              className="size-6 rounded-md"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <PenTool
          className="absolute top-4 right-16"
          size={26}
          style={{ color: accent }}
        />
      </div>
    );
  }

  if (kind === "Grow") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-white/70 p-4">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 112">
          <path
            className="luit-draw-line"
            d="M34 82 L70 69 L105 75 L142 43 L186 31"
            fill="none"
            stroke={accent}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
          {[34, 70, 105, 142, 186].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={[82, 69, 75, 43, 31][index]}
              fill="white"
              r="4"
              stroke={accent}
              strokeWidth="2"
            />
          ))}
        </svg>
        <Megaphone
          className="absolute top-5 left-5"
          size={26}
          style={{ color: accent }}
        />
        <Share2
          className="absolute right-7 bottom-6"
          size={22}
          style={{ color: accent }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-28 overflow-hidden rounded-2xl bg-white/70 p-4">
      <div className="bg-ink absolute top-5 left-5 h-14 w-28 rounded-xl p-2">
        <div className="flex justify-between">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="size-1 rounded-sm bg-white/25" />
          ))}
        </div>
        <Play className="mx-auto mt-2 text-white" size={20} />
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 112">
        <path
          className="luit-draw-line"
          d="M42 88 C80 62 118 104 174 70"
          fill="none"
          stroke={accent}
          strokeDasharray="4 5"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
      <span
        className="absolute right-10 bottom-9 size-4 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <span
        className="absolute right-20 bottom-5 size-4 rotate-45"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}

export function BuildTechnicalDiagram({
  accent = "var(--color-brand)",
  className = "",
}: IllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={`border-border/70 shadow-floating relative min-h-[360px] overflow-hidden rounded-xl border bg-white p-4 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 430">
        <path
          className="luit-draw-line"
          d="M150 184 C244 86 375 92 488 148"
          fill="none"
          stroke={accent}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="luit-draw-line luit-delay-1"
          d="M166 252 C270 330 386 320 506 254"
          fill="none"
          stroke={accent}
          strokeDasharray="7 9"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="luit-draw-line luit-delay-2"
          d="M316 130 L318 306"
          fill="none"
          stroke="var(--color-border)"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>

      <Note className="top-6 left-8 -rotate-3">build something useful</Note>
      <Note className="right-9 bottom-7 rotate-2">
        deploy, measure, improve
      </Note>

      <div className="border-border bg-canvas absolute top-24 left-8 w-[54%] rounded-2xl border shadow-lg">
        <div className="border-border flex items-center gap-2 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#f06d6d]" />
          <span className="size-2.5 rounded-full bg-[#f6d66d]" />
          <span className="size-2.5 rounded-full bg-[#79d45e]" />
          <span className="border-border bg-surface/60 ml-4 h-5 flex-1 rounded-full border" />
        </div>
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 p-5">
          <div>
            <span
              className="block h-3 w-24 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span
              className="mt-4 block h-20 rounded-2xl"
              style={{ backgroundColor: `${accent}18` }}
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <span key={item} className="bg-surface h-12 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="border-border bg-surface/50 rounded-2xl border p-3">
            <Code2 size={20} style={{ color: accent }} />
            <span className="mt-4 block h-2 w-full rounded-full bg-white" />
            <span className="mt-2 block h-2 w-3/4 rounded-full bg-white" />
            <span className="mt-5 block h-12 rounded-xl bg-white" />
          </div>
        </div>
      </div>

      <div className="border-border bg-canvas absolute right-10 bottom-20 h-48 w-24 rotate-3 rounded-[1.7rem] border p-2 shadow-xl">
        <div
          className="h-full rounded-[1.25rem] p-3"
          style={{ backgroundColor: `${accent}12` }}
        >
          <span
            className="block h-2 w-10 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="mt-4 block h-20 rounded-xl bg-white" />
          <span className="mt-3 block h-2 w-full rounded-full bg-white" />
          <span className="mt-2 block h-2 w-2/3 rounded-full bg-white" />
        </div>
      </div>

      <DiagramNode
        icon={Webhook}
        label="API"
        accent={accent}
        className="top-16 right-32"
      />
      <DiagramNode
        icon={Database}
        label="Database"
        accent={accent}
        className="bottom-14 left-24"
      />
      <DiagramNode
        icon={Cloud}
        label="Cloud"
        accent={accent}
        className="top-36 right-9"
      />
      <DiagramNode
        icon={Server}
        label="Backend"
        accent={accent}
        className="bottom-24 left-[45%]"
      />
    </div>
  );
}

export function AutomationWorkflowGraphic({
  className = "",
}: IllustrationProps) {
  const stages = [
    { label: "Input", detail: "Customer message", icon: MessageSquare },
    { label: "AI core", detail: "Understands intent", icon: Bot },
    { label: "Decision", detail: "Routes the request", icon: WandSparkles },
    { label: "Automation", detail: "Updates the system", icon: Database },
    { label: "Result", detail: "Sends the response", icon: Send },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_100px_rgb(73_40_253/20%)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(112,181,255,0.22),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(186,129,238,0.16),transparent_34%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 220">
        <path
          className="luit-draw-line"
          d="M42 126 C138 48 230 178 320 104 C402 36 470 154 526 90"
          fill="none"
          stroke="rgba(112,181,255,0.55)"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
      <div className="relative mx-auto grid max-w-3xl gap-2 sm:grid-cols-5">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isCore = stage.label === "AI core";
          return (
            <div
              key={stage.label}
              className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border p-3 text-center ${
                isCore
                  ? "border-sky/40 bg-sky/10 shadow-[0_0_35px_rgba(112,181,255,0.28)]"
                  : "border-white/10 bg-white/[0.06]"
              }`}
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                  isCore
                    ? "luit-glow-node bg-sky/20 text-sky"
                    : "bg-white/10 text-white/80"
                }`}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">
                  {stage.label}
                </span>
                <span className="mt-0.5 block text-[0.68rem] leading-4 text-white/58">
                  {stage.detail}
                </span>
              </span>
              {index > 0 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -top-5 left-1/2 hidden -translate-x-1/2 rotate-90 text-white/30 sm:top-1/2 sm:-left-3 sm:block sm:rotate-0"
                  size={15}
                />
              ) : null}
              {index < stages.length - 1 ? (
                <span
                  className="luit-data-drop bg-sky absolute -bottom-2 left-1/2 size-1.5 rounded-full"
                  style={{ animationDelay: `${index * 0.38}s` }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DesignSystemGraphic({
  accent = "var(--color-rose)",
  className = "",
}: IllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={`border-border/70 shadow-floating relative min-h-[360px] overflow-hidden rounded-xl border bg-white p-4 ${className}`}
    >
      <Note className="top-8 right-8 rotate-2">good design works</Note>
      <div className="border-border bg-surface/70 absolute top-16 left-8 h-44 w-44 -rotate-6 rounded-2xl border p-4 shadow-md">
        <span className="text-ink text-sm font-semibold">Wireframe</span>
        <span className="border-border mt-4 block h-8 rounded-xl border bg-white" />
        <span className="border-border mt-3 block h-16 rounded-xl border border-dashed" />
        <span className="mt-3 block h-2 w-24 rounded-full bg-white" />
      </div>
      <div className="border-border bg-canvas absolute top-9 left-[35%] h-52 w-48 rotate-3 rounded-2xl border p-4 shadow-lg">
        <span className="text-ink text-sm font-semibold">Component</span>
        <button
          className="mt-5 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          Button
        </button>
        <div className="border-border mt-4 rounded-xl border p-3">
          <span className="bg-surface block h-2 w-20 rounded-full" />
          <span className="bg-surface mt-2 block h-2 w-full rounded-full" />
        </div>
      </div>
      <div className="border-border bg-canvas absolute bottom-12 left-20 h-36 w-52 rotate-2 rounded-2xl border p-4 shadow-lg">
        <span className="text-ink text-sm font-semibold">Design system</span>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            "var(--color-brand)",
            "var(--color-rose)",
            "var(--color-yellow)",
            "var(--color-green)",
          ].map((color) => (
            <span
              key={color}
              className="h-9 rounded-xl"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="bg-surface mt-4 block h-2 w-28 rounded-full" />
      </div>
      <div className="border-border bg-canvas absolute right-9 bottom-10 h-72 w-44 -rotate-2 rounded-[1.7rem] border p-3 shadow-xl">
        <div
          className="h-full rounded-[1.25rem] p-4"
          style={{ backgroundColor: `${accent}12` }}
        >
          <span
            className="block h-2 w-16 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="mt-5 block h-24 rounded-2xl bg-white" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <span className="h-12 rounded-xl bg-white" />
            <span className="h-12 rounded-xl bg-white" />
          </div>
          <span
            className="mt-4 block h-9 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
      <MousePointer2
        className="luit-float-b text-ink absolute top-44 right-48"
        size={30}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 430">
        <path
          className="luit-draw-line"
          d="M196 174 C260 108 310 122 364 160 C418 198 434 246 492 256"
          fill="none"
          stroke={accent}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function BrandIdentityGraphic({
  accent = "var(--color-orange)",
  className = "",
}: IllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={`border-border/70 shadow-floating relative min-h-[360px] overflow-hidden rounded-xl border bg-[#fffaf3] p-4 ${className}`}
    >
      <Note className="top-7 right-10 rotate-3">make it recognizable</Note>
      <Note className="bottom-8 left-9 -rotate-3">identity, everywhere</Note>
      <div className="absolute top-14 left-12 h-72 w-48 -rotate-6 rounded-2xl bg-white p-5 shadow-xl">
        <span
          className="font-display text-7xl italic"
          style={{ color: accent }}
        >
          Aa
        </span>
        <span
          className="mt-8 block h-3 w-28 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="bg-surface mt-3 block h-2 w-full rounded-full" />
        <span className="bg-surface mt-2 block h-2 w-3/4 rounded-full" />
        <span className="text-body/60 absolute bottom-5 left-5 text-xs font-semibold">
          Typography sheet
        </span>
      </div>
      <div
        className="absolute top-10 left-[40%] h-64 w-44 rotate-4 rounded-2xl p-5 text-white shadow-xl"
        style={{ backgroundColor: accent }}
      >
        <span className="block h-20 w-20 rounded-full border-4 border-white/85" />
        <span className="mt-8 block h-3 w-28 rounded-full bg-white/80" />
        <span className="mt-3 block h-2 w-full rounded-full bg-white/45" />
        <span className="absolute bottom-5 left-5 text-xs font-semibold text-white/75">
          Poster
        </span>
      </div>
      <div className="border-border absolute top-28 right-14 h-36 w-56 -rotate-3 rounded-2xl border bg-white p-5 shadow-xl">
        <span
          className="grid size-14 place-items-center rounded-full border-2"
          style={{ borderColor: accent }}
        >
          <Sparkles size={20} style={{ color: accent }} />
        </span>
        <span className="text-body/60 absolute top-5 right-5 text-xs font-semibold">
          Business card
        </span>
        <span className="bg-surface absolute bottom-5 left-5 h-2 w-28 rounded-full" />
      </div>
      <div className="border-border absolute bottom-16 left-[32%] h-36 w-56 rotate-2 rounded-2xl border bg-white p-4 shadow-xl">
        <div className="grid grid-cols-4 gap-2">
          {[
            "var(--color-rose)",
            "var(--color-yellow)",
            "var(--color-green)",
            "var(--color-brand)",
          ].map((color) => (
            <span
              key={color}
              className="h-20 rounded-xl"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-body/60 mt-3 block text-xs font-semibold">
          Color palette
        </span>
      </div>
      <div className="border-border absolute right-16 bottom-14 h-44 w-36 rotate-6 rounded-2xl border bg-white p-4 shadow-xl">
        <div
          className="h-24 rounded-xl"
          style={{ backgroundColor: `${accent}20` }}
        />
        <span className="bg-surface mt-3 block h-2 w-full rounded-full" />
        <span className="bg-surface mt-2 block h-2 w-2/3 rounded-full" />
        <span className="text-body/60 mt-3 block text-xs font-semibold">
          Social creative
        </span>
      </div>
    </div>
  );
}

export function GrowthSystemGraphic({
  accent = "var(--color-green)",
  className = "",
}: IllustrationProps) {
  const stages = [
    { label: "Campaign", icon: Megaphone },
    { label: "Content", icon: PenTool },
    { label: "Distribution", icon: Share2 },
    { label: "Analytics", icon: BarChart3 },
    { label: "Growth", icon: LineChart },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`border-border/70 shadow-floating relative min-h-[440px] overflow-hidden rounded-xl border bg-white p-4 ${className}`}
    >
      <Note className="top-7 left-8 -rotate-2">ideas to impact</Note>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 430">
        <path
          className="luit-draw-line"
          d="M78 230 C172 112 304 304 432 170 C494 106 538 138 564 96"
          fill="none"
          stroke={accent}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
      <div className="absolute top-20 right-8 left-8 grid grid-cols-5 gap-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.label}
              className="luit-float-a border-border bg-canvas shadow-soft rounded-2xl border p-3"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span
                className="grid size-10 place-items-center rounded-xl"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                <Icon aria-hidden="true" size={18} />
              </span>
              <span className="text-ink mt-3 block text-xs font-semibold">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="border-border bg-surface/70 absolute bottom-12 left-10 h-40 w-64 rounded-2xl border p-5">
        <span className="text-body/60 text-xs font-semibold">
          Campaign board
        </span>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <span key={item} className="h-12 rounded-xl bg-white" />
          ))}
        </div>
      </div>
      <div className="border-border bg-canvas absolute right-12 bottom-10 h-44 w-60 rounded-2xl border p-5 shadow-lg">
        <span className="text-body/60 text-xs font-semibold">Growth curve</span>
        <svg className="mt-4 h-24 w-full" viewBox="0 0 220 100">
          <path
            d="M8 86 L52 68 L92 72 L132 38 L178 48 L214 12"
            fill="none"
            stroke={accent}
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            className="luit-dash-flow"
            d="M8 86 L52 68 L92 72 L132 38 L178 48 L214 12"
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

export function VideoMotionGraphic({
  accent = "var(--color-violet)",
  className = "",
}: IllustrationProps) {
  const frames = ["#211a38", "#38254d", "#1b3151", "#43273f"];
  const waves = [
    12, 24, 16, 34, 20, 42, 18, 28, 12, 36, 22, 30, 14, 40, 18, 26,
  ];

  return (
    <div
      aria-hidden="true"
      className={`border-border/70 shadow-floating relative overflow-hidden rounded-xl border bg-[#14121b] p-4 text-white ${className}`}
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="aspect-video rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,#302648,#15131d)] p-4">
            <div className="flex justify-between">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className="size-1.5 rounded-sm bg-white/20" />
              ))}
            </div>
            <span className="mx-auto mt-16 grid size-16 place-items-center rounded-full bg-white/10 backdrop-blur">
              <Play className="ml-1 fill-white text-white" size={26} />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {frames.map((color) => (
              <span
                key={color}
                className="h-16 rounded-xl"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <span className="text-sm font-semibold text-white/75">
            Motion path
          </span>
          <svg className="mt-5 h-32 w-full" viewBox="0 0 260 130">
            <path
              className="luit-draw-line"
              d="M24 84 C82 18 139 116 224 46"
              fill="none"
              stroke={accent}
              strokeDasharray="5 7"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle cx="24" cy="84" fill={accent} r="8" />
            <rect
              x="104"
              y="67"
              width="16"
              height="16"
              fill={accent}
              transform="rotate(45 112 75)"
            />
            <circle
              cx="168"
              cy="86"
              fill="none"
              r="8"
              stroke={accent}
              strokeWidth="3"
            />
            <circle cx="224" cy="46" fill={accent} r="8" />
            <circle
              className="luit-orbit-dot"
              cx="24"
              cy="84"
              fill="white"
              r="4"
            />
          </svg>
          <span className="font-handwriting text-lg text-white/55">
            make it move
          </span>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="relative h-36">
          <span className="absolute right-0 bottom-0 left-0 h-px bg-white/12" />
          <span className="luit-playhead absolute top-0 bottom-0 w-px bg-white">
            <span
              className="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </span>
          <div className="grid h-full grid-rows-3 gap-3">
            <div
              className="rounded-xl"
              style={{ backgroundColor: `${accent}40` }}
            />
            <div className="flex items-end gap-1">
              {waves.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-full bg-white/38"
                  style={{ height }}
                />
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((item) => (
                <span key={item} className="h-9 rounded-xl bg-white/10">
                  <span
                    className="mx-auto mt-3 block size-3 rotate-45"
                    style={{ backgroundColor: accent }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessJourneyGraphic({
  className = "",
}: {
  className?: string;
}) {
  const steps = [
    { label: "Discover", detail: "Find the problem", icon: MessageSquare },
    { label: "Define", detail: "Set the direction", icon: CheckCircle2 },
    { label: "Design", detail: "Shape the experience", icon: PenTool },
    { label: "Build", detail: "Make it real", icon: Code2 },
    { label: "Launch", detail: "Ship and improve", icon: Rocket },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`border-border/70 relative min-h-[190px] overflow-hidden rounded-xl border bg-white p-4 ${className}`}
    >
      <svg
        className="absolute inset-0 hidden h-full w-full sm:block"
        viewBox="0 0 920 190"
        preserveAspectRatio="none"
      >
        <path
          className="luit-draw-line"
          d="M60 112 C182 38 260 154 382 86 C500 22 580 150 706 78 C782 36 828 92 866 60"
          fill="none"
          stroke="var(--color-brand)"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <Note className="top-6 left-8 -rotate-2">from idea to live</Note>
      <div className="relative grid gap-3 pt-10 sm:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="luit-float-b flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 0.16}s` }}
            >
              <span className="border-border bg-canvas text-brand shadow-soft grid size-11 place-items-center rounded-full border">
                <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
              </span>
              <span className="text-ink mt-2 text-sm font-semibold">
                {step.label}
              </span>
              <span className="text-body text-[0.68rem] leading-4">
                {step.detail}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DeliverablesGraphic({
  className = "",
}: {
  className?: string;
}) {
  const groups = [
    { title: "Strategy", color: "var(--color-yellow)", items: 3 },
    { title: "Design", color: "var(--color-rose)", items: 3 },
    { title: "Development", color: "var(--color-sky)", items: 4 },
    { title: "Launch", color: "var(--color-green)", items: 4 },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`border-border bg-canvas shadow-soft relative overflow-hidden rounded-xl border p-4 ${className}`}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {groups.map((group, index) => (
          <div
            key={group.title}
            className="luit-float-a border-border min-h-48 rounded-2xl border bg-white p-4 shadow-sm"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <span
              className="block h-2 w-16 rounded-full"
              style={{ backgroundColor: group.color }}
            />
            <span className="text-ink mt-4 block text-base font-semibold">
              {group.title}
            </span>
            <div className="mt-5 flex flex-col gap-2">
              {Array.from({ length: group.items }).map((_, itemIndex) => (
                <span key={itemIndex} className="flex items-center gap-2">
                  <span
                    className="grid size-5 place-items-center rounded-full"
                    style={{ backgroundColor: `${group.color}45` }}
                  >
                    <CheckCircle2 size={12} className="text-ink/60" />
                  </span>
                  <span className="bg-surface h-2 flex-1 rounded-full" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CombinationSystemGraphic({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`border-border shadow-soft relative min-h-[220px] overflow-hidden rounded-xl border bg-white p-4 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 260">
        <path
          className="luit-draw-line"
          d="M150 132 L315 74 L500 132 L642 82"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
        <path
          className="luit-draw-line luit-delay-1"
          d="M150 132 L318 186 L500 132 L650 184"
          fill="none"
          stroke="var(--color-brand)"
          strokeDasharray="7 9"
          strokeWidth="2"
        />
      </svg>
      <div className="relative grid gap-4 sm:grid-cols-4">
        {[
          { label: "Product", color: "var(--color-sky)", icon: PanelsTopLeft },
          { label: "Growth", color: "var(--color-green)", icon: LineChart },
          { label: "Automation", color: "var(--color-violet)", icon: Bot },
          { label: "Brand", color: "var(--color-rose)", icon: Palette },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="luit-float-b border-border bg-canvas rounded-2xl border p-4 shadow-sm"
              style={{ animationDelay: `${index * 0.16}s` }}
            >
              <span
                className="grid size-12 place-items-center rounded-2xl"
                style={{
                  backgroundColor: `${item.color}30`,
                  color: item.color,
                }}
              >
                <Icon size={20} />
              </span>
              <span className="text-ink mt-5 block text-base font-semibold">
                {item.label}
              </span>
              <span className="bg-surface mt-3 block h-2 w-full rounded-full" />
              <span className="bg-surface mt-2 block h-2 w-2/3 rounded-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function IdeaToProductGraphic({
  className = "",
}: {
  className?: string;
}) {
  const stages = [
    { label: "Sketch", icon: PenTool, color: "var(--color-yellow)" },
    { label: "Wireframe", icon: Layers3, color: "var(--color-rose)" },
    { label: "Interface", icon: PanelsTopLeft, color: "var(--color-sky)" },
    { label: "Launch", icon: Rocket, color: "var(--color-brand)" },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`border-border shadow-soft relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl border bg-white p-4 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 180">
        <path
          className="luit-draw-line"
          d="M88 94 C190 32 274 150 368 88 C464 24 540 150 640 78"
          fill="none"
          stroke="var(--color-brand)"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
      <div className="relative grid gap-3 sm:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.label}
              className="luit-float-a border-border bg-canvas rounded-2xl border p-4 text-center"
              style={{ animationDelay: `${index * 0.16}s` }}
            >
              <span
                className="mx-auto grid size-12 place-items-center rounded-2xl"
                style={{
                  backgroundColor: `${stage.color}35`,
                  color: stage.color,
                }}
              >
                <Icon size={19} />
              </span>
              <span className="text-ink mt-3 block text-sm font-semibold">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
