import { ArrowUpRight, Inbox, Plus } from "lucide-react";
import Link from "next/link";

import { deleteOpening } from "@/app/admin/(dashboard)/careers/actions";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { ButtonLink } from "@/components/ui/button";
import { getAllApplicationsForAdmin, getAllOpeningsForAdmin } from "@/lib/careers";
import { formatDate } from "@/utils/format-date";

const statusStyles: Record<string, string> = {
  draft: "bg-surface text-body",
  published: "bg-green/25 text-green-ink",
  closed: "bg-rose/20 text-rose-ink",
};

export default async function AdminCareersPage() {
  const [openings, applications] = await Promise.all([
    getAllOpeningsForAdmin(),
    getAllApplicationsForAdmin(),
  ]);
  const newApplicationCount = applications.filter(
    (application) => application.status === "new",
  ).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-ink text-2xl">Job openings</h1>
          <p className="text-body mt-1 text-sm">
            {openings.length} openings ·{" "}
            {openings.filter((opening) => opening.status === "published").length}{" "}
            published
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonLink
            href="/admin/careers/applications"
            variant="outline"
            icon={Inbox}
            className="min-h-10 px-5"
          >
            Applications
            {newApplicationCount > 0 ? ` (${newApplicationCount} new)` : ""}
          </ButtonLink>
          <ButtonLink
            href="/admin/careers/new"
            variant="brand"
            icon={Plus}
            className="min-h-10 px-5"
          >
            New opening
          </ButtonLink>
        </div>
      </div>

      {openings.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <p className="text-body text-sm">
            No openings yet. The careers page shows the honest &ldquo;always
            open to an introduction&rdquo; message until you add one.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {openings.map((opening) => (
            <li
              key={opening.id}
              className="border-border shadow-soft flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/careers/${opening.id}`}
                  className="text-ink hover:text-brand block truncate font-medium transition-colors"
                >
                  {opening.title}
                </Link>
                <p className="text-body truncate text-sm">
                  {[opening.department, opening.employmentType, opening.location]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <span className="text-body hidden shrink-0 text-sm sm:block">
                {formatDate(opening.updatedAt)}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[opening.status]}`}
              >
                {opening.status}
              </span>
              {opening.status === "published" ? (
                <a
                  href={`/career/apply/${opening.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${opening.title} live`}
                  className="text-body hover:text-brand hidden shrink-0 transition-colors sm:block"
                >
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              ) : null}
              <DeleteEntityButton
                id={opening.id}
                label={opening.title}
                action={deleteOpening}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
