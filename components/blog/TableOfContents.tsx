import type { HeadingEntry } from "@/lib/blog-toc";

interface TableOfContentsProps {
  headings: HeadingEntry[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="border-border bg-surface/60 mt-10 rounded-2xl border p-5"
    >
      <p className="text-body text-xs font-semibold tracking-[0.18em] uppercase">
        On this page
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="text-body hover:text-brand text-sm transition-colors duration-200"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
