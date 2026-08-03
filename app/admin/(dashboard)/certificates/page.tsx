import { Award, Plus } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { getCertificates } from "@/lib/certificates";
import { formatDate } from "@/utils/format-date";

interface CertificatesPageProps {
  searchParams: Promise<{ q?: string; status?: string }>;
}

const statusFilters = [
  { value: "all", label: "All" },
  { value: "valid", label: "Valid" },
  { value: "revoked", label: "Revoked" },
] as const;

export default async function AdminCertificatesPage({
  searchParams,
}: CertificatesPageProps) {
  const { q, status } = await searchParams;
  const certificates = await getCertificates();

  const activeStatus = status === "valid" || status === "revoked" ? status : "all";
  const query = q?.trim().toLowerCase() ?? "";

  const filtered = certificates.filter((certificate) => {
    if (activeStatus !== "all" && certificate.status !== activeStatus) {
      return false;
    }
    if (!query) return true;
    return (
      certificate.studentName.toLowerCase().includes(query) ||
      certificate.program.toLowerCase().includes(query) ||
      certificate.certificateNumber.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-ink text-2xl">Certificates</h1>
          <p className="text-body mt-1 text-sm">
            {certificates.length} issued ·{" "}
            {certificates.filter((cert) => cert.status === "valid").length}{" "}
            valid
          </p>
        </div>
        <ButtonLink
          href="/admin/certificates/new"
          variant="brand"
          icon={Plus}
          className="min-h-10 px-5"
        >
          Issue certificate
        </ButtonLink>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <form className="w-full sm:w-64">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search by name, program, ID…"
            className="border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </form>
        <div className="flex gap-1.5">
          {statusFilters.map((filter) => (
            <Link
              key={filter.value}
              href={
                filter.value === "all"
                  ? "/admin/certificates"
                  : `/admin/certificates?status=${filter.value}`
              }
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                activeStatus === filter.value
                  ? "bg-ink text-white"
                  : "bg-surface text-body hover:text-ink"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <Award
            aria-hidden="true"
            className="text-body mx-auto mb-3"
            size={28}
          />
          <p className="text-body text-sm">
            {certificates.length === 0
              ? "No certificates issued yet — start from the Students page."
              : "No certificates match your filters."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((certificate) => (
            <li
              key={certificate.id}
              className="border-border shadow-soft flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/certificates/${certificate.id}`}
                  className="text-ink hover:text-brand block truncate font-medium transition-colors"
                >
                  {certificate.studentName}
                </Link>
                <p className="text-body truncate text-sm">
                  {certificate.program} · {certificate.certificateNumber}
                </p>
              </div>
              <span className="text-body hidden shrink-0 text-sm sm:block">
                {formatDate(certificate.issueDate)}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  certificate.status === "valid"
                    ? "bg-green/25 text-green-ink"
                    : "bg-rose/25 text-rose-ink"
                }`}
              >
                {certificate.status === "valid" ? "Valid" : "Revoked"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
