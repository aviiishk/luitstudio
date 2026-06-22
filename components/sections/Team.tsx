const INK    = "#111110";
const MUTED  = "#6B6B68";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";

const TEAM = [
  // Row 1 — 3
  { name: "Prince",               role: "Founder & Creative Technologist", seed: "bxyagx2t" },
  { name: "Abhishek",             role: "Co-Founder & Lead Engineer",      seed: "abhishek22"    },
  { name: "Anish", role: "UI / UX Design",                  seed: "rahul77"    },
  // Row 2 — 4"
  { name: "Preetom", role: "Brand Design",     seed: "sneha11"    },
  { name: "Sweety",       role: "Content & Social", seed: "arjun55"    },

  // Row 3 — 3
];

const ROW1 = TEAM.slice(0, 3);
const ROW2 = TEAM.slice(3, 7);
const ROW3 = TEAM.slice(7);

function MemberCard({ name, role, seed }: { name: string; role: string; seed: string }) {
  const avatarUrl =
    `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=eae7df&radius=16`;

  return (
    <div className="flex flex-col items-center text-center gap-3 team-card">
      {/* Avatar */}
      <div
        className="w-[88px] h-[88px] rounded-2xl overflow-hidden border"
        style={{ backgroundColor: "#EAE7DF", borderColor: BORDER }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={name}
          width={88}
          height={88}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div>
        <p
          className="font-heading font-bold text-[14px] leading-snug"
          style={{ color: INK }}
        >
          {name}
        </p>
        <p
          className="font-body text-[12px] mt-0.5"
          style={{ color: MUTED }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section
      className="border-t"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-16 sm:pb-20">

        {/* Heading */}
        <h2
          className="font-heading font-black tracking-tight text-center mb-12 sm:mb-14"
          style={{ color: INK, fontSize: "clamp(28px, 3.8vw, 50px)" }}
        >
          Team
        </h2>

        {/* Row 1 — 3 cards centered */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 mb-10">
          {ROW1.map(m => <MemberCard key={m.name} {...m} />)}
        </div>

        {/* Row 2 — 4 cards centered */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 mb-10">
          {ROW2.map(m => <MemberCard key={m.name} {...m} />)}
        </div>

        {/* Row 3 — 3 cards centered */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
          {ROW3.map(m => <MemberCard key={m.name} {...m} />)}
        </div>

      </div>

      <style>{`
        .team-card img {
          transition: transform 0.35s ease;
        }
        .team-card:hover img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
