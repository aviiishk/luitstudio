import { ArrowLeft, ArrowUpRight, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteApplication } from "@/app/admin/(dashboard)/careers/applications/actions";
import { ApplicationStatusSelect } from "@/components/admin/ApplicationStatusSelect";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { ResumePreview } from "@/components/admin/ResumePreview";
import { getApplicationForAdmin } from "@/lib/careers";
import { formatDate } from "@/utils/format-date";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = await getApplicationForAdmin(id);

  if (!application) notFound();

  const hasResume = Boolean(application.resumeUrl);

  return (
    <div className={hasResume ? "max-w-5xl" : "max-w-2xl"}>
      <Link
        href="/admin/careers/applications"
        className="text-body hover:text-ink mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft aria-hidden="true" size={14} />
        Applications
      </Link>

      <div
        className={
          hasResume
            ? "grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]"
            : ""
        }
      >
        <div className="border-border shadow-soft rounded-2xl border bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-ink text-2xl">{application.fullName}</h1>
              <p className="text-body mt-1 text-sm">
                {application.jobOpeningTitle
                  ? `Applied for ${application.jobOpeningTitle}`
                  : (application.roleInterest ?? "General application")}
                {" · "}
                {formatDate(application.createdAt)}
              </p>
            </div>
            <ApplicationStatusSelect
              id={application.id}
              status={application.status}
            />
          </div>

          <dl className="border-border mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${application.email}`}
                  className="text-brand inline-flex items-center gap-1.5 text-sm hover:underline"
                >
                  <Mail aria-hidden="true" size={14} />
                  {application.email}
                </a>
              </dd>
            </div>
            {application.linkUrl ? (
              <div>
                <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
                  Portfolio
                </dt>
                <dd className="mt-1">
                  <a
                    href={application.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand inline-flex items-center gap-1.5 text-sm hover:underline"
                  >
                    <ArrowUpRight aria-hidden="true" size={14} />
                    {application.linkUrl}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="border-border mt-6 border-t pt-6">
            <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
              Message
            </dt>
            <dd className="text-ink mt-2 text-sm leading-6 whitespace-pre-wrap">
              {application.message}
            </dd>
          </div>

          <div className="border-border mt-6 flex items-center justify-between border-t pt-6">
            <a
              href={`mailto:${application.email}`}
              className="text-ink hover:text-brand text-sm font-medium transition-colors"
            >
              Reply by email →
            </a>
            <DeleteEntityButton
              id={application.id}
              label={`${application.fullName}'s application`}
              action={deleteApplication}
              redirectTo="/admin/careers/applications"
            />
          </div>
        </div>

        {application.resumeUrl ? (
          <div className="border-border shadow-soft flex h-[75vh] flex-col overflow-hidden rounded-2xl border bg-white lg:sticky lg:top-6 lg:h-[calc(100vh-6.5rem)]">
            <div className="border-border flex items-center gap-2 border-b px-6 py-4">
              <FileText aria-hidden="true" className="text-body" size={15} />
              <span className="text-ink text-sm font-semibold">Resume</span>
            </div>
            <div className="min-h-0 flex-1 p-3 sm:p-4">
              <ResumePreview url={application.resumeUrl} className="h-full" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
