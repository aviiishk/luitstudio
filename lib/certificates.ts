import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Certificate, PublicCertificate } from "@/types/certificate";

interface CertificateRow {
  id: string;
  certificate_number: string;
  intern_application_id: string | null;
  student_name: string;
  program: string;
  start_date: string | null;
  end_date: string | null;
  issue_date: string;
  status: "valid" | "revoked";
  certificate_file_url: string | null;
  created_at: string;
  updated_at: string;
}

const CERTIFICATE_COLUMNS =
  "id, certificate_number, intern_application_id, student_name, program, start_date, end_date, issue_date, status, certificate_file_url, created_at, updated_at";

function mapRow(row: CertificateRow): Certificate {
  return {
    id: row.id,
    certificateNumber: row.certificate_number,
    internApplicationId: row.intern_application_id,
    studentName: row.student_name,
    program: row.program,
    startDate: row.start_date,
    endDate: row.end_date,
    issueDate: row.issue_date,
    status: row.status,
    certificateFileUrl: row.certificate_file_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getCertificates(): Promise<Certificate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select(CERTIFICATE_COLUMNS)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as CertificateRow[]).map(mapRow);
}

export async function getCertificateForAdmin(
  id: string,
): Promise<Certificate | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select(CERTIFICATE_COLUMNS)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapRow(data as CertificateRow);
}

/** Public verify-page query — deliberately never touches intern_applications. */
export async function getPublicCertificate(
  id: string,
): Promise<PublicCertificate | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select(
      "student_name, program, start_date, end_date, issue_date, certificate_number, status, certificate_file_url",
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    studentName: data.student_name,
    program: data.program,
    startDate: data.start_date,
    endDate: data.end_date,
    issueDate: data.issue_date,
    certificateNumber: data.certificate_number,
    status: data.status,
    certificateFileUrl: data.certificate_file_url,
  };
}

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(length: number) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

/** e.g. LUIT-2026-A7K2P — retries on the rare unique-constraint collision. */
export async function generateCertificateNumber(): Promise<string> {
  const supabase = await createClient();
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = `LUIT-${year}-${randomCode(5)}`;
    const { data } = await supabase
      .from("certificates")
      .select("id")
      .eq("certificate_number", candidate)
      .maybeSingle();

    if (!data) return candidate;
  }

  throw new Error("Could not generate a unique certificate number.");
}
