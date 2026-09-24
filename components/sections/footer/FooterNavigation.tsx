import Link from "next/link";

import type { NavigationGroup } from "@/types/navigation";

interface FooterNavigationProps {
  groups: readonly NavigationGroup[];
}

export function FooterNavigation({ groups }: FooterNavigationProps) {
  return (
    <nav aria-label="Footer navigation">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="text-ink/70 text-xs font-semibold tracking-[0.2em] uppercase">
            {group.title}
          </h2>
          <ul className="mt-5 flex flex-col gap-2.5">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-ink hover:text-brand focus-visible:text-brand inline-flex text-sm transition-[transform,color] duration-200 hover:translate-x-1 focus-visible:translate-x-1 motion-reduce:transform-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
