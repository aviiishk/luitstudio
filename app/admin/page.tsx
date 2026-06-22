"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Users, FileText, CheckCircle, XCircle, Clock,
  ExternalLink, Search, X, ArrowUpRight, Inbox, Shield,
  ArrowLeft, Plus, Copy, Trash2, IndianRupee, TrendingUp,
  AlertTriangle,
} from "lucide-react";

type Application = {
  id: string; full_name: string; email: string; phone: string;
  college: string; course: string; year: string; skills: string[];
  why_join: string; portfolio_url: string | null;
  status: "pending" | "accepted" | "rejected"; applied_at: string;
  admin_notes: string | null; utr: string | null;
};

type BlogPost = {
  id: string; title: string; slug: string; excerpt: string;
  content: string; cover_image: string | null; published: boolean;
  published_at: string | null; created_at: string; updated_at: string;
  tags: string[];
};

const STATUS = {
  pending:  { label: "Pending",  badge: "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/25",       dot: "bg-amber-400"   },
  accepted: { label: "Accepted", badge: "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/25", dot: "bg-emerald-400" },
  rejected: { label: "Rejected", badge: "bg-red-400/10 text-red-400 ring-1 ring-red-400/25",             dot: "bg-red-400"     },
} as const;

function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

/* ── Login ───────────────────────────────────────────────── */
function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else onLogin();
  };

  const field = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/25 outline-none focus:border-[#EC4899]/50 focus:ring-2 focus:ring-[#EC4899]/10 transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#08080f] flex">
      <div className="hidden lg:flex flex-col justify-between w-105 shrink-0 border-r border-white/7 px-10 py-10">
        <div className="font-heading font-black text-white text-lg tracking-tight">
          Luit<span className="bg-linear-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">Studio</span>
        </div>
        <div>
          <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-6">
            <Shield size={20} className="text-white/30" />
          </div>
          <p className="font-heading text-3xl font-black text-white leading-snug mb-3">Studio command<br />centre.</p>
          <p className="font-body text-sm text-white/35 leading-relaxed max-w-xs">Review internship applications, verify payments, manage blog content — all in one place.</p>
        </div>
        <p className="font-body text-xs text-white/20">Restricted access · Luit Studio</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-90">
          <div className="font-heading font-black text-white text-lg tracking-tight mb-10 lg:hidden">
            Luit<span className="bg-linear-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">Studio</span>
          </div>
          <h1 className="font-heading text-2xl font-black text-white mb-1">Sign in</h1>
          <p className="font-body text-sm text-white/35 mb-8">Admin access · authorized personnel only.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-body text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Email</label>
              <input className={field} type="email" placeholder="you@luitstudio.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block font-body text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Password</label>
              <input className={field} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <p className="font-body text-xs text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer mt-2">
              {loading ? "Signing in…" : "Continue →"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Field helper ────────────────────────────────────────── */
function Field({ label, value, full = false }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="font-body text-[10px] text-white/25 uppercase tracking-widest mb-1">{label}</p>
      <p className="font-body text-sm text-white/65 leading-relaxed">{value}</p>
    </div>
  );
}

/* ── Detail panel ────────────────────────────────────────── */
function DetailPanel({ app, onClose, onStatusChange, onDelete }: {
  app: Application;
  onClose: () => void;
  onStatusChange: (id: string, status: Application["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const [current, setCurrent]             = useState(app);
  const [updating, setUpdating]           = useState(false);
  const [deleting, setDeleting]           = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied]               = useState(false);

  const updateStatus = async (status: Application["status"]) => {
    setUpdating(true);
    await supabase.from("intern_applications").update({ status }).eq("id", current.id);
    const updated = { ...current, status };
    setCurrent(updated);
    onStatusChange(current.id, status);
    setUpdating(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    const { error } = await supabase.from("intern_applications").delete().eq("id", current.id);
    if (error) {
      console.error("[delete]", error.message);
      setDeleting(false);
      setConfirmDelete(false);
      return;
    }
    onDelete(current.id);
    onClose();
  };

  const copyUTR = async () => {
    await navigator.clipboard.writeText(current.utr ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />

      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-115 bg-[#0c0c15] border-l border-white/8 z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/7 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#EC4899]/25 to-[#06B6D4]/25 border border-white/10 flex items-center justify-center text-[13px] font-heading font-bold text-white shrink-0">
              {initials(current.full_name)}
            </div>
            <div className="min-w-0">
              <p className="font-body font-semibold text-white text-sm leading-tight truncate">{current.full_name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-body font-medium ${STATUS[current.status].badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS[current.status].dot}`} />
                  {STATUS[current.status].label}
                </span>
                {current.utr && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/25 font-body font-medium">
                    <IndianRupee size={9} /> Paid
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0">
            <X size={14} className="text-white/50" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Status actions */}
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => updateStatus("accepted")} disabled={updating || current.status === "accepted"}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-body font-semibold border transition-all duration-200 cursor-pointer ${current.status === "accepted" ? "bg-emerald-400/20 border-emerald-400/30 text-emerald-400" : "bg-emerald-400/8 border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/20 disabled:opacity-35 disabled:cursor-not-allowed"}`}>
              <CheckCircle size={12} /> Accept
            </button>
            <button onClick={() => updateStatus("rejected")} disabled={updating || current.status === "rejected"}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-body font-semibold border transition-all duration-200 cursor-pointer ${current.status === "rejected" ? "bg-red-400/20 border-red-400/30 text-red-400" : "bg-red-400/8 border-red-400/20 text-red-400 hover:bg-red-400/20 disabled:opacity-35 disabled:cursor-not-allowed"}`}>
              <XCircle size={12} /> Reject
            </button>
            <button onClick={() => updateStatus("pending")} disabled={updating || current.status === "pending"}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-body font-semibold border transition-all duration-200 cursor-pointer ${current.status === "pending" ? "bg-amber-400/20 border-amber-400/30 text-amber-400" : "bg-amber-400/8 border-amber-400/20 text-amber-400 hover:bg-amber-400/20 disabled:opacity-35 disabled:cursor-not-allowed"}`}>
              <Clock size={12} /> Pending
            </button>
          </div>

          {/* UTR block */}
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/6 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-amber-400/15">
              <IndianRupee size={12} className="text-amber-400" />
              <p className="font-body text-[10px] text-amber-400/80 uppercase tracking-widest font-semibold">Payment · UTR / Transaction ID</p>
            </div>
            <div className="px-4 py-3">
              {current.utr ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="flex-1 font-mono text-sm text-amber-300 bg-black/25 border border-amber-400/15 rounded-lg px-3 py-2 select-all break-all">
                      {current.utr}
                    </code>
                    <button onClick={copyUTR}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0">
                      {copied ? <CheckCircle size={12} className="text-emerald-400" /> : <Copy size={12} className="text-white/40" />}
                    </button>
                  </div>
                  <p className="font-body text-[10px] text-white/30">Verify in your UPI app / bank statement before accepting</p>
                </>
              ) : (
                <p className="font-body text-sm text-white/30 italic py-1">No UTR submitted</p>
              )}
            </div>
          </div>

          <div className="h-px bg-white/6" />

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" value={current.phone} />
            <Field label="Year" value={current.year} />
            <Field label="Course" value={current.course} full />
            <Field label="College" value={current.college} full />
            <Field label="Applied on" value={new Date(current.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} full />
          </div>

          {current.portfolio_url && (
            <>
              <div className="h-px bg-white/6" />
              <div>
                <p className="font-body text-[10px] text-white/25 uppercase tracking-widest mb-2">Portfolio</p>
                <a href={current.portfolio_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#06B6D4] font-body text-sm hover:underline break-all">
                  <ExternalLink size={12} className="shrink-0" />{current.portfolio_url}
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer — delete */}
        <div className="px-6 py-4 border-t border-white/7 shrink-0">
          <AnimatePresence mode="wait">
            {!confirmDelete ? (
              <motion.button key="del-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setConfirmDelete(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 text-white/30 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/6 font-body text-xs font-medium transition-all duration-200 cursor-pointer">
                <Trash2 size={13} /> Delete applicant
              </motion.button>
            ) : (
              <motion.div key="del-confirm" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-xl border border-red-400/25 bg-red-400/[0.07] p-3">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-red-400 shrink-0" />
                  <p className="font-body text-xs text-white/70">This permanently deletes the applicant. Cannot be undone.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDelete(false)}
                    className="flex-1 py-2 rounded-lg border border-white/10 text-white/40 hover:text-white font-body text-xs font-medium transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleDelete} disabled={deleting}
                    className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-body text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5">
                    {deleting
                      ? <><span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> Deleting…</>
                      : <><Trash2 size={12} /> Delete</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

/* ── Application row ─────────────────────────────────────── */
function AppRow({ app, onSelect }: { app: Application; onSelect: () => void }) {
  return (
    <motion.button layout onClick={onSelect}
      className="group w-full flex items-center gap-3.5 px-4 py-3.5 bg-white/2 hover:bg-white/4.5 border border-white/7 hover:border-white/[0.14] rounded-2xl transition-all duration-200 cursor-pointer text-left">
      <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#EC4899]/25 to-[#06B6D4]/25 border border-white/10 flex items-center justify-center text-[11px] font-heading font-bold text-white shrink-0">
        {initials(app.full_name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-body font-semibold text-[13px] text-white truncate">{app.full_name}</p>
          {app.utr && <span className="shrink-0 inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 font-body font-bold">₹</span>}
        </div>
        <p className="font-body text-xs text-white/35 truncate">{app.email}</p>
      </div>
      <p className="hidden md:block font-body text-xs text-white/30 truncate max-w-37.5 shrink-0">{app.college}</p>
      <p className="hidden sm:block font-body text-[11px] text-white/25 shrink-0">
        {new Date(app.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
      </p>
      <span className={`text-[10px] px-2.5 py-1 rounded-full font-body font-medium capitalize shrink-0 ${STATUS[app.status].badge}`}>
        {STATUS[app.status].label}
      </span>
      <ArrowUpRight size={13} className="text-white/15 group-hover:text-white/45 transition-colors shrink-0" />
    </motion.button>
  );
}

/* ── Post editor ─────────────────────────────────────────── */
function PostEditor({ post, onDone }: { post: BlogPost | null; onDone: () => void }) {
  const isNew = !post;
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [saving, setSaving]         = useState(false);
  const [deleting, setDeleting]     = useState(false);
  const [error, setError]           = useState("");
  const [form, setForm] = useState({
    title:       post?.title ?? "",
    slug:        post?.slug ?? "",
    excerpt:     post?.excerpt ?? "",
    content:     post?.content ?? "",
    cover_image: post?.cover_image ?? "",
    tags:        post?.tags?.join(", ") ?? "",
    published:   post?.published ?? false,
  });

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const slugify = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    set("title", title);
    if (!slugEdited) set("slug", slugify(title));
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.slug.trim())  { setError("Slug is required."); return; }
    setSaving(true); setError("");
    const payload = {
      title: form.title.trim(), slug: form.slug.trim(), excerpt: form.excerpt.trim(),
      content: form.content.trim(), cover_image: form.cover_image.trim() || null,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      published: form.published, updated_at: new Date().toISOString(),
      ...(form.published && !post?.published_at ? { published_at: new Date().toISOString() } : {}),
    };
    let err;
    if (isNew) { ({ error: err } = await supabase.from("blog_posts").insert(payload)); }
    else       { ({ error: err } = await supabase.from("blog_posts").update(payload).eq("id", post!.id)); }
    setSaving(false);
    if (err) setError(err.message);
    else onDone();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post permanently?")) return;
    setDeleting(true);
    await supabase.from("blog_posts").delete().eq("id", post!.id);
    onDone();
  };

  const inp = "w-full bg-white/5 border border-white/9 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder:text-white/25 outline-none focus:border-[#EC4899]/50 focus:ring-2 focus:ring-[#EC4899]/8 transition-all duration-200";
  const lbl = "block font-body text-[10px] text-white/35 uppercase tracking-widest mb-2";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <button onClick={onDone} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer">
            <ArrowLeft size={14} className="text-white/50" />
          </button>
          <h2 className="font-body font-semibold text-white text-sm">{isNew ? "New Post" : "Edit Post"}</h2>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button onClick={handleDelete} disabled={deleting}
              className="px-4 py-2 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 font-body text-xs hover:bg-red-400/20 disabled:opacity-40 transition-all cursor-pointer">
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 rounded-xl bg-linear-to-r from-[#EC4899] to-[#06B6D4] text-white font-body text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer">
            {saving ? "Saving…" : isNew ? "Create Post" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
          <p className="font-body text-xs text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className={lbl}>Title *</label>
          <input className={inp + " text-base font-semibold"} placeholder="Post title…" value={form.title} onChange={handleTitleChange} />
        </div>
        <div>
          <label className={lbl}>Slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-white/25 font-body text-sm shrink-0">/blog/</span>
            <input className={inp} placeholder="post-url-slug" value={form.slug}
              onChange={e => { setSlugEdited(true); set("slug", e.target.value); }} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>Cover Image URL</label>
            <input className={inp} placeholder="https://…" value={form.cover_image} onChange={e => set("cover_image", e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Tags (comma separated)</label>
            <input className={inp} placeholder="Web Dev, Tips…" value={form.tags} onChange={e => set("tags", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={lbl}>Excerpt</label>
          <textarea rows={2} className={inp + " resize-none"} placeholder="Short description shown on the blog listing…"
            value={form.excerpt} onChange={e => set("excerpt", e.target.value)} />
        </div>
        <div>
          <label className={lbl}>Content (Markdown supported)</label>
          <textarea rows={20} className={inp + " resize-y font-mono text-xs leading-relaxed"}
            placeholder={"# Heading\n\nWrite your post here…\n\n**Bold**, *italic*, `code`, and [links](url) supported."}
            value={form.content} onChange={e => set("content", e.target.value)} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/9 bg-white/2">
          <div>
            <p className="font-body text-sm font-medium text-white">Publish post</p>
            <p className="font-body text-xs text-white/30 mt-0.5">Make visible on the public blog</p>
          </div>
          <button type="button" onClick={() => set("published", !form.published)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${form.published ? "bg-linear-to-r from-[#EC4899] to-[#06B6D4]" : "bg-white/10"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${form.published ? "left-5.5" : "left-0.5"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Blog manager ────────────────────────────────────────── */
function BlogManager() {
  const [view, setView]               = useState<"list" | "editor">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [posts, setPosts]             = useState<BlogPost[]>([]);
  const [loading, setLoading]         = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchPosts();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchPosts]);

  const openEditor = (post: BlogPost | null) => { setEditingPost(post); setView("editor"); };
  const handleDone = () => { setView("list"); setEditingPost(null); fetchPosts(); };

  if (view === "editor") return <PostEditor post={editingPost} onDone={handleDone} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-body font-semibold text-white text-sm">Blog Posts</h2>
          <p className="font-body text-[11px] text-white/30 mt-0.5">{posts.length} posts · {posts.filter(p => p.published).length} published</p>
        </div>
        <button onClick={() => openEditor(null)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-[#EC4899] to-[#06B6D4] text-white font-body text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer">
          <Plus size={13} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 rounded-2xl bg-white/3 border border-white/6 animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FileText size={28} className="text-white/15 mb-3" />
          <p className="font-body text-sm text-white/25">No posts yet. Create your first one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map(post => (
            <button key={post.id} onClick={() => openEditor(post)}
              className="group w-full flex items-center gap-4 px-4 py-3.5 bg-white/2 hover:bg-white/4 border border-white/7 hover:border-white/13 rounded-2xl transition-all duration-200 cursor-pointer text-left">
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-[13px] text-white truncate">{post.title}</p>
                <p className="font-body text-[11px] text-white/30 truncate">/blog/{post.slug}</p>
              </div>
              {post.tags?.length > 0 && (
                <div className="hidden md:flex gap-1 shrink-0">
                  {post.tags.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/7 text-white/35 font-body">{t}</span>
                  ))}
                </div>
              )}
              <p className="hidden sm:block font-body text-[11px] text-white/25 shrink-0">
                {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-body font-medium shrink-0 ${post.published ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/25" : "bg-white/6 text-white/35 ring-1 ring-white/10"}`}>
                {post.published ? "Published" : "Draft"}
              </span>
              <ArrowUpRight size={13} className="text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab]           = useState<"applications" | "blog">("applications");
  const [apps, setApps]         = useState<Application[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<Application | null>(null);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("intern_applications").select("*").order("applied_at", { ascending: false });
    setApps((data as Application[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchApps();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchApps]);

  const updateStatus = (id: string, status: Application["status"]) =>
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  const deleteApp = (id: string) =>
    setApps(prev => prev.filter(a => a.id !== id));

  const filtered = apps.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.full_name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {
    total:    apps.length,
    pending:  apps.filter(a => a.status === "pending").length,
    accepted: apps.filter(a => a.status === "accepted").length,
    rejected: apps.filter(a => a.status === "rejected").length,
  };

  const paidCount = apps.filter(a => a.utr).length;

  const NAV = [
    { key: "applications" as const, label: "Applications", icon: Users,   badge: counts.pending },
    { key: "blog"         as const, label: "Blog",         icon: FileText, badge: 0 },
  ];

  const STATS = [
    { label: "Total",    value: counts.total,    Icon: TrendingUp,  color: "text-white",       border: "border-l-white/20",       bg: "bg-white/2"       },
    { label: "Pending",  value: counts.pending,  Icon: Clock,       color: "text-amber-400",   border: "border-l-amber-400/50",   bg: "bg-amber-400/4"   },
    { label: "Accepted", value: counts.accepted, Icon: CheckCircle, color: "text-emerald-400", border: "border-l-emerald-400/50", bg: "bg-emerald-400/4" },
    { label: "Rejected", value: counts.rejected, Icon: XCircle,     color: "text-red-400",     border: "border-l-red-400/50",     bg: "bg-red-400/4"     },
  ];

  return (
    <div className="min-h-screen bg-[#08080f] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/7">
        <div className="h-14 flex items-center px-5 border-b border-white/7 shrink-0">
          <p className="font-heading font-black text-white text-base tracking-tight">
            Luit<span className="bg-linear-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">Studio</span>
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(item => (
            <button key={item.key} onClick={() => setTab(item.key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-200 cursor-pointer ${tab === item.key ? "bg-white/8 text-white" : "text-white/35 hover:text-white hover:bg-white/4"}`}>
              <span className="flex items-center gap-2.5"><item.icon size={14} />{item.label}</span>
              {item.badge > 0 && (
                <span className="text-[10px] bg-[#EC4899]/15 text-[#EC4899] px-1.5 py-0.5 rounded-full font-semibold min-w-4.5 text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        {paidCount > 0 && (
          <div className="mx-3 mb-3 px-3 py-2.5 rounded-xl bg-amber-400/[0.07] border border-amber-400/20">
            <div className="flex items-center gap-2">
              <IndianRupee size={12} className="text-amber-400 shrink-0" />
              <div>
                <p className="font-body text-[11px] text-amber-400 font-semibold">{paidCount} with payment</p>
                <p className="font-body text-[10px] text-white/25">UTR submitted</p>
              </div>
            </div>
          </div>
        )}
        <div className="p-3 border-t border-white/7 shrink-0">
          <button onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/35 hover:text-white hover:bg-white/4 transition-all duration-200 cursor-pointer text-sm font-body">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-white/7 flex items-center justify-between px-5 sm:px-6 bg-[#08080f]/80 backdrop-blur-xl sticky top-0 z-30 shrink-0">
          <div>
            <h1 className="font-body font-semibold text-white text-sm">{tab === "applications" ? "Applications" : "Blog"}</h1>
            {tab === "applications" && (
              <p className="font-body text-[11px] text-white/30 hidden sm:block">
                {counts.total} total · {counts.pending} pending · {paidCount} paid
              </p>
            )}
          </div>
          <button onClick={onLogout} className="lg:hidden flex items-center gap-1.5 text-xs font-body text-white/35 hover:text-white transition-colors cursor-pointer">
            <LogOut size={13} /> Sign out
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 py-7">

            {tab === "applications" && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                  {STATS.map(s => (
                    <div key={s.label} className={`${s.bg} border border-white/7 border-l-2 ${s.border} rounded-2xl px-4 py-4`}>
                      <div className="flex items-start justify-between mb-2">
                        <p className={`font-heading text-2xl sm:text-3xl font-black leading-none ${s.color}`}>{s.value}</p>
                        <s.Icon size={14} className={`${s.color} opacity-50 mt-0.5`} />
                      </div>
                      <p className="font-body text-[11px] text-white/30 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
                  <div className="relative flex-1 max-w-sm">
                    <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…"
                      className="w-full pl-9 pr-4 py-2.5 bg-white/4 border border-white/9 rounded-xl text-[13px] font-body text-white placeholder:text-white/20 outline-none focus:border-[#EC4899]/40 focus:ring-2 focus:ring-[#EC4899]/8 transition-all duration-200" />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {(["all", "pending", "accepted", "rejected"] as const).map(f => (
                      <button key={f} onClick={() => setFilter(f)}
                        className={`px-3.5 py-2 rounded-xl text-[11px] font-body font-medium capitalize transition-all duration-200 cursor-pointer border ${filter === f ? "bg-white/9 text-white border-white/15" : "text-white/30 border-white/7 hover:text-white hover:border-white/12"}`}>
                        {f}{f !== "all" && counts[f as keyof typeof counts] > 0 ? ` · ${counts[f as keyof typeof counts]}` : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List */}
                {loading ? (
                  <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-15 rounded-2xl bg-white/3 border border-white/6 animate-pulse" />)}</div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <Inbox size={28} className="text-white/15 mb-3" />
                    <p className="font-body text-sm text-white/25">No applications match your filters.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filtered.map(app => <AppRow key={app.id} app={app} onSelect={() => setSelected(app)} />)}
                  </div>
                )}
              </>
            )}

            {tab === "blog" && <BlogManager />}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selected && (
          <DetailPanel
            app={selected}
            onClose={() => setSelected(null)}
            onStatusChange={(id, status) => { updateStatus(id, status); setSelected(prev => prev ? { ...prev, status } : null); }}
            onDelete={(id) => { deleteApp(id); setSelected(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(!!s));
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => { await supabase.auth.signOut(); setSession(false); };

  if (session === null) return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center">
      <div className="w-6 h-6 border-[1.5px] border-white/10 border-t-[#EC4899] rounded-full animate-spin" />
    </div>
  );

  return session ? <Dashboard onLogout={logout} /> : <Login onLogin={() => setSession(true)} />;
}
