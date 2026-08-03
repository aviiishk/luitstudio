export interface PortfolioImage {
  alt: string;
  blurDataURL: string;
  height: number;
  src: string;
  width: number;
}

export interface PortfolioCta {
  external: boolean;
  href: string;
  label: string;
}

export interface PortfolioProject {
  category: string;
  client: string;
  cta: PortfolioCta | null;
  description: string | null;
  featured: boolean;
  image: PortfolioImage;
  slug: string;
  technologies: readonly string[];
  title: string;
  year: number | null;
}
