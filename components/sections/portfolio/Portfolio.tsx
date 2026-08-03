import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Container } from "@/components/ui/container";
import { portfolioProjects } from "@/data/portfolio";

export function Portfolio() {
  const featuredProjects = portfolioProjects.filter(
    (project) => project.featured,
  );

  return (
    <section
      id="work"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-24 py-16 md:py-20 xl:py-24"
    >
      <Container className="flex flex-col gap-12 md:gap-16">
        <AnimatedHeadline
          as="h2"
          id="portfolio-heading"
          text="How we transformed a small business's"
          italicText="online presence"
          delay={0.05}
          animateOnView
          className="text-ink mx-auto max-w-3xl text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
          italicClassName="font-display font-normal"
        />
        <PortfolioGrid projects={featuredProjects} />
      </Container>
    </section>
  );
}
