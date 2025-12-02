// Converte "DD/MM/AAAA" → "YYYY-MM-DD"
export function dateToIso(date: string): string {
  if (!date) return "";

  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

// Converte "YYYY-MM-DD" → "DD/MM/AAAA"
export function isoToDate(iso: string): string {
  if (!iso) return "";

  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}