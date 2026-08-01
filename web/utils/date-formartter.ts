export function dateFormatter(date: string | Date) {
  const parsedDate = date instanceof Date ? date : new Date(date)

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate)
}