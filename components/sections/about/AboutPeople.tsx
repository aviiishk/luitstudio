import { TeamTree } from "@/components/sections/about/TeamTree";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";
import type { TeamMember } from "@/types/team";

interface AboutPeopleProps {
  members: TeamMember[];
}

export function AboutPeople({ members }: AboutPeopleProps) {
  if (members.length === 0) return null;

  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className="bg-[#ece0f7]/15 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <span className="text-violet-ink mx-auto text-xs font-bold tracking-widest uppercase">
          04 · Team
        </span>

        <AnimatedHeadline
          as="h2"
          id="people-heading"
          text="Meet the team"
          italicText="behind the work."
          delay={0.05}
          animateOnView
          className="text-ink mx-auto text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
          italicClassName="font-display font-normal"
        />

        <Reveal delay={0.08} className="mx-auto flex max-w-xl flex-col gap-3">
          <p className="text-body text-base leading-7">
            Luit Studio is led by co-founders Abhishek Kumar Prasad and
            Prince Das, working alongside a small, growing team — everyone
            here does real work, no account managers or handoffs in
            between.
          </p>
          <p className="text-body/80 text-sm leading-6">
            Abhishek leads the AI-automation and backend side of every
            build; Prince leads frontend craft, marketing, and the social
            work that gets it in front of people.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-4 md:mt-6">
        <TeamTree members={members} />
      </Container>
    </section>
  );
}
