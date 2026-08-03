import { Command, Lightbulb, WandSparkles } from "lucide-react";

const principles = [
  {
    label: "Creativity",
    icon: WandSparkles,
    className: "bg-[#f1e6fc] text-violet-ink",
  },
  {
    label: "Innovation",
    icon: Lightbulb,
    className: "bg-[#e2f0ff] text-sky-ink",
  },
  {
    label: "Strategy",
    icon: Command,
    className: "bg-[#ffefe1] text-orange-ink",
  },
] as const;

export function AboutImage() {
  return (
    <ul
      aria-label="Our approach"
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {principles.map(({ className, icon: Icon, label }) => (
        <li
          key={label}
          className={`flex min-h-14 items-center gap-3 rounded-full px-5 py-2 sm:min-h-16 sm:px-7 ${className}`}
        >
          <Icon
            aria-hidden="true"
            className="size-7 sm:size-9"
            strokeWidth={1.5}
          />
          <span className="font-display text-[clamp(1.75rem,5vw,3rem)] leading-none italic">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
