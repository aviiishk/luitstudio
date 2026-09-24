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

// Confirmed directly by the founders — not inferred.
export const studioFoundingNote = {
  founded: "April 2026",
  city: studioLocation.city,
} as const;
