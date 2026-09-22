import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteContactSubmission } from "@/app/admin/(dashboard)/contact-submissions/actions";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { getContactSubmissionForAdmin } from "@/lib/contact-submissions";
import { formatDate } from "@/utils/format-date";

interface ContactSubmissionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContactSubmissionDetailPage({
  params,
}: ContactSubmissionDetailPageProps) {
  const { id } = await params;
  const submission = await getContactSubmissionForAdmin(id);

  if (!submission) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/contact-submissions"
        className="text-body hover:text-ink mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft aria-hidden="true" size={14} />
        Messages
      </Link>

      <div className="border-border shadow-soft rounded-2xl border bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-ink text-2xl">{submission.name}</h1>
            <p className="text-body mt-1 text-sm">
              {formatDate(submission.createdAt)}
            </p>
          </div>
        </div>

        <dl className="border-border mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
              Email
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${submission.email}`}
                className="text-brand inline-flex items-center gap-1.5 text-sm hover:underline"
              >
                <Mail aria-hidden="true" size={14} />
                {submission.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
              Interested in
            </dt>
            <dd className="text-ink mt-1 text-sm">{submission.interest}</dd>
          </div>
          {submission.budget ? (
            <div>
              <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
                Budget
              </dt>
              <dd className="text-ink mt-1 text-sm">{submission.budget}</dd>
            </div>
          ) : null}
        </dl>

        <div className="border-border mt-6 border-t pt-6">
          <dt className="text-body/65 text-xs font-semibold tracking-widest uppercase">
            Message
          </dt>
          <dd className="text-ink mt-2 text-sm leading-6 whitespace-pre-wrap">
            {submission.message}
          </dd>
        </div>

        <div className="border-border mt-6 flex items-center justify-between border-t pt-6">
          <a
            href={`mailto:${submission.email}`}
            className="text-ink hover:text-brand text-sm font-medium transition-colors"
          >
            Reply by email →
          </a>
          <DeleteEntityButton
            id={submission.id}
            label={`${submission.name}'s message`}
            action={deleteContactSubmission}
            redirectTo="/admin/contact-submissions"
          />
        </div>
      </div>
    </div>
  );
}
