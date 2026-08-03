interface PortfolioBadgeProps {
  children: string;
}

export function PortfolioBadge({ children }: PortfolioBadgeProps) {
  return (
    <span className="border-border text-ink group-hover:border-brand/30 group-focus-visible:border-brand/30 group-hover:bg-surface group-focus-visible:bg-surface rounded-full border bg-white px-4 py-2 text-sm leading-none transition-[transform,border-color,background-color] duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none">
      {children}
    </span>
  );
}
