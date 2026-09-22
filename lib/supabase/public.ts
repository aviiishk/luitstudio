import "server-only";

import { createClient } from "@supabase/supabase-js";

// Stateless client for public, unauthenticated reads (published blog posts,
// certificate verification). Unlike lib/supabase/server.ts, it never reads
// or writes cookies, so it never attempts to resolve/refresh an auth
// session — avoiding noisy "Invalid Refresh Token" errors from a stale
// session cookie on pages that don't need auth at all.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
