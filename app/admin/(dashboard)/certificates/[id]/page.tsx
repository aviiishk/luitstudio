import { notFound } from "next/navigation";

import { CertificateDetailPanel } from "@/components/admin/CertificateDetailPanel";
import { CopyLinkButton } from "@/components/admin/CopyLinkButton";
import { siteConfig } from "@/config/site";
import { getCertificateForAdmin } from "@/lib/certificates";
import { generateQrDataUrl } from "@/lib/qr-code";
import { slugify } from "@/utils/slugify";

interface CertificateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificateDetailPage({
  params,
}: CertificateDetailPageProps) {
  const { id } = await params;
  const certificate = await getCertificateForAdmin(id);

  if (!certificate) notFound();

  const verifyUrl = `${siteConfig.url}/verify/${certificate.id}`;
  const qrDataUrl = await generateQrDataUrl(verifyUrl);

  return (
    <div>
      <h1 className="text-ink text-2xl">{certificate.studentName}</h1>
      <p className="text-body mt-1 text-sm">
        {certificate.certificateNumber}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <CertificateDetailPanel certificate={certificate} />

        <div className="border-border shadow-soft flex flex-col items-center gap-4 rounded-2xl border bg-white p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- data: URL, next/image doesn't support it */}
          <img
            src={qrDataUrl}
            alt={`QR code linking to the verification page for ${certificate.studentName}'s certificate`}
            className="size-48 rounded-lg"
          />
          <a
            href={qrDataUrl}
            download={`${slugify(certificate.studentName)}-${certificate.id}-qr.png`}
            className="text-brand text-sm font-medium hover:underline"
          >
            Download QR code
          </a>
          <div className="w-full">
            <p className="text-body mb-2 truncate text-center text-xs">
              {verifyUrl}
            </p>
            <CopyLinkButton value={verifyUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
