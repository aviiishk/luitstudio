import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { toSafeHtml } from "@/lib/blog-content";
import { getPublishedPost } from "@/lib/blog";
import { formatDate } from "@/utils/format-date";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function readTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const canonical = `${ROUTES.blog}/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title: post.title,
      description: post.excerpt,
      url: canonical,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) notFound();

  const contentHtml = await toSafeHtml(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}${ROUTES.blog}/${post.slug}`,
  };

  return (
    <main id="main-content">
      <BreadcrumbSchema
        items={[
          { name: "Blog", path: ROUTES.blog },
          { name: post.title, path: `${ROUTES.blog}/${post.slug}` },
        ]}
      />
      <article className="pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-48 xl:pb-24">
        <Container className="mx-auto max-w-2xl">
          <Link
            href={ROUTES.blog}
            className="text-body hover:text-ink group mb-10 inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
          >
            <ArrowLeft
              aria-hidden="true"
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            All posts
          </Link>

          {post.tags.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-brand/10 text-brand rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="text-ink text-[clamp(2rem,5vw,2.75rem)] leading-tight tracking-[-0.03em]">
            {post.title}
          </h1>

          <div className="text-body border-border mt-6 mb-8 flex items-center gap-5 border-b pb-8 text-sm">
            <span className="flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" size={14} />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden="true" size={14} />
              {readTime(post.content)} min read
            </span>
          </div>

          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL, not a local/optimizable asset
            <img
              src={post.coverImage}
              alt={post.title}
              className="mb-10 aspect-video w-full rounded-2xl object-cover"
            />
          ) : null}

          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </Container>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
