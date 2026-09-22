import { notFound } from "next/navigation";

import { OpeningForm } from "@/components/admin/OpeningForm";
import { getOpeningForAdmin } from "@/lib/careers";

interface EditOpeningPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOpeningPage({
  params,
}: EditOpeningPageProps) {
  const { id } = await params;
  const opening = await getOpeningForAdmin(id);

  if (!opening) notFound();

  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">Edit opening</h1>
      <OpeningForm
        mode="edit"
        openingId={opening.id}
        initial={{
          title: opening.title,
          slug: opening.slug,
          department: opening.department ?? "",
          employmentType: opening.employmentType,
          location: opening.location,
          summary: opening.summary,
          description: opening.description,
          responsibilities: opening.responsibilities.join("\n"),
          requirements: opening.requirements.join("\n"),
          status: opening.status,
        }}
      />
    </div>
  );
}
