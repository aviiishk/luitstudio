import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";
import type { BlogArticle } from "@/types/blog";

interface BlogProps {
  articles: readonly BlogArticle[];
}

export function Blog({ articles }: BlogProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="blog-heading" className="py-16 md:py-20 xl:py-24">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <Reveal delay={0.05}>
          <h2
            id="blog-heading"
            className="mx-auto max-w-3xl text-center text-[clamp(2.25rem,5vw,3rem)] leading-tight tracking-[-0.025em]"
          >
            Latest ideas and <em className="font-display">insights</em>
          </h2>
        </Reveal>
        <BlogGrid articles={articles} />
      </Container>
    </section>
  );
}
