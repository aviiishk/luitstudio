"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";

const INK    = "#111110";
const SUBTLE = "rgba(250,250,247,0.45)";
const DIM    = "rgba(250,250,247,0.2)";
const BORDER = "rgba(250,250,247,0.1)";
const FG     = "#FAFAF7";

const NAV = [
  { label: "Home",   href: "/"           },
  { label: "Blog",   href: "/blog"       },
  { label: "Intern", href: "/internship" },
];

const SERVICES = [
  "Web Development", "App Development", "UI / UX Design",
  "SEO & Growth", "Performance Marketing", "Branding",
];

const SOCIALS = [
  { Icon: FaInstagram,  href: "https://instagram.com", label: "Instagram"   },
  { Icon: FaXTwitter,   href: "https://twitter.com",   label: "X / Twitter" },
  { Icon: FaLinkedinIn, href: "https://linkedin.com",  label: "LinkedIn"    },
  { Icon: FaGithub,     href: "https://github.com",    label: "GitHub"      },
];

export default function Footer() {
  const pathname = usePathname();
  const isInternship = pathname === "/internship" || pathname.startsWith("/internship/");

  return (
    <footer style={{ backgroundColor: INK, color: FG }}>

      {/* ── Main grid ── */}
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 pt-16 sm:pt-20 pb-12 sm:pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-heading text-[20px] font-black mb-3" style={{ color: FG }}>
            Luit Studio
          </p>
          <p className="font-body text-[13px] leading-[1.75] mb-6 max-w-[220px]" style={{ color: SUBTLE }}>
            {isInternship
              ? "A modern internship experience built around real projects, mentorship, and portfolio-ready work."
              : "A full-stack design & development studio for ambitious businesses."}
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-opacity duration-200 hover:opacity-60"
              >
                <Icon size={15} style={{ color: SUBTLE }} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p
            className="font-body text-[10px] uppercase tracking-[0.28em] mb-5"
            style={{ color: DIM }}
          >
            Navigation
          </p>
          <ul className="space-y-3">
            {NAV.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-body text-[13px] transition-opacity duration-200 hover:opacity-60"
                  style={{ color: SUBTLE }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p
            className="font-body text-[10px] uppercase tracking-[0.28em] mb-5"
            style={{ color: DIM }}
          >
            Services
          </p>
          <ul className="space-y-3">
            {SERVICES.map(s => (
              <li key={s} className="font-body text-[13px]" style={{ color: SUBTLE }}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            className="font-body text-[10px] uppercase tracking-[0.28em] mb-5"
            style={{ color: DIM }}
          >
            Get in touch
          </p>
          <a
            href="mailto:luitstudio.in@gmail.com"
            className="font-body text-[13px] block mb-3 transition-opacity duration-200 hover:opacity-60"
            style={{ color: SUBTLE }}
          >
            luitstudio.in@gmail.com
          </a>
          <a
            href="mailto:luitstudio.in@gmail.com"
            className="inline-flex items-center gap-2 font-body text-[12px] font-semibold px-4 py-2 rounded-full border transition-opacity duration-200 hover:opacity-70"
            style={{ color: FG, borderColor: BORDER }}
          >
            {isInternship ? "Apply now" : "Start a project"}
          </a>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p suppressHydrationWarning className="font-body text-[11px]" style={{ color: DIM }}>
          © {new Date().getFullYear()} Luit Studio. All rights reserved.
        </p>
        <p className="font-body text-[11px]" style={{ color: DIM }}>
          Crafted by Luit Studio
        </p>
      </div>

    </footer>
  );
}
