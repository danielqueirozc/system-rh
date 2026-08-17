export function timeFormatter(date: Date) {
  const parsedDate = date instanceof Date ? date : new Date(date)

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(parsedDate)
}
