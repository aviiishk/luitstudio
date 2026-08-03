import {
  Award,
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  Hash,
  ShieldAlert,
  ShieldX,
} from "lucide-react";
import type { Metadata } from "next";

import { Logo } from "@/components/shared/Logo";
import { PrintButton } from "@/components/shared/PrintButton";
import { siteConfig } from "@/config/site";
import { getPublicCertificate } from "@/lib/certificates";
import { formatDate } from "@/utils/format-date";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: VerifyPageProps): Promise<Metadata> {
  const { id } = await params;
  const certificate = await getPublicCertificate(id);

  return {
    title: certificate
      ? `Verify ${certificate.studentName}'s Certificate`
      : "Certificate Verification",
    robots: { index: false, follow: false },
  };
}

function DetailStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hash;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border bg-surface rounded-2xl border p-4">
      <div className="text-body flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase">
        <Icon aria-hidden="true" size={14} />
        {label}
      </div>
      <p className="text-ink mt-1.5 text-sm font-medium">{value}</p>
    </div>
  );
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;
  const certificate = await getPublicCertificate(id);
  const verifiedAt = new Date();

  return (
    <main className="relative flex min-h-screen justify-center overflow-hidden px-5 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[linear-gradient(180deg,#cdeffb_0%,#fdeecb_55%,transparent_100%)] print:hidden"
      />

      <div className="w-full max-w-2xl">
        <div className="mb-10 flex flex-col items-center gap-2">
          <Logo className="h-9 w-auto" priority />
          <p className="text-ink/60 text-xs font-semibold tracking-[0.22em] uppercase">
            Certificate Verification
          </p>
        </div>

        <div className="shadow-floating overflow-hidden rounded-3xl bg-white print:shadow-none">
          {!certificate ? (
            <div className="flex flex-col items-center gap-4 px-8 py-16 text-center">
              <span className="bg-surface text-body grid size-16 place-items-center rounded-full">
                <ShieldX aria-hidden="true" size={30} />
              </span>
              <div>
                <h1 className="text-ink text-xl">Certificate not found</h1>
                <p className="text-body mx-auto mt-2 max-w-sm text-sm">
                  We couldn&apos;t find a certificate matching this link. If
                  you believe this is an error, contact {siteConfig.name}{" "}
                  directly.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`flex items-center gap-4 px-8 py-6 ${
                  certificate.status === "valid"
                    ? "bg-[linear-gradient(90deg,#1b7a4d_0%,#2f9e63_100%)] text-white"
                    : "bg-[linear-gradient(90deg,#57534e_0%,#78716c_100%)] text-white"
                }`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15">
                  {certificate.status === "valid" ? (
                    <CheckCircle2 aria-hidden="true" size={22} />
                  ) : (
                    <ShieldAlert aria-hidden="true" size={22} />
                  )}
                </span>
                <div>
                  <p className="font-medium">
                    {certificate.status === "valid"
                      ? "Certificate verified"
                      : "Certificate revoked"}
                  </p>
                  <p className="text-sm text-white/80">
                    {certificate.status === "valid"
                      ? `Genuinely issued by ${siteConfig.name}`
                      : "This certificate is no longer valid"}
                  </p>
                </div>
              </div>

              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <p className="text-body text-xs font-semibold tracking-[0.16em] uppercase">
                  Certified completion awarded to
                </p>
                <h1 className="font-display text-ink mt-2 text-4xl leading-tight sm:text-5xl">
                  {certificate.studentName}
                </h1>
                <p className="text-ink/70 mt-3 text-lg">
                  {certificate.program}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <DetailStat
                    icon={CalendarRange}
                    label="Duration"
                    value={
                      certificate.startDate || certificate.endDate
                        ? `${certificate.startDate ? formatDate(certificate.startDate) : "—"} – ${certificate.endDate ? formatDate(certificate.endDate) : "—"}`
                        : "—"
                    }
                  />
                  <DetailStat
                    icon={CalendarClock}
                    label="Issued"
                    value={formatDate(certificate.issueDate)}
                  />
                  <DetailStat
                    icon={Hash}
                    label="Certificate No."
                    value={certificate.certificateNumber}
                  />
                </div>

                {certificate.certificateFileUrl ? (
                  <div className="mt-8">
                    <p className="text-body mb-3 text-xs font-semibold tracking-[0.1em] uppercase">
                      Certificate document
                    </p>
                    <a
                      href={certificate.certificateFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border group block overflow-hidden rounded-2xl border"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL, not a local/optimizable asset */}
                      <img
                        src={certificate.certificateFileUrl}
                        alt={`${certificate.studentName}'s certificate`}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                    </a>
                  </div>
                ) : null}

                <div className="border-border mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                  <p className="text-body flex items-center gap-1.5 text-xs">
                    <Award aria-hidden="true" size={14} />
                    Verified just now ·{" "}
                    {verifiedAt.toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <PrintButton />
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-body mt-8 text-center text-xs">
          Issued and verified by{" "}
          <a
            href={siteConfig.url}
            className="hover:text-brand underline underline-offset-2"
          >
            {siteConfig.name}
          </a>
          . Questions about this certificate? Contact us directly.
        </p>
      </div>
    </main>
  );
}
