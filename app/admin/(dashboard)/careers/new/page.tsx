import { OpeningForm } from "@/components/admin/OpeningForm";

export default function NewOpeningPage() {
  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">New opening</h1>
      <OpeningForm mode="create" />
    </div>
  );
}
