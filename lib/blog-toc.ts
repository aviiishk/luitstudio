import { slugify } from "@/utils/slugify";

export interface HeadingEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

const HEADING_PATTERN = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g;

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

/**
 * Injects stable, unique ids into h2/h3 tags in already-sanitized post HTML,
 * and returns the heading list for a table of contents.
 */
export function addHeadingAnchors(html: string): {
  html: string;
  headings: HeadingEntry[];
} {
  const headings: HeadingEntry[] = [];
  const seen = new Map<string, number>();

  const withAnchors = html.replace(
    HEADING_PATTERN,
    (match, level: string, attrs: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return match;

      let id = slugify(text) || "section";
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;

      headings.push({ id, text, level: Number(level) as 2 | 3 });
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: withAnchors, headings };
}
