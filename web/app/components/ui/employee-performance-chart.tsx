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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip"
import { useReportStore } from "@/context/report-store"
import { cn } from "@/lib/utils"

const chartConfig = {
  completedServices: { label: "Serviços", color: "#9333EA" },
} satisfies ChartConfig

export function EmployeePerformanceChart() {
  const { employeePerformance } = useReportStore()

  function EmployeeNameTick({ x, y, payload }: any) {
    const employee = employeePerformance.find(emp => emp.employeeName === payload.value)

    const text = (
      <text
        x={x}
        y={y}
        dy={4}
        textAnchor="end"
        className={cn(
          "text-xs",
          employee?.employeeStatus === 'INACTIVE' && "fill-red-600",
          employee?.employeeStatus === null && "fill-gray-600/50"
        )}
      >
        {payload.value}
      </text>
    )

    if (employee?.employeeStatus === 'INACTIVE' || employee?.employeeStatus === null) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{text}</TooltipTrigger>
          <TooltipContent>
            {employee.employeeStatus === 'INACTIVE'
              ? 'Funcionário inativo'
              : 'Funcionário não faz mais parte da empresa'}
          </TooltipContent>
        </Tooltip>
      )
    }

    return text
  }

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
              tick={<EmployeeNameTick />}
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
