import { ROUTES } from "@/constants/routes";
import type { PortfolioProject } from "@/types/portfolio";

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    title: "FlowBank",
    slug: "flowbank",
    category: "UX Research",
    client: "FlowBank",
    image: {
      src: "/images/work/work-img-1.jpg",
      alt: "FlowBank mobile payment interface displayed on a phone held in one hand",
      width: 624,
      height: 410,
      blurDataURL:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='21'%3E%3Crect width='32' height='21' fill='%23dff0ce'/%3E%3C/svg%3E",
    },
    year: null,
    featured: true,
    technologies: ["Interface Design"],
    description: null,
    cta: {
      label: "Start a project inspired by FlowBank",
      href: ROUTES.contact,
      external: false,
    },
  },
  {
    title: "Academy.co",
    slug: "academy-co",
    category: "Product Design",
    client: "Academy.co",
    image: {
      src: "/images/work/work-img-2.jpg",
      alt: "Academy learning dashboard showing course cards and navigation",
      width: 624,
      height: 410,
      blurDataURL:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='21'%3E%3Crect width='32' height='21' fill='%23dedcf0'/%3E%3C/svg%3E",
    },
    year: null,
    featured: true,
    technologies: ["Interaction Design"],
    description: null,
    cta: {
      label: "Start a project inspired by Academy.co",
      href: ROUTES.contact,
      external: false,
    },
  },
  {
    title: "Genome",
    slug: "genome",
    category: "Brand Identity Design",
    client: "Genome",
    image: {
      src: "/images/work/work-img-3.jpg",
      alt: "Genome identity over a laboratory researcher working with a microscope",
      width: 624,
      height: 410,
      blurDataURL:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='21'%3E%3Crect width='32' height='21' fill='%23c7cdd0'/%3E%3C/svg%3E",
    },
    year: null,
    featured: true,
    technologies: ["UX Research"],
    description: null,
    cta: {
      label: "Start a project inspired by Genome",
      href: ROUTES.contact,
      external: false,
    },
  },
  {
    title: "Hotto",
    slug: "hotto",
    category: "Visual Storytelling",
    client: "Hotto",
    image: {
      src: "/images/work/work-img-4.jpg",
      alt: "Hotto brand website displayed on a laptop with a smiling model",
      width: 624,
      height: 410,
      blurDataURL:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='21'%3E%3Crect width='32' height='21' fill='%23dce8e9'/%3E%3C/svg%3E",
    },
    year: null,
    featured: true,
    technologies: ["Web & Mobile Design"],
    description: null,
    cta: {
      label: "Start a project inspired by Hotto",
      href: ROUTES.contact,
      external: false,
    },
  },
] as const;
