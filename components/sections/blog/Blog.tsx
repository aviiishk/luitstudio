import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";
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
        <Reveal delay={0.08 * (articles.length + 1)}>
          <Link
            href={ROUTES.blog}
            className="group text-ink hover:text-brand focus-visible:text-brand mx-auto inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            View all posts
            <ArrowUpRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
