import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";

import { getAllPostsForAdmin } from "@/lib/blog";

export default async function AdminOverviewPage() {
  const posts = await getAllPostsForAdmin();
  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;

  const stats = [
    { label: "Total posts", value: posts.length },
    { label: "Published", value: publishedCount },
    { label: "Drafts", value: draftCount },
  ];

  return (
    <div>
      <h1 className="text-ink text-2xl">Overview</h1>
      <p className="text-body mt-1 text-sm">
        Welcome back. Here&apos;s what&apos;s happening across the site.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-border shadow-soft rounded-2xl border bg-white p-5"
          >
            <p className="text-ink text-3xl font-medium">{stat.value}</p>
            <p className="text-body mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/admin/blog"
          className="border-border shadow-soft hover:border-brand group flex items-center gap-4 rounded-2xl border bg-white p-5 transition-colors"
        >
          <span className="bg-brand/10 text-brand grid size-11 shrink-0 place-items-center rounded-full">
            <FileText aria-hidden="true" size={20} />
          </span>
          <span className="flex-1">
            <span className="text-ink block font-medium">Blog</span>
            <span className="text-body block text-sm">
              Write, edit, and publish posts
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="text-body group-hover:text-brand shrink-0 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            size={18}
          />
        </Link>
      </div>
    </div>
  );
}
