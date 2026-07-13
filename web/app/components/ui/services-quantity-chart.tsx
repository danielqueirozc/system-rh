"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/app/components/ui/chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"

const data = [
  { month: "Jan", quantidade: 45 },
  { month: "Fev", quantidade: 52 },
  { month: "Mar", quantidade: 47 },
  { month: "Abr", quantidade: 58 },
  { month: "Mai", quantidade: 61 },
  { month: "Jun", quantidade: 68 },
  { month: "Jul", quantidade: 64 },
  { month: "Ago", quantidade: 72 },
  { month: "Set", quantidade: 76 },
]

const chartConfig = {
  quantidade: { label: "Serviços", color: "#059669" },
} satisfies ChartConfig

export function ServicesQuantityChart() {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-normal text-gray-500">
          Quantidade de Serviços
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="max-h-72 w-full">
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="quantidade"
              fill="var(--color-quantidade)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
