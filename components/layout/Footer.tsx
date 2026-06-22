"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const SOCIALS = [
  { Icon: FaInstagram, href: "https://www.instagram.com/luitstudio", label: "Instagram" },
  { Icon: FaXTwitter, href: "https://x.com/luitstudio", label: "X / Twitter" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/luitstudio", label: "LinkedIn" },
  { Icon: FaGithub, href: "https://github.com/luitstudio", label: "GitHub" },
];

export default function Footer() {
  const pathname = usePathname();
  const isInternship = pathname === "/internship" || pathname.startsWith("/internship/");

  return (
    <footer className="relative min-h-[820px] overflow-hidden bg-[#010205] text-[#FAFAF7] sm:min-h-[760px] lg:min-h-[860px]">
      <Image
        src="/footer/brahmaputra-footer.webp"
        alt=""
        fill
        priority={false}
        loading="lazy"
        quality={80}
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,4,10,0.3)_0%,rgba(1,4,10,0.18)_34%,rgba(1,2,5,0.58)_73%,rgba(1,2,5,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,2,5,0.82),rgba(1,2,5,0.22)_34%,rgba(1,2,5,0.18)_62%,rgba(1,2,5,0.78))]" />

      <div className="relative z-10 mx-auto flex min-h-[820px] max-w-7xl flex-col justify-between px-5 pb-7 pt-20 sm:min-h-[760px] sm:px-8 sm:pt-24 lg:min-h-[860px] xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(280px,360px)] lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="Luit Studio home" className="mb-7 inline-flex">
              <Image
                src="/logo/logo-darkmode.png"
                alt="Luit Studio"
                width={320}
                height={100}
                className="h-14 w-auto object-contain drop-shadow-[0_10px_30px_rgba(125,211,252,0.16)]"
              />
            </Link>
            <p className="font-heading text-[28px] font-black leading-[1.02] tracking-tight text-white sm:text-[34px]">
              Building digital experiences from the banks of the Brahmaputra.
            </p>
            <p className="mt-5 max-w-[310px] font-body text-sm leading-7 text-cyan-50/52">
              A digital studio shaped by current, craft, and the quiet force of Assam.
            </p>
            <div className="mt-7 flex items-center gap-4">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[0.08] hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-cyan-100/10 bg-[#03101f]/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-7 lg:mt-4">
            <p className="mb-4 font-body text-[10px] uppercase tracking-[0.32em] text-cyan-100/40">
              Contact
            </p>
            <a
              href="mailto:luitstudio.in@gmail.com"
              className="group mb-5 flex items-center gap-3 font-body text-sm text-white/72 transition-colors duration-200 hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-100/10 text-cyan-100 transition-colors duration-200 group-hover:bg-cyan-100/16">
                <Mail size={15} />
              </span>
              luitstudio.in@gmail.com
            </a>
            <Link
              href="/intro"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-100/20 bg-white px-5 py-3.5 font-body text-sm font-semibold text-[#04101f] shadow-[0_18px_45px_rgba(125,211,252,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(125,211,252,0.26)]"
            >
              Book Discovery Call
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="mt-4 font-body text-xs leading-6 text-white/46">
              {isInternship
                ? "For internship queries, write to us or book a quick intro."
                : "Tell us what you are building. We usually respond within 24 hours."}
            </p>
          </div>
        </div>

        <div className="pt-48 sm:pt-60 lg:pt-72">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 font-body text-[11px] text-white/44 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Luit Studio</p>
            <p>Crafted in Assam</p>
            <p>Inspired by the river that connects millions.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
