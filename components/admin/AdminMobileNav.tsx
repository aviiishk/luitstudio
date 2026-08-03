"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { adminNavItems, isAdminNavItemActive } from "@/components/admin/admin-nav-items";

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="border-border bg-canvas flex gap-1 overflow-x-auto border-b px-4 py-2 md:hidden"
    >
      {adminNavItems.map((item) => {
        const isActive = isAdminNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand/10 text-brand"
                : "text-body hover:bg-surface hover:text-ink"
            }`}
          >
            <item.icon aria-hidden="true" size={16} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
