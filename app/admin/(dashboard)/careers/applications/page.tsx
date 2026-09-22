import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { deleteApplication } from "@/app/admin/(dashboard)/careers/applications/actions";
import { ApplicationStatusSelect } from "@/components/admin/ApplicationStatusSelect";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { getAllApplicationsForAdmin } from "@/lib/careers";
import { formatDate } from "@/utils/format-date";

export default async function AdminApplicationsPage() {
  const applications = await getAllApplicationsForAdmin();

  return (
    <div>
      <Link
        href="/admin/careers"
        className="text-body hover:text-ink mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft aria-hidden="true" size={14} />
        Openings
      </Link>

      <div className="mb-8">
        <h1 className="text-ink text-2xl">Applications</h1>
        <p className="text-body mt-1 text-sm">
          {applications.length} total ·{" "}
          {applications.filter((application) => application.status === "new").length}{" "}
          new
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <p className="text-body text-sm">No applications yet.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {applications.map((application) => (
            <li
              key={application.id}
              className="border-border shadow-soft flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/careers/applications/${application.id}`}
                  className="text-ink hover:text-brand block truncate font-medium transition-colors"
                >
                  {application.fullName}
                </Link>
                <p className="text-body truncate text-sm">
                  {application.jobOpeningTitle ??
                    application.roleInterest ??
                    "General application"}
                </p>
              </div>
              <span className="text-body hidden shrink-0 text-sm sm:block">
                {formatDate(application.createdAt)}
              </span>
              <ApplicationStatusSelect
                id={application.id}
                status={application.status}
              />
              <DeleteEntityButton
                id={application.id}
                label={`${application.fullName}'s application`}
                action={deleteApplication}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
