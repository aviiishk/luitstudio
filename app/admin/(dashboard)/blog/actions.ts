"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/routes";
import { getCurrentAuthor } from "@/lib/current-author";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { createClient } from "@/lib/supabase/server";

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

type ActionResult = { error?: string };

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function toPayload(input: PostInput) {
  return {
    title: input.title.trim(),
    slug: input.slug.trim(),
    excerpt: input.excerpt.trim(),
    content: sanitizeHtml(input.content),
    cover_image: input.coverImage.trim() || null,
    tags: parseTags(input.tags),
    published: input.published,
    updated_at: new Date().toISOString(),
  };
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath(ROUTES.blog);
  revalidatePath(ROUTES.home);
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  if (slug) revalidatePath(`${ROUTES.blog}/${slug}`);
}

export async function createPost(input: PostInput): Promise<ActionResult> {
  if (!input.title.trim() || !input.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const author = await getCurrentAuthor();
  if (!author) {
    return {
      error:
        "Your login isn't linked to a team profile yet — ask an admin to link it before publishing.",
    };
  }

  const supabase = await createClient();
  const payload = toPayload(input);

  const { error } = await supabase.from("blog_posts").insert({
    ...payload,
    author_id: author.id,
    ...(input.published ? { published_at: new Date().toISOString() } : {}),
  });

  if (error) return { error: error.message };

  revalidateBlogPaths(payload.slug);
  return {};
}

export async function updatePost(
  id: string,
  input: PostInput,
  wasPublished: boolean,
): Promise<ActionResult> {
  if (!input.title.trim() || !input.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const supabase = await createClient();
  const payload = toPayload(input);

  const { error } = await supabase
    .from("blog_posts")
    .update({
      ...payload,
      ...(input.published && !wasPublished
        ? { published_at: new Date().toISOString() }
        : {}),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateBlogPaths(payload.slug);
  return {};
}

export async function deletePost(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidateBlogPaths();
  return {};
}
