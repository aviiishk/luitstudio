import { hasSupabaseAdminEnv, supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

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

export default async function BlogPage() {
  const { data: posts } = hasSupabaseAdminEnv()
    ? await supabaseAdmin
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, published_at, tags, content")
        .eq("published", true)
        .order("published_at", { ascending: false })
    : { data: null };

  return (
    <main className="bg-[#fafafa] min-h-screen transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-14 px-5 sm:px-8 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gray-400 mb-4">
            Studio Blog
          </p>
          <h1 className="font-heading text-[36px] sm:text-[52px] font-black text-gray-900 leading-[0.9] tracking-tight">
            Insights from<br />
            <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              Luit Studio.
            </span>
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-28">
              <p className="font-body text-gray-400 text-sm">
                No posts yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(posts as Post[]).map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                  <article className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden bg-gray-100 shrink-0">
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

                      <h2 className="font-heading font-bold text-gray-900 text-[15px] leading-snug mb-2 group-hover:text-[#EC4899] transition-colors duration-200">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <span className="flex items-center gap-1 text-[11px] text-gray-400 font-body">
                          <CalendarDays size={11} />
                          {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400 font-body">
                          <Clock size={11} />
                          {readTime(post.content)} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
