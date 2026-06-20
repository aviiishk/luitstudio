import { Shield, Users, Layers, Target, Sparkles } from "lucide-react";

const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#F2F0EB";

const REASONS = [
  {
    Icon: Shield,
    title: "Quality obsessed",
    desc: "We operate with a single standard. If it's not world-class, it doesn't ship.",
    anim: "whyFloat1", delay: "0s",
  },
  {
    Icon: Users,
    title: "Senior talent only",
    desc: "You work directly with senior talent. No juniors. No outsourcing.",
    anim: "whyFloat2", delay: "0.4s",
  },
  {
    Icon: Layers,
    title: "1:1 design implementation",
    desc: "Our full-stack team delivers true 1:1, pixel-perfect builds every time.",
    anim: "whyFloat3", delay: "0.8s",
  },
  {
    Icon: Target,
    title: "Dedicated project manager",
    desc: "A single point of contact, fully invested in the project's success.",
    anim: "whyFloat4", delay: "0.2s",
  },
  {
    Icon: Sparkles,
    title: "Illustration, motion & more",
    desc: "Illustration and animation designed to make everything feel alive.",
    anim: "whyFloat5", delay: "0.6s",
  },
];

export default function WhyUs() {
  return (
    <section
      className="border-t"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">

        {/* Header */}
        <h2
          className="font-heading font-black tracking-tight text-center mb-14 sm:mb-16"
          style={{ color: INK, fontSize: "clamp(28px, 3.8vw, 50px)" }}
        >
          Why Luit Studio
        </h2>

        {/* 3 + 2 centered grid */}
        <div
          className="grid gap-10 sm:gap-14"
          style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
        >
          {REASONS.map((r, i) => {
            const colStart =
              i === 0 ? 1 :
              i === 1 ? 3 :
              i === 2 ? 5 :
              i === 3 ? 2 :
                        4;

            return (
              <div
                key={r.title}
                className="flex flex-col items-center text-center"
                style={{
                  gridColumn: `${colStart} / span 2`,
                  /* On mobile collapse to full width */
                }}
              >
                {/* Animated icon container */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5 why-icon"
                  style={{ animationName: r.anim, animationDelay: r.delay }}
                >
                  <r.Icon
                    size={36}
                    strokeWidth={1.4}
                    style={{ color: INK }}
                  />
                </div>

                <h3
                  className="font-heading font-bold text-[15px] sm:text-[16px] mb-2.5 leading-snug"
                  style={{ color: INK }}
                >
                  {r.title}
                </h3>
                <p
                  className="font-body text-[13.5px] leading-[1.72] max-w-55"
                  style={{ color: MUTED }}
                >
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        /* Mobile: full-width single column */
        @media (max-width: 639px) {
          .why-grid > div {
            grid-column: 1 / span 6 !important;
          }
        }

        /* Icon float animations — each has slightly different timing */
        .why-icon {
          animation-duration: 3s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes whyFloat1 {
          0%   { transform: translateY(0px) rotate(-1deg); }
          100% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes whyFloat2 {
          0%   { transform: translateY(-4px) scale(0.97); }
          100% { transform: translateY(4px) scale(1.03); }
        }
        @keyframes whyFloat3 {
          0%   { transform: translateY(0px) rotate(2deg); }
          100% { transform: translateY(-7px) rotate(-2deg); }
        }
        @keyframes whyFloat4 {
          0%   { transform: translateY(-3px) scale(1); }
          100% { transform: translateY(5px) scale(0.96); }
        }
        @keyframes whyFloat5 {
          0%   { transform: translateY(0) rotate(-2deg) scale(0.98); }
          100% { transform: translateY(-9px) rotate(2deg) scale(1.04); }
        }
      `}</style>
    </section>
  );
}
