export function percentFormatter(percent: number, options?: { signed?: boolean }) {
  const parsedNumber = typeof percent === 'number' ? percent : Number(percent)

  return new Intl.NumberFormat("pt-BR", {
   style: "percent",
   maximumFractionDigits: 1,
   signDisplay: options?.signed ? "exceptZero" : "auto",
  }).format(parsedNumber / 100)
}