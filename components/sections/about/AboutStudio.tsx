import { founders, studioLocationLabel } from "@/config/studio";

interface AboutStudioProps {
  showFounders?: boolean;
}

// Founder names/roles are confirmed; fuller bios and photos are pending
// from the owner and can slot into this list once supplied.
export function AboutStudio({ showFounders = true }: AboutStudioProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
      <p className="text-body text-base sm:text-lg">
        Based in {studioLocationLabel} — Luit is the Assamese name for the
        Brahmaputra, the river this city sits on. We&apos;re a small team
        building brands, products, and content for clients across India and
        abroad.
      </p>
      {showFounders ? (
        <ul
          aria-label="Co-founders"
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {founders.map((founder) => (
            <li
              key={founder.name}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-ink text-lg font-medium">
                {founder.name}
              </span>
              <span className="text-body text-sm">{founder.role}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
