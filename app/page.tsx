import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Expertise = dynamic(() => import("@/components/sections/Expertise"), {
  loading: () => <div className="h-24 bg-[#fafafa] dark:bg-[#08080f]" />,
});
const PortfolioSection = dynamic(() => import("@/components/sections/Portfolio"), {
  loading: () => <div className="h-24 bg-[#fafafa] dark:bg-[#08080f]" />,
});
const FeatureCarousel = dynamic(() => import("@/components/ui/feature-carousel"), {
  loading: () => <div className="h-24 bg-[#fafafa] dark:bg-[#08080f]" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials"), {
  loading: () => <div className="h-24 bg-[#fafafa] dark:bg-[#08080f]" />,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="h-24 bg-[#fafafa] dark:bg-[#08080f]" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#fafafa] dark:bg-[#08080f] overflow-hidden transition-colors duration-300">
      <Hero />
      <Expertise />
      <PortfolioSection />
      <FeatureCarousel />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
