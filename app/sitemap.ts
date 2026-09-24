import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { getPublishedPosts } from "@/lib/blog";
import { getPublishedOpenings } from "@/lib/careers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, openings] = await Promise.all([
    getPublishedPosts(),
    getPublishedOpenings(),
  ]);

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}${ROUTES.services}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${ROUTES.about}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}${ROUTES.career}`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}${ROUTES.contact}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${ROUTES.blog}`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}${ROUTES.blog}/${post.slug}`,
      // Supabase returns timestamptz as a raw Postgres-formatted string
      // (e.g. 5-digit fractional seconds, "+00:00" offset) rather than
      // proper ISO 8601 -- normalize via Date so Next.js's sitemap
      // serializer emits a standard W3C datetime, not a raw DB string
      // some sitemap parsers may reject.
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...openings.map((opening) => ({
      url: `${siteConfig.url}${ROUTES.careerApply}/${opening.slug}`,
      lastModified: new Date(opening.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
