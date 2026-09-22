export const studioLocation = {
  city: "Guwahati",
  state: "Assam",
  country: "India",
  countryCode: "IN",
} as const;

export const studioLocationLabel = `${studioLocation.city}, ${studioLocation.state}, ${studioLocation.country}`;

export const founders = [
  { name: "Abhishek Kumar Prasad", role: "Co-Founder" },
  { name: "Prince Das", role: "Co-Founder" },
] as const;

export const founderProfiles = [
  {
    name: "Abhishek Kumar Prasad",
    initials: "AK",
    focus: "Full-stack web & app development, AI automation",
    quote:
      "Before this was a studio, it was two developers trading code on the side, wondering what we'd build if nobody was assigning the ticket.",
  },
  {
    name: "Prince Das",
    initials: "PD",
    focus: "Full-stack development (frontend-led), marketing & social",
    quote: "I like finishing what I start. That's most of why this studio exists.",
  },
] as const;

// Confirmed directly by the founders — not inferred.
export const studioFoundingNote = {
  founded: "April 2026",
  city: studioLocation.city,
} as const;
