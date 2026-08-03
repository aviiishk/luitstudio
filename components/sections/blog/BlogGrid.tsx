import { BlogCard } from "@/components/sections/blog/BlogCard";
import { Reveal } from "@/components/shared/reveal";
import type { BlogArticle } from "@/types/blog";

interface BlogGridProps {
  articles: readonly BlogArticle[];
}

export function BlogGrid({ articles }: BlogGridProps) {
  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article, index) => (
        <Reveal key={article.id} delay={0.08 * (index + 1)}>
          <BlogCard article={article} />
        </Reveal>
      ))}
    </div>
  );
}
