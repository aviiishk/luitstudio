import { PortfolioCard } from "@/components/sections/portfolio/PortfolioCard";
import { Reveal } from "@/components/shared/reveal";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioGridProps {
  projects: readonly PortfolioProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal
          key={project.slug}
          delay={0.08 + index * 0.08}
          className="h-full"
        >
          <PortfolioCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
