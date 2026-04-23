"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SocialIconKey from "@/components/ui/social-icon-key";

export default function Footer() {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.from(".footer-reveal", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    });
  }, { scope: ref });

  return (
    <footer
      ref={ref}
      className="bg-neutral-100 text-black pt-16 md:pt-20 pb-10 overflow-hidden"
    >

      {/* 🔝 TOP GRID */}
      <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3 items-start">

        {/* LEFT */}
        <div className="footer-reveal">
          <h3 className="text-xl md:text-3xl font-semibold leading-snug mb-6 max-w-md">
            Stay connected for early access to our newest tools and updates
          </h3>

          <button className="px-5 py-2.5 rounded-full border border-black hover:bg-black hover:text-white transition text-sm">
            Subscribe
          </button>
        </div>

        {/* NAV */}
        <div className="footer-reveal">
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2 text-neutral-600 text-sm">
            {["About", "Projects", "Services", "Contact"].map((item) => (
              <li key={item} className="hover:text-black cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE (SERVICES + SOCIAL KEYS) */}
        <div className="footer-reveal flex flex-col items-end">

          {/* SERVICES */}
          <div className="mb-10 text-right">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-neutral-600 text-sm">
              {[
                "Web Development",
                "SEO Optimization",
                "Social Media",
                "Performance Marketing",
              ].map((item) => (
                <li key={item} className="hover:text-black cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        
        </div>

      </div>

      {/* 🔥 BIG BRAND TEXT */}
     {/* 🔥 BIG BRAND TEXT + SOCIAL KEYS */}
<div className="relative py-12 md:py-16 overflow-hidden">

  {/* BRAND */}
  <h1 className="text-[80px] sm:text-[120px] md:text-[200px] lg:text-[260px] font-bold leading-[0.8] tracking-[-3px] whitespace-nowrap px-6">
    Luit Studio
  </h1>

  {/* 🔥 SOCIAL KEYS (ATTACHED RIGHT) */}
<div className="absolute right-[80px] md:right-[140px] bottom-6 md:bottom-12 grid grid-cols-2 gap-6">

  <SocialIconKey
    title="Instagram"
    href="https://instagram.com"
    icon="https://www.firstinternet.co.uk/app/themes/forge-theme/public/images/social-icons/instagram.036da8.svg"
  />

  <SocialIconKey
    title="Twitter"
    href="https://twitter.com"
    icon="https://www.firstinternet.co.uk/app/themes/forge-theme/public/images/social-icons/tiktok.ef6a53.svg"
  />

  <SocialIconKey
    title="LinkedIn"
    href="https://linkedin.com"
    icon="https://www.firstinternet.co.uk/app/themes/forge-theme/public/images/social-icons/linkedin.40eb65.svg"
  />

  <SocialIconKey
    title="Work"
    href="/work"
    icon="https://www.firstinternet.co.uk/app/themes/forge-theme/public/images/social-icons/mystery.70099e.svg"
  />

</div>

</div>

      {/* 🔻 BOTTOM */}
      <div className="border-t border-black/20 pt-6 px-6 text-xs uppercase text-neutral-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4">

          {/* LEFT */}
          <div className="text-center md:text-left font-semibold text-black">
            © {new Date().getFullYear()} Luit Studio
          </div>

          {/* CENTER */}
          <div className="flex justify-center gap-6">
            <span className="hover:text-black cursor-pointer">About</span>
            <span className="hover:text-black cursor-pointer">Contact</span>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end gap-6">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
          </div>

        </div>
      </div>

    </footer>
  );
}