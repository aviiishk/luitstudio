import { Network, Pencil, Plus, Star } from "lucide-react";
import Link from "next/link";

import { deleteTeamMember } from "@/app/admin/(dashboard)/team/actions";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { ButtonLink } from "@/components/ui/button";
import { getAllTeamMembersForAdmin } from "@/lib/team";

const statusStyles: Record<string, string> = {
  draft: "bg-surface text-body",
  published: "bg-green/25 text-green-ink",
};

export default async function AdminTeamPage() {
  const members = await getAllTeamMembersForAdmin();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-ink text-2xl">Team</h1>
          <p className="text-body mt-1 text-sm">
            {members.length} member{members.length === 1 ? "" : "s"} ·{" "}
            {members.filter((member) => member.status === "published").length}{" "}
            published on /about
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonLink
            href="/admin/team/layout"
            variant="outline"
            icon={Network}
            className="min-h-10 px-5"
          >
            Edit layout
          </ButtonLink>
          <ButtonLink
            href="/admin/team/new"
            variant="brand"
            icon={Plus}
            className="min-h-10 px-5"
          >
            Add team member
          </ButtonLink>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <p className="text-body text-sm">No team members yet.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {members.map((member) => (
            <li
              key={member.id}
              className="border-border shadow-soft flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
            >
              {member.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/external URL
                <img
                  src={member.imageUrl}
                  alt=""
                  className="bg-surface size-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="bg-surface text-body grid size-12 shrink-0 place-items-center rounded-full text-xs font-semibold">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              )}
              <Link
                href={`/admin/team/${member.id}`}
                className="min-w-0 flex-1"
              >
                <span className="text-ink hover:text-brand flex items-center gap-1.5 truncate font-medium transition-colors">
                  {member.name}
                  {member.isFounder ? (
                    <Star
                      aria-label="Co-founder"
                      className="text-yellow fill-yellow shrink-0"
                      size={13}
                    />
                  ) : null}
                </span>
                <p className="text-body truncate text-sm">{member.role}</p>
              </Link>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[member.status]}`}
              >
                {member.status}
              </span>
              <Link
                href={`/admin/team/${member.id}`}
                aria-label={`Edit ${member.name}`}
                className="text-body hover:text-brand hover:bg-surface grid size-9 shrink-0 place-items-center rounded-full transition-colors"
              >
                <Pencil aria-hidden="true" size={16} />
              </Link>
              <DeleteEntityButton
                id={member.id}
                label={member.name}
                action={deleteTeamMember}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
