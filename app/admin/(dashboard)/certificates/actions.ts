"use server";

import { revalidatePath } from "next/cache";

import { generateCertificateNumber } from "@/lib/certificates";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { error?: string; id?: string };

export interface CreateCertificateInput {
  internApplicationId: string | null;
  studentName: string;
  program: string;
  startDate: string;
  endDate: string;
}

export interface UpdateCertificateInput {
  program: string;
  startDate: string;
  endDate: string;
}

function revalidateCertificatePaths(id?: string) {
  revalidatePath("/admin/students");
  revalidatePath("/admin/certificates");
  if (id) revalidatePath(`/admin/certificates/${id}`);
}

export async function createCertificate(
  input: CreateCertificateInput,
): Promise<ActionResult> {
  if (!input.studentName.trim() || !input.program.trim()) {
    return { error: "Student name and program are required." };
  }

  const supabase = await createClient();
  const certificateNumber = await generateCertificateNumber();

  const { data, error } = await supabase
    .from("certificates")
    .insert({
      certificate_number: certificateNumber,
      intern_application_id: input.internApplicationId,
      student_name: input.studentName.trim(),
      program: input.program.trim(),
      start_date: input.startDate || null,
      end_date: input.endDate || null,
      status: "valid",
    })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create." };

  revalidateCertificatePaths(data.id as string);
  return { id: data.id as string };
}

export async function updateCertificate(
  id: string,
  input: UpdateCertificateInput,
): Promise<ActionResult> {
  if (!input.program.trim()) {
    return { error: "Program is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("certificates")
    .update({
      program: input.program.trim(),
      start_date: input.startDate || null,
      end_date: input.endDate || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateCertificatePaths(id);
  return {};
}

export async function updateCertificateFile(
  id: string,
  fileUrl: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("certificates")
    .update({
      certificate_file_url: fileUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateCertificatePaths(id);
  return {};
}

export async function setCertificateStatus(
  id: string,
  status: "valid" | "revoked",
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("certificates")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateCertificatePaths(id);
  return {};
}
