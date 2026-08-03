export function getExternalLinkAttributes(label: string) {
  return {
    "aria-label": `${label} (opens in a new tab)`,
    rel: "noopener noreferrer",
    target: "_blank" as const,
  };
}
