export type CtaBackground = "gradient" | "surface" | "none";
export type CtaButtonVariant = "dark" | "brand" | "light" | "outlineLight";

export interface CtaButton {
  href: string;
  label: string;
  variant: CtaButtonVariant;
}

export interface CtaContent {
  background?: CtaBackground;
  buttons: readonly CtaButton[];
  description: string;
  emphasis?: string;
  id: string;
  title: string;
}
