import "server-only";

import { COLUMNS, mapRow, type TeamMemberRow } from "@/lib/team";
import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/types/team";

/**
 * Resolves the team_members row linked (via team_members.user_id) to the
 * currently logged-in admin session, so blog post authorship can be set
 * from the session instead of a manual picker. Returns null if nobody is
 * logged in, or if this account isn't linked to a team profile yet.
 */
export async function getCurrentAuthor(): Promise<TeamMember | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("team_members")
    .select(COLUMNS)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data as TeamMemberRow);
}
