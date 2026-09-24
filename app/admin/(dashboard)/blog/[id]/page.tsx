import { notFound } from "next/navigation";

import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { getPostForAdmin } from "@/lib/blog";
import { toSafeHtml } from "@/lib/blog-content";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostForAdmin(id);

  if (!post) notFound();

  const contentHtml = await toSafeHtml(post.content);
  const authorLabel = post.author
    ? `${post.author.name} — ${post.author.role}`
    : null;

  return (
    <div>
      <h1 className="text-ink mb-8 text-2xl">Edit post</h1>
      <PostEditorForm
        mode="edit"
        postId={post.id}
        authorLabel={authorLabel}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          contentHtml,
          coverImage: post.coverImage ?? "",
          tags: post.tags.join(", "),
          published: post.published,
        }}
      />
    </div>
  );
}
