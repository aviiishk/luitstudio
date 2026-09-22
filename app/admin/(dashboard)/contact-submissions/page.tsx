import Link from "next/link";

import { deleteContactSubmission } from "@/app/admin/(dashboard)/contact-submissions/actions";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { getAllContactSubmissionsForAdmin } from "@/lib/contact-submissions";
import { formatDate } from "@/utils/format-date";

export default async function AdminContactSubmissionsPage() {
  const submissions = await getAllContactSubmissionsForAdmin();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-ink text-2xl">Messages</h1>
        <p className="text-body mt-1 text-sm">
          {submissions.length} submission{submissions.length === 1 ? "" : "s"}{" "}
          from the contact form.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <p className="text-body text-sm">No messages yet.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {submissions.map((submission) => (
            <li
              key={submission.id}
              className="border-border shadow-soft flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/contact-submissions/${submission.id}`}
                  className="text-ink hover:text-brand block truncate font-medium transition-colors"
                >
                  {submission.name}
                </Link>
                <p className="text-body truncate text-sm">
                  {submission.interest}
                </p>
              </div>
              <span className="text-body hidden shrink-0 text-sm sm:block">
                {formatDate(submission.createdAt)}
              </span>
              <DeleteEntityButton
                id={submission.id}
                label={`${submission.name}'s message`}
                action={deleteContactSubmission}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
