import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlogMeta } from "@/components/sections/blog/BlogMeta";
import type { BlogArticle } from "@/types/blog";

interface BlogCardProps {
  article: BlogArticle;
}

export function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="group h-full">
      <Link
        href={`/blog/${article.slug}`}
        aria-label={`Read ${article.title}`}
        className="focus-visible:outline-brand hover:shadow-soft focus-visible:shadow-soft flex h-full flex-col gap-5 rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 active:translate-y-0 active:scale-[0.995] motion-reduce:transform-none"
      >
        <div className="bg-surface relative aspect-[3/2] overflow-hidden rounded-2xl">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(50vw - 36px), 405px"
            placeholder={article.image.blurDataURL ? "blur" : "empty"}
            blurDataURL={article.image.blurDataURL}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035] motion-reduce:transform-none"
          />
          <span className="text-ink group-hover:bg-brand group-focus-visible:bg-brand group-hover:shadow-soft group-focus-visible:shadow-soft absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white transition-[transform,color,background-color,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:text-white group-focus-visible:-translate-y-0.5 group-focus-visible:text-white motion-reduce:transform-none">
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none"
              size={20}
            />
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <BlogMeta
            author={article.author}
            category={article.category}
            date={article.date}
          />
          <h3 className="group-hover:text-brand group-focus-visible:text-brand text-2xl leading-tight transition-colors duration-200">
            {article.title}
          </h3>
          <p>{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
