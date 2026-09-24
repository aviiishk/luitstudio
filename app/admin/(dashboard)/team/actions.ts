"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import type { TeamMemberStatus } from "@/types/team";

export interface TeamMemberInput {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  isFounder: boolean;
  displayOrder: number;
  status: TeamMemberStatus;
}

type ActionResult = { error?: string; id?: string };

function toPayload(input: TeamMemberInput) {
  return {
    name: input.name.trim(),
    role: input.role.trim(),
    bio: input.bio.trim() || null,
    image_url: input.imageUrl.trim() || null,
    is_founder: input.isFounder,
    display_order: input.displayOrder,
    status: input.status,
    updated_at: new Date().toISOString(),
  };
}

function revalidateTeamPaths() {
  revalidatePath(ROUTES.about);
  revalidatePath("/admin");
  revalidatePath("/admin/team");
}

export async function createTeamMember(
  input: TeamMemberInput,
): Promise<ActionResult> {
  if (!input.name.trim() || !input.role.trim()) {
    return { error: "Name and role are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .insert({
      ...toPayload(input),
      // A small random offset near the root so several new members
      // don't all land exactly on top of each other. The admin drags
      // them wherever they actually want from the layout editor.
      canvas_x: Math.round((Math.random() - 0.5) * 260),
      canvas_y: Math.round((Math.random() - 0.5) * 200),
    })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create." };

  revalidateTeamPaths();
  return { id: data.id as string };
}

export async function updateTeamMember(
  id: string,
  input: TeamMemberInput,
): Promise<ActionResult> {
  if (!input.name.trim() || !input.role.trim()) {
    return { error: "Name and role are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("team_members")
    .update(toPayload(input))
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateTeamPaths();
  return {};
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidateTeamPaths();
  return {};
}

export interface TeamMemberPosition {
  id: string;
  canvasX: number;
  canvasY: number;
}

export async function updateTeamMemberPositions(
  positions: TeamMemberPosition[],
): Promise<ActionResult> {
  const supabase = await createClient();

  const results = await Promise.all(
    positions.map((position) =>
      supabase
        .from("team_members")
        .update({
          canvas_x: position.canvasX,
          canvas_y: position.canvasY,
          updated_at: new Date().toISOString(),
        })
        .eq("id", position.id),
    ),
  );

  const failed = results.find((result) => result.error);
  if (failed?.error) return { error: failed.error.message };

  revalidateTeamPaths();
  return {};
}
