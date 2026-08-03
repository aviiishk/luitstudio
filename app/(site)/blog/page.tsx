import type { Metadata } from "next";

import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: `Ideas, updates, and insights from ${siteConfig.name}.`,
  alternates: { canonical: ROUTES.blog },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <main id="main-content">
      <section
        aria-labelledby="blog-index-heading"
        className="pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-48 xl:pb-24"
      >
        <Container className="flex flex-col gap-12 lg:gap-16">
          <Reveal delay={0.05}>
            <h1
              id="blog-index-heading"
              className="mx-auto max-w-3xl text-center text-[clamp(2.75rem,7vw,5rem)] leading-[0.98] tracking-[-0.035em]"
            >
              Latest ideas and <em className="font-display">insights</em>
            </h1>
          </Reveal>
          {posts.length > 0 ? (
            <BlogGrid articles={posts} />
          ) : (
            <p className="text-body text-center text-lg">
              No posts yet — check back soon.
            </p>
          )}
        </Container>
      </section>
    </main>
  );
}
