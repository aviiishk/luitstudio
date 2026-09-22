"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import type { JobOpeningStatus } from "@/types/career";

export interface OpeningInput {
  title: string;
  slug: string;
  department: string;
  employmentType: string;
  location: string;
  summary: string;
  description: string;
  responsibilities: string;
  requirements: string;
  status: JobOpeningStatus;
}

type ActionResult = { error?: string; id?: string };

function parseLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toPayload(input: OpeningInput) {
  return {
    title: input.title.trim(),
    slug: input.slug.trim(),
    department: input.department.trim() || null,
    employment_type: input.employmentType.trim() || "Full-time",
    location: input.location.trim() || "Guwahati, Assam",
    summary: input.summary.trim(),
    description: input.description.trim(),
    responsibilities: parseLines(input.responsibilities),
    requirements: parseLines(input.requirements),
    status: input.status,
    updated_at: new Date().toISOString(),
  };
}

function revalidateCareerPaths(slug?: string) {
  revalidatePath(ROUTES.career);
  revalidatePath(ROUTES.home);
  revalidatePath("/admin");
  revalidatePath("/admin/careers");
  if (slug) {
    revalidatePath(`${ROUTES.careerApply}/${slug}`);
  }
}

export async function createOpening(input: OpeningInput): Promise<ActionResult> {
  if (!input.title.trim() || !input.slug.trim() || !input.summary.trim()) {
    return { error: "Title, slug, and summary are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_openings")
    .insert(toPayload(input))
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create." };

  revalidateCareerPaths(input.slug);
  return { id: data.id as string };
}

export async function updateOpening(
  id: string,
  input: OpeningInput,
): Promise<ActionResult> {
  if (!input.title.trim() || !input.slug.trim() || !input.summary.trim()) {
    return { error: "Title, slug, and summary are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("job_openings")
    .update(toPayload(input))
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateCareerPaths(input.slug);
  return {};
}

export async function deleteOpening(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("job_openings").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidateCareerPaths();
  return {};
}
