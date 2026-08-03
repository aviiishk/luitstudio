import { Award, ExternalLink, GraduationCap, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { getCertificateByApplicationId } from "@/lib/certificates";
import { getStudentById } from "@/lib/students";
import { formatDate } from "@/utils/format-date";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({
  params,
}: StudentDetailPageProps) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) notFound();

  const certificate = await getCertificateByApplicationId(id);

  return (
    <div className="max-w-2xl">
      <div className="border-border shadow-soft flex flex-wrap items-start gap-4 rounded-2xl border bg-white p-6">
        <span className="bg-brand/10 text-brand grid size-14 shrink-0 place-items-center rounded-full text-lg font-semibold">
          {initials(student.fullName)}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-ink text-2xl">{student.fullName}</h1>
          <p className="text-body mt-1 text-sm">
            {student.course} · {student.college} · Year {student.year}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`mailto:${student.email}`}
              className="text-body hover:text-brand flex items-center gap-1.5 transition-colors"
            >
              <Mail aria-hidden="true" size={15} />
              {student.email}
            </a>
            {student.phone ? (
              <a
                href={`tel:${student.phone}`}
                className="text-body hover:text-brand flex items-center gap-1.5 transition-colors"
              >
                <Phone aria-hidden="true" size={15} />
                {student.phone}
              </a>
            ) : null}
            {student.portfolioUrl ? (
              <a
                href={student.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-brand flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink aria-hidden="true" size={15} />
                Portfolio
              </a>
            ) : null}
          </div>

          {student.skills.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-surface text-body rounded-full px-3 py-1 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          <p className="text-body mt-4 text-xs">
            Applied {formatDate(student.appliedAt)}
          </p>
        </div>
      </div>

      <div className="border-border shadow-soft mt-6 rounded-2xl border bg-white p-6">
        {certificate ? (
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-green/20 text-green-ink grid size-11 shrink-0 place-items-center rounded-full">
              <Award aria-hidden="true" size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-ink font-medium">{certificate.program}</p>
              <p className="text-body text-sm">
                {certificate.certificateNumber} ·{" "}
                {certificate.status === "valid" ? "Valid" : "Revoked"}
              </p>
            </div>
            <ButtonLink
              href={`/admin/certificates/${certificate.id}`}
              variant="light"
              className="min-h-10 px-5"
            >
              View certificate
            </ButtonLink>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-surface text-body grid size-11 shrink-0 place-items-center rounded-full">
              <GraduationCap aria-hidden="true" size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-ink font-medium">No certificate issued yet</p>
              <p className="text-body text-sm">
                Issue one once their internship is complete.
              </p>
            </div>
            <ButtonLink
              href={`/admin/certificates/new?studentId=${student.id}`}
              variant="brand"
              className="min-h-10 px-5"
            >
              Issue certificate
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
