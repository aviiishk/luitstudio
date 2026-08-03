import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { BlogArticle } from "@/types/blog";

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
}

export interface AdminPostSummary {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
}

export interface AdminPostDetail extends BlogArticle {
  published: boolean;
}

const POST_COLUMNS =
  "id, title, slug, excerpt, content, cover_image, published, published_at, created_at, updated_at, tags";

function mapRow(row: BlogPostRow): BlogArticle {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    tags: row.tags ?? [],
    publishedAt: row.published_at ?? row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedPosts(
  options: { limit?: number } = {},
): Promise<BlogArticle[]> {
  const supabase = await createClient();
  let query = supabase
    .from("blog_posts")
    .select(POST_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return (data as BlogPostRow[]).map(mapRow);
}

export async function getPublishedPost(
  slug: string,
): Promise<BlogArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapRow(data as BlogPostRow);
}

export async function getPostForAdmin(
  id: string,
): Promise<AdminPostDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(POST_COLUMNS)
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const row = data as BlogPostRow;
  return { ...mapRow(row), published: row.published };
}

export async function getAllPostsForAdmin(): Promise<AdminPostSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, published, published_at, updated_at")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    published: row.published as boolean,
    publishedAt: row.published_at as string | null,
    updatedAt: row.updated_at as string,
  }));
}
