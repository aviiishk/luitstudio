import { ArrowUpRight, Briefcase, FileText, Mail, Users } from "lucide-react";
import Link from "next/link";

import { getAllApplicationsForAdmin, getAllOpeningsForAdmin } from "@/lib/careers";
import { getAllPostsForAdmin } from "@/lib/blog";
import { getAllContactSubmissionsForAdmin } from "@/lib/contact-submissions";
import { getAllTeamMembersForAdmin } from "@/lib/team";

export default async function AdminOverviewPage() {
  const [posts, openings, applications, submissions, teamMembers] =
    await Promise.all([
      getAllPostsForAdmin(),
      getAllOpeningsForAdmin(),
      getAllApplicationsForAdmin(),
      getAllContactSubmissionsForAdmin(),
      getAllTeamMembersForAdmin(),
    ]);
  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;
  const openRoleCount = openings.filter(
    (opening) => opening.status === "published",
  ).length;
  const newApplicationCount = applications.filter(
    (application) => application.status === "new",
  ).length;

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

      <div className="mt-8 flex flex-col gap-3">
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

        <Link
          href="/admin/careers"
          className="border-border shadow-soft hover:border-brand group flex items-center gap-4 rounded-2xl border bg-white p-5 transition-colors"
        >
          <span className="bg-brand/10 text-brand grid size-11 shrink-0 place-items-center rounded-full">
            <Briefcase aria-hidden="true" size={20} />
          </span>
          <span className="flex-1">
            <span className="text-ink block font-medium">Careers</span>
            <span className="text-body block text-sm">
              {openRoleCount} open role{openRoleCount === 1 ? "" : "s"} ·{" "}
              {newApplicationCount} new application
              {newApplicationCount === 1 ? "" : "s"}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="text-body group-hover:text-brand shrink-0 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            size={18}
          />
        </Link>

        <Link
          href="/admin/contact-submissions"
          className="border-border shadow-soft hover:border-brand group flex items-center gap-4 rounded-2xl border bg-white p-5 transition-colors"
        >
          <span className="bg-brand/10 text-brand grid size-11 shrink-0 place-items-center rounded-full">
            <Mail aria-hidden="true" size={20} />
          </span>
          <span className="flex-1">
            <span className="text-ink block font-medium">Messages</span>
            <span className="text-body block text-sm">
              {submissions.length} contact form submission
              {submissions.length === 1 ? "" : "s"}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="text-body group-hover:text-brand shrink-0 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            size={18}
          />
        </Link>

        <Link
          href="/admin/team"
          className="border-border shadow-soft hover:border-brand group flex items-center gap-4 rounded-2xl border bg-white p-5 transition-colors"
        >
          <span className="bg-brand/10 text-brand grid size-11 shrink-0 place-items-center rounded-full">
            <Users aria-hidden="true" size={20} />
          </span>
          <span className="flex-1">
            <span className="text-ink block font-medium">Team</span>
            <span className="text-body block text-sm">
              {teamMembers.length} member{teamMembers.length === 1 ? "" : "s"}{" "}
              ·{" "}
              {
                teamMembers.filter((member) => member.status === "published")
                  .length
              }{" "}
              published on /about
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
