import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs,
  SiFigma, SiFlutter, SiTailwindcss, SiSupabase,
  SiPostgresql, SiVercel, SiAmazonaws, SiFramer,
  SiAdobeaftereffects, SiWebflow, SiGit,
} from "react-icons/si";

const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";
const LIGHT  = "#A9A9A5";
const INK    = "#111110";

const TOOLS = [
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs,
  SiFigma, SiFramer, SiWebflow, SiTailwindcss,
  SiFlutter, SiSupabase, SiPostgresql,
  SiVercel, SiAmazonaws, SiAdobeaftereffects, SiGit,
];

const TRACK = [...TOOLS, ...TOOLS];

export default function Tools() {
  return (
    <section className="border-t" style={{ backgroundColor: BG, borderColor: BORDER }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-16 text-center">

        <p
          className="font-body text-[11px] uppercase tracking-[0.28em] mb-3"
          style={{ color: LIGHT }}
        >
          What we build with
        </p>
        <h2
          className="font-heading font-black tracking-tight mb-8"
          style={{ color: INK, fontSize: "clamp(26px, 3.2vw, 42px)" }}
        >
          Our tech stack
        </h2>

        {/* Ticker strip */}
        <div
          className="relative rounded-2xl border overflow-hidden py-6"
          style={{ backgroundColor: "#FFFFFF", borderColor: BORDER }}
        >
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
            style={{ background: "linear-gradient(to right, #FFFFFF 50%, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
            style={{ background: "linear-gradient(to left, #FFFFFF 50%, transparent)" }}
          />

          <div
            className="flex items-center whitespace-nowrap"
            style={{
              animation: "toolsScroll 30s linear infinite",
              willChange: "transform",
            }}
          >
            {TRACK.map((Icon, i) => (
              <span key={i} className="inline-flex shrink-0 mx-8">
                <Icon size={28} style={{ color: LIGHT }} />
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes toolsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
