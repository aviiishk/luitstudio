const INK    = "#111110";
const MUTED  = "#6B6B68";
const LIGHT  = "#A9A9A5";
const BORDER = "#E5E3DE";
const BG     = "#FAFAF7";
const CARD   = "#FFFFFF";

const TEAM = [
  // Row 1 — 3
  { name: "Abhishek Kumar",   role: "Founder & CEO",         seed: "abhishek22" },
  { name: "Priya Sharma",     role: "Creative Director",     seed: "priya44"    },
  { name: "Rahul Das",        role: "Lead Developer",        seed: "rahul77"    },
  // Row 2 — 4
  { name: "Sneha Baruah",     role: "UI / UX Designer",      seed: "sneha11"    },
  { name: "Arjun Nath",       role: "Mobile Developer",      seed: "arjun55"    },
  { name: "Deepika Roy",      role: "Brand Designer",        seed: "deepika33"  },
  { name: "Kunal Bora",       role: "Full-stack Developer",  seed: "kunal88"    },
  // Row 3 — 3
  { name: "Ankita Saikia",    role: "Project Manager",       seed: "ankita99"   },
  { name: "Nikhil Gogoi",     role: "SEO Lead",              seed: "nikhil66"   },
  { name: "Tanisha Hazarika", role: "Motion Designer",       seed: "tanisha22"  },
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
