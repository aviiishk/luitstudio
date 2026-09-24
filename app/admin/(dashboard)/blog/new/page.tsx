import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { getCurrentAuthor } from "@/lib/current-author";

export default async function NewPostPage() {
  const author = await getCurrentAuthor();
  const authorLabel = author ? `${author.name} — ${author.role}` : null;

  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">New post</h1>
      <PostEditorForm mode="create" authorLabel={authorLabel} />
    </div>
  );
}
