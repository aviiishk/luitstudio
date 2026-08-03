import { AnimatedCounter } from "@/components/shared/animated-counter";

interface AboutExperienceProps {
  divider?: boolean;
  label: string;
  value: number;
}

export function AboutExperience({
  divider = false,
  label,
  value,
}: AboutExperienceProps) {
  return (
    <article
      className={`flex flex-col items-center gap-2 px-4 py-2 text-center md:px-6 ${
        divider ? "md:border-r" : ""
      }`}
    >
      <p className="text-ink flex items-start justify-center text-[clamp(3.75rem,12vw,8rem)] leading-none font-medium tracking-[-0.06em]">
        <AnimatedCounter value={value} />
        <span className="sr-only">{value}</span>
      </p>
      <p className="text-body text-base sm:text-lg">{label}</p>
    </article>
  );
}
