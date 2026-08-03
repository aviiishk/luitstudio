import type { BlogArticle } from "@/types/blog";

// The source template contains no Blog section or article content.
// Future CMS/MDX records should be normalized to this contract.
export const blogArticles = [] satisfies readonly BlogArticle[];
