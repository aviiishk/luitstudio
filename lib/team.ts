import "server-only";

import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { TeamMember, TeamMemberStatus } from "@/types/team";

interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  is_founder: boolean;
  display_order: number;
  canvas_x: number;
  canvas_y: number;
  status: TeamMemberStatus;
  created_at: string;
  updated_at: string;
}

const COLUMNS =
  "id, name, role, bio, image_url, is_founder, display_order, canvas_x, canvas_y, status, created_at, updated_at";

function mapRow(row: TeamMemberRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    imageUrl: row.image_url,
    isFounder: row.is_founder,
    displayOrder: row.display_order,
    canvasX: row.canvas_x,
    canvasY: row.canvas_y,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedTeamMembers(): Promise<TeamMember[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("team_members")
    .select(COLUMNS)
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return (data as TeamMemberRow[]).map(mapRow);
}

export async function getAllTeamMembersForAdmin(): Promise<TeamMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select(COLUMNS)
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return (data as TeamMemberRow[]).map(mapRow);
}

export async function getTeamMemberForAdmin(
  id: string,
): Promise<TeamMember | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select(COLUMNS)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapRow(data as TeamMemberRow);
}
