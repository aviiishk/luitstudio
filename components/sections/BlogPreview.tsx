import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  published_at: string;
  tags: string[];
  content: string;
};

function readTime(content: string) {
  return Math.max(1, Math.ceil((content ?? "").trim().split(/\s+/).length / 200));
}

export default async function BlogPreview() {
  const { data: posts } = await supabaseAdmin
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, published_at, tags, content")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative px-5 sm:px-8 py-20 border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gray-400 dark:text-white/30 mb-3">
              From the blog
            </p>
            <h2 className="font-heading text-[28px] sm:text-[38px] font-black text-gray-900 dark:text-white leading-tight">
              Latest{" "}
              <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                insights.
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-body text-gray-400 dark:text-white/35 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group shrink-0"
          >
            View all posts
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(posts as Post[]).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
              <article className="flex flex-col h-full rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/[0.15] shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-white/[0.04] transition-all duration-300 overflow-hidden">
                {post.cover_image && (
                  <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-white/[0.04] shrink-0">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EC4899]/10 text-[#EC4899] font-body font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="font-heading font-bold text-gray-900 dark:text-white text-[15px] leading-snug mb-2 group-hover:text-[#EC4899] dark:group-hover:text-[#EC4899] transition-colors duration-200">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="font-body text-sm text-gray-500 dark:text-white/40 leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-white/30 font-body">
                      <CalendarDays size={11} />
                      {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-white/30 font-body">
                      <Clock size={11} />
                      {readTime(post.content)} min
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile: view all */}
        <div className="sm:hidden mt-7 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-body text-gray-400 dark:text-white/35 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            View all posts
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

      </div>
    </section>
  );
}
