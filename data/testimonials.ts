import { siteConfig } from "@/config/site";
import type { Testimonial } from "@/types/testimonial";

export const testimonials: readonly Testimonial[] = [
  {
    id: "ananya-das-feature",
    eyebrow: "Customer stories",
    quote: `${siteConfig.name}’s expertise transformed my vision into success!`,
    name: "Ananya Das",
    role: "Founder",
    company: "Northline",
    rating: null,
    avatar: null,
    image: {
      src: "/images/customer/customer-bg.jpg",
      alt: "Smiling client working on a laptop in a relaxed studio setting",
      width: 1001,
      height: 572,
      blurDataURL:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='20'%3E%3Crect width='35' height='20' fill='%232a2c26'/%3E%3C/svg%3E",
    },
    statistic: null,
    tone: "photo",
    layout: "wide",
  },
  {
    id: "recommendation-rate",
    eyebrow: "Facts & numbers",
    quote: null,
    name: null,
    role: null,
    company: null,
    rating: null,
    avatar: null,
    image: null,
    statistic: {
      value: "91%",
      label: "Clients recommend our design services.",
    },
    tone: "yellow",
    layout: "narrow",
  },
  {
    id: "creative-detail",
    eyebrow: "Customer stories",
    quote:
      "Their creativity and attention to detail transformed our brand completely!",
    name: null,
    role: null,
    company: null,
    rating: null,
    avatar: null,
    image: {
      src: "/images/customer/customer-stories.jpg",
      alt: "Colorful product scene with a cap, lemons, and an orange lamp beside the sea",
      width: 344,
      height: 220,
      blurDataURL:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='20'%3E%3Crect width='31' height='20' fill='%23ead8b4'/%3E%3C/svg%3E",
    },
    statistic: null,
    tone: "dark",
    layout: "narrow",
  },
  {
    id: "ananya-das-precision",
    eyebrow: "Customer stories",
    quote: `${siteConfig.name} brought our ideas to life with exceptional creativity and precision, exceeding expectations.`,
    name: "Ananya Das",
    role: "Founder",
    company: "Northline",
    rating: null,
    avatar: null,
    image: null,
    statistic: null,
    tone: "light",
    layout: "wide",
  },
] as const;
