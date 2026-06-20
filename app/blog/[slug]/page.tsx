import { supabaseAdmin } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function readTime(content: string) {
  return Math.max(1, Math.ceil((content ?? "").trim().split(/\s+/).length / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabaseAdmin
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (!data) return { title: "Post not found — Luit Studio" };
  return {
    title: `${data.title} — Luit Studio`,
    description: data.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <main className="bg-[#fafafa] min-h-screen transition-colors duration-300">
      <Navbar />

      <article className="pt-28 pb-20 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <Link href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-body text-gray-400 hover:text-gray-900 transition-colors duration-200 mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            All posts
          </Link>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-[#EC4899]/10 text-[#EC4899] font-body font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-heading text-[30px] sm:text-[42px] font-black text-gray-900 leading-tight tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-sm font-body text-gray-400">
              <CalendarDays size={13} />
              {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-body text-gray-400">
              <Clock size={13} />
              {readTime(post.content)} min read
            </span>
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className="rounded-2xl overflow-hidden mb-10 bg-gray-100 aspect-video">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  );
}
