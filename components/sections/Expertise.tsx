import { Code2, Smartphone, TrendingUp } from "lucide-react";

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#F2F0EB";
const CARD   = "#FFFFFF";

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
    <section className="border-t" style={{ backgroundColor: BG, borderColor: BORDER }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 pt-16 sm:pt-20 pb-10 text-center">
        <p
          className="font-body text-[11px] uppercase tracking-[0.28em] mb-3"
          style={{ color: LIGHT }}
        >
          What we do
        </p>
        <h2
          className="font-heading font-black tracking-tight leading-[1.0]"
          style={{ color: INK, fontSize: "clamp(32px, 4.5vw, 56px)" }}
        >
          Our Services
        </h2>
      </div>

      {/* Cards */}
      <div className="border-t" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl p-7 flex flex-col gap-5 border hover:shadow-[0_6px_28px_rgba(0,0,0,0.07)] transition-shadow duration-300 expertise-card"
                  style={{
                    backgroundColor: CARD,
                    borderColor: BORDER,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: BG }}
                  >
                    <Icon size={20} style={{ color: INK }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3
                      className="font-heading text-[19px] font-black leading-tight mb-2.5"
                      style={{ color: INK }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="font-body text-[13.5px] leading-[1.75]"
                      style={{ color: MUTED }}
                    >
                      {s.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t" style={{ borderColor: BORDER }}>
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-body text-[10px] px-2.5 py-1 rounded-full border"
                        style={{ borderColor: BORDER, color: LIGHT }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .expertise-card {
          opacity: 0;
          animation: expertiseReveal 0.5s ease forwards;
        }
        @keyframes expertiseReveal {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
