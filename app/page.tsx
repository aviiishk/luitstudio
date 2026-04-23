"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import Expertise from "@/components/sections/Expertise";
import FeatureCarousel from "@/components/ui/feature-carousel";
import TestimonialsSection from "@/components/sections/testimonials";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
    
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* HERO */}
      <div className="relative z-10">
        <Hero />
      </div>
      
      <Expertise />
      <FeatureCarousel />
      <TestimonialsSection/>
      <Footer />

    </main>
  );
}