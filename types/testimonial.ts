export interface TestimonialImage {
  alt: string;
  blurDataURL: string;
  height: number;
  src: string;
  width: number;
}

export interface TestimonialStatistic {
  label: string;
  value: string;
}

export type TestimonialLayout = "wide" | "narrow";
export type TestimonialTone = "photo" | "yellow" | "dark" | "light";

export interface Testimonial {
  avatar: TestimonialImage | null;
  company: string | null;
  eyebrow: string;
  id: string;
  image: TestimonialImage | null;
  layout: TestimonialLayout;
  name: string | null;
  quote: string | null;
  rating: number | null;
  role: string | null;
  statistic: TestimonialStatistic | null;
  tone: TestimonialTone;
}
