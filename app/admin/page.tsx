"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Users, FileText, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, ExternalLink, Search } from "lucide-react";

type Application = {
  id: string; full_name: string; email: string; phone: string;
  college: string; course: string; year: string; skills: string[];
  why_join: string; portfolio_url: string | null;
  status: "pending" | "accepted" | "rejected"; applied_at: string;
  admin_notes: string | null;
};

const STATUS_COLOR = {
  pending:  "bg-yellow-100 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/20",
  accepted: "bg-green-100  dark:bg-green-400/10  text-green-700  dark:text-green-400  border-green-200  dark:border-green-400/20",
  rejected: "bg-red-100    dark:bg-red-400/10    text-red-700    dark:text-red-400    border-red-200    dark:border-red-400/20",
};

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

  const inp = "w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-body outline-none focus:border-[#EC4899]/60 focus:ring-2 focus:ring-[#EC4899]/10 transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#08080f] flex items-center justify-center px-5 transition-colors duration-300">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-heading text-xl font-black text-gray-900 dark:text-white mb-1">Luit Studio <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">Admin</span></p>
          <p className="font-body text-sm text-gray-400 dark:text-white/35">Sign in to access the dashboard</p>
        </div>
        <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-sm dark:shadow-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#EC4899]/50 to-[#06B6D4]/50 rounded-t-2xl" />
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-white/55 font-body mb-1.5 uppercase tracking-wider">Email</label>
              <input className={inp} type="email" placeholder="admin@luitstudio.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-white/55 font-body mb-1.5 uppercase tracking-wider">Password</label>
              <input className={inp} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-xs text-red-500 font-body bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white font-body font-semibold text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.25)]">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Application row ─────────────────────────────────────── */
function AppRow({ app, onStatusChange }: { app: Application; onStatusChange: (id: string, status: Application["status"]) => void }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status: Application["status"]) => {
    setUpdating(true);
    await supabase.from("intern_applications").update({ status }).eq("id", app.id);
    onStatusChange(app.id, status);
    setUpdating(false);
  };

  return (
    <div className="border border-gray-200 dark:border-white/[0.08] rounded-2xl bg-white dark:bg-white/[0.02] overflow-hidden transition-colors duration-300">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EC4899]/20 to-[#06B6D4]/20 flex items-center justify-center shrink-0 font-heading font-bold text-sm text-[#EC4899]">
            {app.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-body font-semibold text-sm text-gray-900 dark:text-white truncate">{app.full_name}</p>
            <p className="font-body text-xs text-gray-400 dark:text-white/40 truncate">{app.email} · {app.college}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-body font-medium capitalize ${STATUS_COLOR[app.status]}`}>{app.status}</span>
          {open ? <ChevronUp size={14} className="text-gray-400 dark:text-white/30" /> : <ChevronDown size={14} className="text-gray-400 dark:text-white/30" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-gray-100 dark:border-white/[0.06]">
            <div className="px-5 py-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-gray-400 dark:text-white/35 font-body uppercase tracking-wider mb-1">Phone</p><p className="font-body text-gray-700 dark:text-white/70">{app.phone}</p></div>
                <div><p className="text-xs text-gray-400 dark:text-white/35 font-body uppercase tracking-wider mb-1">Course</p><p className="font-body text-gray-700 dark:text-white/70">{app.course} · {app.year}</p></div>
                <div className="sm:col-span-2"><p className="text-xs text-gray-400 dark:text-white/35 font-body uppercase tracking-wider mb-1">Skills</p><div className="flex flex-wrap gap-1.5 mt-1">{app.skills.map(s => <span key={s} className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/50 font-body">{s}</span>)}</div></div>
                <div className="sm:col-span-2"><p className="text-xs text-gray-400 dark:text-white/35 font-body uppercase tracking-wider mb-1">Why Luit Studio</p><p className="font-body text-gray-700 dark:text-white/65 text-sm leading-relaxed">{app.why_join}</p></div>
                {app.portfolio_url && <div className="sm:col-span-2"><p className="text-xs text-gray-400 dark:text-white/35 font-body uppercase tracking-wider mb-1">Portfolio</p><a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#06B6D4] font-body text-sm hover:underline"><ExternalLink size={12} />{app.portfolio_url}</a></div>}
                <div><p className="text-xs text-gray-400 dark:text-white/35 font-body uppercase tracking-wider mb-1">Applied</p><p className="font-body text-gray-700 dark:text-white/70 text-sm">{new Date(app.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p></div>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => updateStatus("accepted")} disabled={updating || app.status === "accepted"} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-100 dark:bg-green-400/10 border border-green-200 dark:border-green-400/20 text-green-700 dark:text-green-400 font-body text-xs font-medium hover:bg-green-200 dark:hover:bg-green-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
                  <CheckCircle size={13} /> Accept
                </button>
                <button onClick={() => updateStatus("rejected")} disabled={updating || app.status === "rejected"} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-100 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 text-red-700 dark:text-red-400 font-body text-xs font-medium hover:bg-red-200 dark:hover:bg-red-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
                  <XCircle size={13} /> Reject
                </button>
                <button onClick={() => updateStatus("pending")} disabled={updating || app.status === "pending"} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-yellow-100 dark:bg-yellow-400/10 border border-yellow-200 dark:border-yellow-400/20 text-yellow-700 dark:text-yellow-400 font-body text-xs font-medium hover:bg-yellow-200 dark:hover:bg-yellow-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
                  <Clock size={13} /> Pending
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab]     = useState<"applications"|"blog">("applications");
  const [apps, setApps]   = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<"all"|"pending"|"accepted"|"rejected">("all");
  const [search, setSearch]   = useState("");

  const fetchApps = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("intern_applications").select("*").order("applied_at", { ascending: false });
    setApps((data as Application[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const updateStatus = (id: string, status: Application["status"]) =>
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  const filtered = apps.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !a.full_name.toLowerCase().includes(search.toLowerCase()) && !a.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = { total: apps.length, pending: apps.filter(a => a.status === "pending").length, accepted: apps.filter(a => a.status === "accepted").length, rejected: apps.filter(a => a.status === "rejected").length };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#08080f] transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/[0.08] bg-white/90 dark:bg-[#08080f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <p className="font-heading font-black text-base text-gray-900 dark:text-white">Luit <span className="bg-gradient-to-r from-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">Admin</span></p>
          <button onClick={onLogout} className="flex items-center gap-1.5 text-xs font-body text-gray-400 dark:text-white/35 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 cursor-pointer">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-white/[0.04] rounded-xl w-fit mb-8 border border-gray-200 dark:border-white/[0.06]">
          {([["applications", "Applications", Users], ["blog", "Blog", FileText]] as const).map(([key, label, Icon]) => (
            <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-body font-medium transition-all duration-200 cursor-pointer ${tab === key ? "bg-white dark:bg-white/[0.08] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white"}`}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {tab === "blog" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EC4899]/15 to-[#06B6D4]/15 flex items-center justify-center mb-4">
              <FileText size={28} className="text-[#EC4899]" />
            </div>
            <h3 className="font-heading text-xl font-black text-gray-900 dark:text-white mb-2">Blog Coming Soon</h3>
            <p className="font-body text-sm text-gray-400 dark:text-white/35 max-w-xs">The blog editor is currently being built. Check back soon.</p>
          </div>
        )}

        {tab === "applications" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total",    value: counts.total,    color: "text-gray-900 dark:text-white" },
                { label: "Pending",  value: counts.pending,  color: "text-yellow-600 dark:text-yellow-400" },
                { label: "Accepted", value: counts.accepted, color: "text-green-600  dark:text-green-400"  },
                { label: "Rejected", value: counts.rejected, color: "text-red-600    dark:text-red-400"    },
              ].map(s => (
                <div key={s.label} className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-4 shadow-sm dark:shadow-none">
                  <p className={`font-heading text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="font-body text-xs text-gray-400 dark:text-white/35 mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…" className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] rounded-xl text-sm font-body text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none focus:border-[#EC4899]/50 transition-colors duration-200" />
              </div>
              <div className="flex gap-1.5">
                {(["all","pending","accepted","rejected"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-2 rounded-xl text-xs font-body font-medium capitalize transition-all duration-200 cursor-pointer ${filter === f ? "bg-gradient-to-r from-[#EC4899] to-[#06B6D4] text-white" : "bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white"}`}>{f}</button>
                ))}
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-gray-100 dark:bg-white/[0.04] animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-white/30 font-body text-sm">No applications found.</div>
            ) : (
              <div className="space-y-3">
                {filtered.map(app => <AppRow key={app.id} app={app} onStatusChange={updateStatus} />)}
              </div>
            )}
          </>
        )}
      </div>
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#08080f] flex items-center justify-center transition-colors duration-300">
      <div className="w-8 h-8 border-2 border-gray-200 dark:border-white/20 border-t-[#EC4899] rounded-full animate-spin" />
    </div>
  );

  return session ? <Dashboard onLogout={logout} /> : <Login onLogin={() => setSession(true)} />;
}
