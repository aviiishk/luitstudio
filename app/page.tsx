import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { CTA } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Pricing } from "@/components/sections/pricing";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { homeCta } from "@/data/cta";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen overflow-clip">
      <Hero />
      <ClientMarquee />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Blog />
      <CTA {...homeCta} />
    </main>
  );
}
