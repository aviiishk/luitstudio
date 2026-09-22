import { founderProfiles } from "@/config/studio";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

const cardTints = [
  { bg: "bg-[#dcedf7]", color: "text-sky-ink", rotate: "-rotate-6" },
  { bg: "bg-[#f8dede]", color: "text-rose-ink", rotate: "rotate-4" },
] as const;

export function AboutPeople() {
  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className="bg-[#ece0f7]/15 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto grid max-w-4xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal delay={0.06} className="relative mx-auto w-full max-w-sm">
          <div className="flex items-center justify-center gap-4">
            {founderProfiles.map((founder, index) => {
              const tint = cardTints[index];
              return (
                <div
                  key={founder.name}
                  className={`${tint.bg} ${tint.rotate} border-canvas aspect-4/5 w-1/2 rounded-3xl border-4 p-5 shadow-lg`}
                >
                  <div className="flex h-full flex-col justify-end gap-1">
                    <span
                      className={`${tint.color} font-display text-4xl italic`}
                    >
                      {founder.initials}
                    </span>
                    <p className="text-ink text-sm font-semibold">
                      {founder.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <span className="font-handwriting text-body/70 absolute -bottom-8 left-0 hidden -rotate-3 text-lg leading-tight lg:block">
            Same team.
            <br />
            Different perspectives.
          </span>
        </Reveal>

        <div className="flex flex-col gap-5">
          <span className="text-violet-ink text-xs font-bold tracking-widest uppercase">
            04 · People
          </span>

          <AnimatedHeadline
            as="h2"
            id="people-heading"
            text="A small studio."
            italicText="On purpose."
            delay={0.05}
            animateOnView
            className="text-ink text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
            italicClassName="font-display font-normal"
          />

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <p className="text-body text-base leading-7">
              Luit Studio is run by two people — Abhishek Kumar Prasad and
              Prince Das — a small, closely involved team that prefers
              doing the work over managing layers.
            </p>
            <p className="text-body text-base leading-7">
              We like clear conversations, honest feedback, and long-term
              collaborations. When you work with Luit, you work with us —
              not an account manager or a chain of handoffs.
            </p>
            <p className="text-body/80 text-sm leading-6">
              Both build full-stack — the split isn&apos;t
              &ldquo;developer vs. marketer,&rdquo; it&apos;s where each
              of them goes deeper: Abhishek into the AI-automation side
              of the build, Prince into the frontend craft and the
              marketing and social work that gets it in front of people.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
