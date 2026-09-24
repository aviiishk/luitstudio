export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
}

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
  author: BlogAuthor | null;
}
