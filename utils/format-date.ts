const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: string | Date) {
  return dateFormatter.format(typeof date === "string" ? new Date(date) : date);
}
