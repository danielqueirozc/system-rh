"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
  { month: "Jan", receita: 28200 },
  { month: "Fev", receita: 31800 },
  { month: "Mar", receita: 29500 },
  { month: "Abr", receita: 35500 },
  { month: "Mai", receita: 38200 },
  { month: "Jun", receita: 41200 },
  { month: "Jul", receita: 39000 },
  { month: "Ago", receita: 43200 },
  { month: "Set", receita: 45500 },
]

const chartConfig = {
  receita: { label: "Receita (R$)", color: "#3B82F6" },
} satisfies ChartConfig

export function MonthlyRevenueChart() {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-normal text-gray-500">
          Receita Mensal
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="max-h-72 w-full">
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={44} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="receita"
              type="monotone"
              stroke="var(--color-receita)"
              strokeWidth={2}
              dot={{ fill: "var(--color-receita)", r: 4 }}
              activeDot={{ r: 5 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
