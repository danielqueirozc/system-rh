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
import { useReportStore } from "@/context/report-store"

const data = [
  { employee: "Carlos Tech", servicos: 43 },
  { employee: "Ana Pintura", servicos: 51 },
  { employee: "Pedro Hidro", servicos: 37 },
  { employee: "João Reforma", servicos: 66 },
  { employee: "Maria Geral", servicos: 27 },
]

const chartConfig = {
  completedServices: { label: "Serviços", color: "#9333EA" },
} satisfies ChartConfig

export function EmployeePerformanceChart() {
  const { employeePerformance } = useReportStore()

  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-normal text-gray-500">
          Desempenho por Funcionário
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="max-h-72 w-full">
          <BarChart data={employeePerformance} layout="vertical" barCategoryGap="25%">
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              type="category"
              dataKey="employeeName"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={90}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="completedServices"
              fill="var(--color-completedServices)"
              radius={[0, 4, 4, 0]}
              maxBarSize={22}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
