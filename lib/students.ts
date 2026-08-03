import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Student } from "@/types/certificate";

interface InternApplicationRow {
  id: string;
  full_name: string;
  email: string;
  course: string;
  college: string;
  year: string;
  applied_at: string;
}

const STUDENT_COLUMNS = "id, full_name, email, course, college, year, applied_at";

function mapRow(row: InternApplicationRow): Student {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    course: row.course,
    college: row.college,
    year: row.year,
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
