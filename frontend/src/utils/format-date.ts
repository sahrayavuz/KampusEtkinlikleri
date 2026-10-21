export function formatDate(date: string, time?: string): string {
  const day = new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return time ? `${day}, ${time}` : day;
}