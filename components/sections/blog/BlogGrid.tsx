import { BlogCard } from "@/components/sections/blog/BlogCard";
import { Reveal } from "@/components/shared/reveal";
import type { BlogArticle } from "@/types/blog";

interface BlogGridProps {
  articles: readonly BlogArticle[];
}

// A grid sized for 3 posts leaves a hollow column when there are fewer —
// cap the layout to how many posts actually exist instead.
function getGridClassName(count: number) {
  if (count >= 3) {
    return "md:grid-cols-2 xl:grid-cols-3";
  }

  if (count === 2) {
    return "mx-auto max-w-3xl sm:grid-cols-2";
  }

  return "mx-auto max-w-md";
}

export function BlogGrid({ articles }: BlogGridProps) {
  return (
    <div
      className={`grid gap-x-6 gap-y-10 ${getGridClassName(articles.length)}`}
    >
      {articles.map((article, index) => (
        <Reveal key={article.id} delay={0.08 * (index + 1)}>
          <BlogCard article={article} />
        </Reveal>
      ))}
    </div>
  );
}
