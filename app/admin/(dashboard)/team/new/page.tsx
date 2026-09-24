import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">Add team member</h1>
      <TeamMemberForm mode="create" />
    </div>
  );
}
