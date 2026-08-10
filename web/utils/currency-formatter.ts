export function currencyFormatter(value: string | number) {
  // ele sabe que é do tipo number pela descrição do type não pela forma de se escrever number sem as aspas
  const parsedNumber = typeof value === "number" ? value : Number(value)
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(parsedNumber)
}

export function percentFormatter(percent: number) {
  const parsedNumber = typeof percent === 'number' ? percent : Number(percent)

  return new Intl.NumberFormat("pt-BR", {
   style: "percent",
   maximumFractionDigits: 1,
  }).format(parsedNumber / 100)
}
