import { CalendarDays, CheckCircle2, ShieldX, XCircle } from "lucide-react";
import type { Metadata } from "next";

import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/config/site";
import { getPublicCertificate } from "@/lib/certificates";
import { formatDate } from "@/utils/format-date";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Certificate Verification",
  robots: { index: false, follow: false },
};

function DateRange({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}) {
  if (!startDate && !endDate) return null;

  return (
    <span className="flex items-center gap-1.5">
      <CalendarDays aria-hidden="true" size={14} />
      {startDate ? formatDate(startDate) : "—"} to{" "}
      {endDate ? formatDate(endDate) : "—"}
    </span>
  );
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;
  const certificate = await getPublicCertificate(id);

  return (
    <main className="bg-surface flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo className="h-8 w-auto" />
        </div>

        <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
          {!certificate ? (
            <div className="flex flex-col items-center gap-3 p-10 text-center">
              <ShieldX aria-hidden="true" className="text-body" size={40} />
              <h1 className="text-ink text-xl">Certificate not found</h1>
              <p className="text-body text-sm">
                We couldn&apos;t find a certificate matching this link. If you
                believe this is an error, contact {siteConfig.name} directly.
              </p>
            </div>
          ) : (
            <>
              <div
                className={`flex items-center gap-3 px-6 py-5 ${
                  certificate.status === "valid"
                    ? "bg-green/20 text-green-ink"
                    : "bg-rose/20 text-rose-ink"
                }`}
              >
                {certificate.status === "valid" ? (
                  <CheckCircle2 aria-hidden="true" size={22} />
                ) : (
                  <XCircle aria-hidden="true" size={22} />
                )}
                <p className="font-medium">
                  {certificate.status === "valid"
                    ? "Certificate verified"
                    : "This certificate has been revoked"}
                </p>
              </div>

              <div className="p-6">
                <p className="text-body text-xs font-semibold tracking-[0.16em] uppercase">
                  Issued to
                </p>
                <h1 className="text-ink mt-1 text-2xl">
                  {certificate.studentName}
                </h1>
                <p className="text-body mt-1">{certificate.program}</p>

                <div className="text-body border-border mt-5 flex flex-col gap-2 border-t pt-5 text-sm">
                  <DateRange
                    startDate={certificate.startDate}
                    endDate={certificate.endDate}
                  />
                  <span>Issued {formatDate(certificate.issueDate)}</span>
                  <span className="font-mono text-xs">
                    {certificate.certificateNumber}
                  </span>
                </div>

                {certificate.certificateFileUrl ? (
                  <a
                    href={certificate.certificateFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border mt-6 block overflow-hidden rounded-xl border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL, not a local/optimizable asset */}
                    <img
                      src={certificate.certificateFileUrl}
                      alt={`${certificate.studentName}'s certificate`}
                      className="w-full object-cover"
                    />
                  </a>
                ) : null}
              </div>
            </>
          )}
        </div>

        <p className="text-body mt-6 text-center text-xs">
          Issued and verified by {siteConfig.name}
        </p>
      </div>
    </main>
  );
}
