interface AboutJourneyProps {
  children: React.ReactNode;
}

export function AboutJourney({ children }: AboutJourneyProps) {
  return <div className="relative">{children}</div>;
}
