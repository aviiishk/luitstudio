import "server-only";

import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { BlogArticle, BlogAuthor } from "@/types/blog";

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
  author_id: string | null;
  team_members:
    | { id: string; name: string; role: string; bio: string | null; image_url: string | null }
    | { id: string; name: string; role: string; bio: string | null; image_url: string | null }[]
    | null;
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
  authorId: string | null;
}

const POST_COLUMNS =
  "id, title, slug, excerpt, content, cover_image, published, published_at, created_at, updated_at, tags, author_id, team_members(id, name, role, bio, image_url)";

function mapAuthor(row: BlogPostRow): BlogAuthor | null {
  const joined = Array.isArray(row.team_members)
    ? row.team_members[0]
    : row.team_members;

  if (!joined) return null;
  return {
    id: joined.id,
    name: joined.name,
    role: joined.role,
    bio: joined.bio,
    imageUrl: joined.image_url,
  };
}

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
    author: mapAuthor(row),
  };
}

export async function getPublishedPosts(
  options: { limit?: number } = {},
): Promise<BlogArticle[]> {
  const supabase = createPublicClient();
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

  return (data as unknown as BlogPostRow[]).map(mapRow);
}

export async function getPublishedPost(
  slug: string,
): Promise<BlogArticle | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapRow(data as unknown as BlogPostRow);
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

  const row = data as unknown as BlogPostRow;
  return { ...mapRow(row), published: row.published, authorId: row.author_id };
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
