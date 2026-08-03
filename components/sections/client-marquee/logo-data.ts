export type ClientLogoMark = "arrow" | "grid" | "orbit" | "spark" | "shield";

interface ClientLogoIconData {
  id: string;
  name: string;
  type: "icon";
  mark: ClientLogoMark;
  color: string;
}

interface ClientLogoImageData {
  id: string;
  name: string;
  type: "image";
  src: string;
  width: number;
  height: number;
}

export type ClientLogoData = ClientLogoIconData | ClientLogoImageData;

export const clientLogos: readonly ClientLogoData[] = [
  {
    id: "predictx",
    name: "PredictX",
    type: "image",
    src: "/images/clients/predictx.png",
    width: 531,
    height: 160,
  },
  {
    id: "aahii",
    name: "AAHII",
    type: "image",
    src: "/images/clients/aahii.png",
    width: 641,
    height: 160,
  },
  {
    id: "astera",
    name: "Astera",
    type: "icon",
    mark: "spark",
    color: "#f97316",
  },
  {
    id: "northline",
    name: "Northline",
    type: "icon",
    mark: "orbit",
    color: "#1b1d1e",
  },
  {
    id: "verdant",
    name: "Verdant",
    type: "icon",
    mark: "shield",
    color: "#09a86f",
  },
  {
    id: "formworks",
    name: "Formworks",
    type: "icon",
    mark: "grid",
    color: "#1b1d1e",
  },
  {
    id: "orbit",
    name: "Orbit",
    type: "icon",
    mark: "arrow",
    color: "#3a04ff",
  },
] as const;
