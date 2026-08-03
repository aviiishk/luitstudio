import "server-only";

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

import { sanitizeHtml } from "@/lib/sanitize-html";

const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

const markdownProcessor = remark().use(remarkGfm).use(remarkHtml, {
  sanitize: false,
});

/**
 * Legacy rows (written through the old site's Markdown textarea editor) have
 * no HTML tags in `content`. New rows written through the Tiptap editor are
 * HTML. Both are normalized to sanitized HTML here so every consumer
 * (public page, admin editor's initial value) has one rendering path.
 */
export async function toSafeHtml(content: string): Promise<string> {
  const isLegacyMarkdown = !HTML_TAG_PATTERN.test(content);
  const html = isLegacyMarkdown
    ? (await markdownProcessor.process(content)).toString()
    : content;

  return sanitizeHtml(html);
}
