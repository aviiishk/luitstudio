import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { TeamLayoutEditor } from "@/components/admin/TeamLayoutEditor";
import { getAllTeamMembersForAdmin } from "@/lib/team";

export default async function TeamLayoutPage() {
  const members = await getAllTeamMembersForAdmin();

  return (
    <div>
      <Link
        href="/admin/team"
        className="text-body hover:text-ink mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft aria-hidden="true" size={14} />
        Team
      </Link>

      <div className="mb-6">
        <h1 className="text-ink text-2xl">Team layout</h1>
        <p className="text-body mt-1 text-sm">
          Arrange how the team connects to Luit Studio on the About page.
          Every member connects directly to the root — dragging one doesn&apos;t
          change anyone else&apos;s connection.
        </p>
      </div>

      {members.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <p className="text-body text-sm">
            No team members yet — add one first from the Team page.
          </p>
        </div>
      ) : (
        <TeamLayoutEditor members={members} />
      )}
    </div>
  );
}
