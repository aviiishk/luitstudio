import type { BlogAuthor } from "@/types/blog";

interface AuthorBioCardProps {
  author: BlogAuthor;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function AuthorBioCard({ author }: AuthorBioCardProps) {
  if (!author.bio) return null;

  return (
    <div className="border-border mt-12 flex items-start gap-4 rounded-2xl border p-6">
      {author.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded URL
        <img
          src={author.imageUrl}
          alt=""
          className="border-border size-14 shrink-0 rounded-full border object-cover"
        />
      ) : (
        <span className="bg-surface text-body grid size-14 shrink-0 place-items-center rounded-full text-sm font-semibold">
          {initials(author.name)}
        </span>
      )}
      <div>
        <p className="text-body text-xs font-semibold tracking-[0.18em] uppercase">
          Written by
        </p>
        <p className="text-ink mt-1 text-sm font-semibold">{author.name}</p>
        <p className="text-body text-xs">{author.role}</p>
        <p className="text-body mt-2 text-sm leading-relaxed">{author.bio}</p>
      </div>
    </div>
  );
}
