export type ClientLogoMark = "arrow" | "grid" | "orbit" | "spark" | "shield";

export interface ClientLogoData {
  id: string;
  name: string;
  mark: ClientLogoMark;
  color: string;
}

export const clientLogos: readonly ClientLogoData[] = [
  {
    id: "astera",
    name: "Astera",
    mark: "spark",
    color: "#f97316",
  },
  {
    id: "northline",
    name: "Northline",
    mark: "orbit",
    color: "#1b1d1e",
  },
  {
    id: "verdant",
    name: "Verdant",
    mark: "shield",
    color: "#09a86f",
  },
  {
    id: "formworks",
    name: "Formworks",
    mark: "grid",
    color: "#1b1d1e",
  },
  {
    id: "orbit",
    name: "Orbit",
    mark: "arrow",
    color: "#3a04ff",
  },
] as const;
