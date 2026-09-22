import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { getPublishedPosts } from "@/lib/blog";

// Portfolio and Testimonials sections are removed until there is real,
// permissioned work and genuine client quotes to show — see the audit
// remediation plan. Re-add both once that content exists.
//
// The homepage's own closing CTA was removed too: it duplicated the
// footer's "Let's build something people remember" CTA immediately below it.
//
// Section order is deliberate: Services comes before About so a visitor
// can confirm "can they do what I need" before reading the studio's
// story — see the homepage conversion review.

export default async function HomePage() {
  const recentPosts = await getPublishedPosts({ limit: 3 });

  return (
    <main id="main-content" className="min-h-screen overflow-clip">
      <Hero />
      <Services />
      <ClientMarquee />
      <About />
      <Process />
      <Pricing />
      <FAQ />
      <Blog articles={recentPosts} />
    </main>
  );
}
