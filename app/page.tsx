import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import Expertise from "@/components/sections/Expertise";
import FeatureCarousel from "@/components/ui/feature-carousel";
import TestimonialsSection from "@/components/sections/testimonials";
import PortfolioSection from "@/components/sections/Portfolio";

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
