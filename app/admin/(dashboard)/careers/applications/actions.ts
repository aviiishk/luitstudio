"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { JobApplicationStatus } from "@/types/career";

type ActionResult = { error?: string };

function revalidateApplicationPaths(id?: string) {
  revalidatePath("/admin/careers");
  revalidatePath("/admin/careers/applications");
  if (id) revalidatePath(`/admin/careers/applications/${id}`);
}

export async function setApplicationStatus(
  id: string,
  status: JobApplicationStatus,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job_applications")
    .update({ status })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateApplicationPaths(id);
  return {};
}

export async function deleteApplication(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateApplicationPaths();
  return {};
}
