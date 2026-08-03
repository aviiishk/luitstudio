import { PostEditorForm } from "@/components/admin/PostEditorForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">New post</h1>
      <PostEditorForm mode="create" />
    </div>
  );
}
