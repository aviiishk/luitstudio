import { notFound } from "next/navigation";

import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { getTeamMemberForAdmin } from "@/lib/team";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const { id } = await params;
  const member = await getTeamMemberForAdmin(id);

  if (!member) notFound();

  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">Edit team member</h1>
      <TeamMemberForm
        mode="edit"
        memberId={member.id}
        initial={{
          name: member.name,
          role: member.role,
          bio: member.bio ?? "",
          imageUrl: member.imageUrl ?? "",
          isFounder: member.isFounder,
          displayOrder: member.displayOrder,
          status: member.status,
        }}
      />
    </div>
  );
}
