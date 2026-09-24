import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorBioCard } from "@/components/blog/AuthorBioCard";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { toSafeHtml } from "@/lib/blog-content";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog";
import { addHeadingAnchors } from "@/lib/blog-toc";
import { toCloudinaryImageUrl } from "@/lib/cloudinary";
import { formatDate } from "@/utils/format-date";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function readTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
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

  const [rawContentHtml, allPosts] = await Promise.all([
    toSafeHtml(post.content),
    getPublishedPosts(),
  ]);

  const { html: contentHtml, headings } = addHeadingAnchors(rawContentHtml);

  const otherPosts = allPosts.filter(
    (candidate) => candidate.slug !== post.slug,
  );
  const sharedTag = post.tags.find((tag) =>
    otherPosts.some((candidate) => candidate.tags.includes(tag)),
  );
  const sameTagPosts = sharedTag
    ? otherPosts.filter((candidate) => candidate.tags.includes(sharedTag))
    : [];
  const relatedPosts = (sameTagPosts.length > 0 ? sameTagPosts : otherPosts).slice(
    0,
    3,
  );
  const relatedHeading = sharedTag ? `More on ${sharedTag}` : "More from the blog";

  const canonicalUrl = `${siteConfig.url}${ROUTES.blog}/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}${ROUTES.blog}/${post.slug}`,
  };

  return (
    <main id="main-content">
      <ReadingProgressBar />
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
            className="text-body hover:text-ink group mb-12 inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
          >
            <ArrowLeft
              aria-hidden="true"
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            All posts
          </Link>

          <h1 className="text-ink text-[clamp(2.25rem,5.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-balance">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            {post.author ? (
              <div className="flex items-center gap-3">
                {post.author.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded URL
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="border-border size-10 shrink-0 rounded-full border object-cover"
                  />
                ) : (
                  <span className="bg-surface text-body grid size-10 shrink-0 place-items-center rounded-full text-xs font-semibold">
                    {initials(post.author.name)}
                  </span>
                )}
                <div>
                  <p className="text-ink text-sm font-semibold">
                    {post.author.name}
                  </p>
                  <p className="text-body text-xs">{post.author.role}</p>
                </div>
              </div>
            ) : (
              <p className="text-ink text-sm font-semibold">
                {siteConfig.name}
              </p>
            )}

            <div className="text-body flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" size={13} />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" size={13} />
                {readTime(post.content)} min read
              </span>
            </div>
          </div>

          {post.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface text-body rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6">
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>

          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL, not a local/optimizable asset
            <img
              src={toCloudinaryImageUrl(post.coverImage, 1200)}
              alt={post.title}
              className="mt-10 aspect-video w-full rounded-2xl object-cover"
            />
          ) : null}

          <TableOfContents headings={headings} />

          <div
            className="blog-prose border-border mt-10 border-t pt-10"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {post.author ? <AuthorBioCard author={post.author} /> : null}
        </Container>
      </article>

      {relatedPosts.length > 0 ? (
        <section
          aria-labelledby="related-posts-heading"
          className="border-border border-t py-16 md:py-20"
        >
          <Container className="mx-auto max-w-2xl">
            <h2
              id="related-posts-heading"
              className="text-body text-xs font-semibold tracking-[0.18em] uppercase"
            >
              {relatedHeading}
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`${ROUTES.blog}/${related.slug}`}
                  className="group flex items-center gap-4"
                >
                  {related.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL
                    <img
                      src={toCloudinaryImageUrl(related.coverImage, 128)}
                      alt=""
                      className="border-border size-16 shrink-0 rounded-xl border object-cover"
                    />
                  ) : (
                    <span className="bg-surface size-16 shrink-0 rounded-xl" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="text-ink group-hover:text-brand block truncate font-medium transition-colors">
                      {related.title}
                    </span>
                    <span className="text-body block text-sm">
                      {formatDate(related.publishedAt)}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-body group-hover:text-brand shrink-0 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    size={18}
                  />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
