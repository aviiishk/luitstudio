export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: readonly string[];
  publishedAt: string;
  updatedAt: string;
}
