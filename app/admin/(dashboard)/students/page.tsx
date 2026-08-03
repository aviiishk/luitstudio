import { GraduationCap } from "lucide-react";
import Link from "next/link";

import { getCertificates } from "@/lib/certificates";
import { getEnrolledStudents } from "@/lib/students";

interface StudentsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminStudentsPage({
  searchParams,
}: StudentsPageProps) {
  const { q } = await searchParams;
  const [students, certificates] = await Promise.all([
    getEnrolledStudents(),
    getCertificates(),
  ]);

  const certifiedApplicationIds = new Set(
    certificates
      .map((certificate) => certificate.internApplicationId)
      .filter((id): id is string => id !== null),
  );

  const query = q?.trim().toLowerCase() ?? "";
  const filtered = query
    ? students.filter(
        (student) =>
          student.fullName.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.course.toLowerCase().includes(query),
      )
    : students;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-ink text-2xl">Students</h1>
          <p className="text-body mt-1 text-sm">
            {students.length} enrolled · {certifiedApplicationIds.size}{" "}
            certified
          </p>
        </div>
        <form className="w-full sm:w-64">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search by name, email, course…"
            className="border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </form>
      </div>

      {filtered.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <GraduationCap
            aria-hidden="true"
            className="text-body mx-auto mb-3"
            size={28}
          />
          <p className="text-body text-sm">
            {students.length === 0
              ? "No enrolled students yet — accept an internship application in Supabase to see them here."
              : "No students match your search."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((student) => {
            const hasCertificate = certifiedApplicationIds.has(student.id);

            return (
              <li
                key={student.id}
                className="border-border shadow-soft flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-ink truncate font-medium">
                    {student.fullName}
                  </p>
                  <p className="text-body truncate text-sm">
                    {student.course} · {student.college}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    hasCertificate
                      ? "bg-green/25 text-green-ink"
                      : "bg-surface text-body"
                  }`}
                >
                  {hasCertificate ? "Certified" : "Not certified"}
                </span>
                {!hasCertificate && (
                  <Link
                    href={`/admin/certificates/new?studentId=${student.id}`}
                    className="text-brand shrink-0 text-sm font-medium hover:underline"
                  >
                    Issue certificate
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
