import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Student } from "@/types/certificate";

interface InternApplicationRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  college: string;
  year: string;
  skills: string[] | null;
  portfolio_url: string | null;
  applied_at: string;
}

const STUDENT_COLUMNS =
  "id, full_name, email, phone, course, college, year, skills, portfolio_url, applied_at";

function mapRow(row: InternApplicationRow): Student {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    course: row.course,
    college: row.college,
    year: row.year,
    skills: row.skills ?? [],
    portfolioUrl: row.portfolio_url,
    appliedAt: row.applied_at,
  };
}

/** Enrolled students = accepted internship applications. */
export async function getEnrolledStudents(): Promise<Student[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intern_applications")
    .select(STUDENT_COLUMNS)
    .eq("status", "accepted")
    .order("applied_at", { ascending: false });

  if (error || !data) return [];

  return (data as InternApplicationRow[]).map(mapRow);
}

export async function getStudentById(id: string): Promise<Student | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intern_applications")
    .select(STUDENT_COLUMNS)
    .eq("id", id)
    .eq("status", "accepted")
    .single();

  if (error || !data) return null;
  return mapRow(data as InternApplicationRow);
}
