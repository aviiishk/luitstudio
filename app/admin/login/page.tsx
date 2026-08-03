"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ButtonAction } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  const fieldClasses =
    "border-border w-full rounded-xl border px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <main className="bg-surface flex min-h-screen items-center justify-center px-5 py-16">
      <Container className="mx-auto max-w-sm">
        <div className="shadow-soft rounded-2xl bg-white p-8">
          <h1 className="text-ink text-2xl">Sign in</h1>
          <p className="text-body mt-2 text-sm">
            Admin access for the Luit Studio team.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="text-ink mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClasses}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-ink mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={fieldClasses}
              />
            </div>
            {error ? <p className="text-rose-ink text-sm">{error}</p> : null}
            <ButtonAction
              type="submit"
              variant="brand"
              disabled={loading}
              className="mt-2 w-full justify-center"
            >
              {loading ? "Signing in…" : "Sign in"}
            </ButtonAction>
          </form>
        </div>
      </Container>
    </main>
  );
}
