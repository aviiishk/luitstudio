import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Tools from "@/components/sections/Tools";
import WhyUs from "@/components/sections/WhyUs";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import HomeCTA from "@/components/sections/HomeCTA";

const Expertise = dynamic(() => import("@/components/sections/Expertise"), {
  loading: () => <div className="h-24 bg-[#F2F0EB]" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials"), {
  loading: () => <div className="h-24 bg-[#FAFAF7]" />,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="h-24 bg-[#FAFAF7]" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAF7]">
      <Hero />
      <WhyUs />
      <Team />
      <Expertise />
      <Tools />
      <TestimonialsSection />
      <FAQ />
      <HomeCTA />
      <Footer />
    </main>
  );
}
