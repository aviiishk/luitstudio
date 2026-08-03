"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { adminNavItems, isAdminNavItemActive } from "@/components/admin/admin-nav-items";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="border-border bg-canvas hidden w-56 shrink-0 flex-col gap-1 border-r p-4 md:flex"
    >
      {adminNavItems.map((item) => {
        const isActive = isAdminNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand/10 text-brand"
                : "text-body hover:bg-surface hover:text-ink"
            }`}
          >
            <item.icon aria-hidden="true" size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
