import Link from "next/link";
import { ArrowRight, Code2, Smartphone, TrendingUp } from "lucide-react";

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG = "#FAFAF7";
const CARD = "#FFFFFF";
const WARM = "#B9A07A";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    description: "High-performance websites, web apps, and SaaS platforms built for speed, scale, and conversion.",
    tags: ["Next.js", "React", "CMS", "E-commerce"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native & cross-platform mobile apps for iOS and Android that users actually enjoy using.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: TrendingUp,
    title: "SEO & Growth",
    description: "Technical SEO and content strategy that compounds your organic reach month over month.",
    tags: ["Technical SEO", "Content", "Analytics"],
  },
];

export default function ExpertiseSection() {
  return (
    <section
      className="relative overflow-hidden border-t"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(185,160,122,0.09), transparent 28%), radial-gradient(circle at 82% 18%, rgba(17,17,16,0.045), transparent 26%), linear-gradient(180deg, #FAFAF7 0%, #F7F4EE 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.82), transparent)" }}
      />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-20 text-center sm:px-8 sm:pb-16 sm:pt-28 xl:px-12">
        <p
          className="mb-4 font-body text-[11px] uppercase tracking-[0.42em]"
          style={{ color: LIGHT }}
        >
          What we do
        </p>
        <h2
          className="font-heading font-black tracking-[-0.055em] leading-[0.9]"
          style={{ color: INK, fontSize: "clamp(48px, 7vw, 92px)" }}
        >
          Our Services
        </h2>
        <div className="mx-auto mt-4 h-4 w-16 text-[#B9A07A]">
          <svg viewBox="0 0 64 16" fill="none" aria-hidden="true">
            <path
              d="M3 10 C14 2 20 14 31 7 C41 1 45 12 61 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.78"
            />
          </svg>
        </div>
        <p
          className="mx-auto mt-5 max-w-[560px] font-body text-[17px] leading-[1.65] sm:text-[18px]"
          style={{ color: MUTED }}
        >
          We help startups and brands build digital products, grow visibility and create meaningful experiences.
        </p>
      </div>

      {/* Cards */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24 xl:px-12">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="expertise-card group relative min-h-[360px] overflow-hidden rounded-[24px] border p-8 shadow-[0_24px_70px_rgba(17,17,16,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CFC7BA] hover:shadow-[0_30px_90px_rgba(17,17,16,0.1)] sm:p-9 lg:min-h-[390px]"
                  style={{
                    backgroundColor: CARD,
                    borderColor: BORDER,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-10 top-12 h-16 w-16 opacity-45"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(17,17,16,0.18) 1.2px, transparent 1.2px)",
                      backgroundSize: "14px 14px",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-8 flex h-[74px] w-[74px] items-center justify-center rounded-[18px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] transition-transform duration-300 group-hover:scale-[1.03]"
                    style={{
                      background: "linear-gradient(135deg, #F4F1EA, #E7E2D8)",
                      borderColor: BORDER,
                    }}
                  >
                    <Icon size={29} strokeWidth={2.2} style={{ color: INK }} />
                  </div>

                  {/* Text */}
                  <div className="flex min-h-[178px] flex-col">
                    <p
                      className="mb-3 font-heading text-[24px] font-black leading-none tracking-[-0.04em]"
                      style={{ color: WARM }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="mb-4 font-heading text-[25px] font-black leading-tight tracking-[-0.04em] sm:text-[27px]"
                      style={{ color: INK }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="max-w-[330px] font-body text-[16px] leading-[1.65]"
                      style={{ color: MUTED }}
                    >
                      {s.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 border-t pt-6" style={{ borderColor: BORDER }}>
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full border bg-[#FAFAF7] px-3.5 py-2 font-body text-[12px]"
                        style={{ borderColor: BORDER, color: INK }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/intro"
              className="group inline-flex items-center gap-3 font-body text-[16px] transition-colors duration-200"
              style={{ color: INK }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#111110] group-hover:text-white"
                style={{ borderColor: WARM }}
              >
                <ArrowRight size={16} />
              </span>
              <span className="border-b pb-1 transition-colors duration-200 group-hover:text-black" style={{ borderColor: WARM }}>
                Let&apos;s build something great together
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .expertise-card {
          opacity: 0;
          animation: expertiseReveal 0.62s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes expertiseReveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
