import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { ContactSubmission } from "@/types/contact-submission";

interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  interest: string;
  budget: string | null;
  message: string;
  created_at: string;
}

const COLUMNS = "id, name, email, interest, budget, message, created_at";

function mapRow(row: ContactSubmissionRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    interest: row.interest,
    budget: row.budget,
    message: row.message,
    createdAt: row.created_at,
  };
}

export async function getAllContactSubmissionsForAdmin(): Promise<
  ContactSubmission[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select(COLUMNS)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as ContactSubmissionRow[]).map(mapRow);
}

export async function getContactSubmissionForAdmin(
  id: string,
): Promise<ContactSubmission | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select(COLUMNS)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapRow(data as ContactSubmissionRow);
}
