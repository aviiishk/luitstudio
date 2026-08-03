import { Plus } from "lucide-react";
import Link from "next/link";

import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { ButtonLink } from "@/components/ui/button";
import { getAllPostsForAdmin } from "@/lib/blog";
import { formatDate } from "@/utils/format-date";

export default async function AdminBlogPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-ink text-2xl">Blog posts</h1>
          <p className="text-body mt-1 text-sm">
            {posts.length} posts · {posts.filter((post) => post.published).length}{" "}
            published
          </p>
        </div>
        <ButtonLink
          href="/admin/blog/new"
          variant="brand"
          icon={Plus}
          className="min-h-10 px-5"
        >
          New post
        </ButtonLink>
      </div>

      {posts.length === 0 ? (
        <div className="border-border rounded-2xl border border-dashed py-24 text-center">
          <p className="text-body text-sm">
            No posts yet. Create your first one.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-border shadow-soft flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 sm:gap-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-ink hover:text-brand block truncate font-medium transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-body truncate text-sm">/blog/{post.slug}</p>
              </div>
              <span className="text-body hidden shrink-0 text-sm sm:block">
                {formatDate(post.updatedAt)}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  post.published
                    ? "bg-green/25 text-green-ink"
                    : "bg-surface text-body"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
              <DeletePostButton id={post.id} title={post.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
