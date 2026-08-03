import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/admin/(dashboard)/actions";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ButtonAction } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="bg-surface flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border bg-canvas border-b">
          <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4">
            <Link href="/admin" className="text-ink font-medium">
              Studio dashboard
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href={ROUTES.blog}
                className="text-body hover:text-ink text-sm whitespace-nowrap transition-colors"
              >
                View blog
              </Link>
              <form action={signOut}>
                <ButtonAction
                  type="submit"
                  variant="light"
                  className="min-h-9 px-4 text-sm whitespace-nowrap"
                >
                  Sign out
                </ButtonAction>
              </form>
            </div>
          </Container>
        </header>
        <AdminMobileNav />
        <Container className="py-6 sm:py-10">{children}</Container>
      </div>
    </div>
  );
}
