"use client"

import * as React from "react"
import { Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card"
import { useReportStore } from "@/context/report-store"

type PieDatum = {
  type: string
  label: string
  value: number
  fill: string
}

const chartConfig = {
  "Encanamento": { label: "Encanamento", color: "#2a78d6" },
  "Elétrica": { label: "Elétrica", color: "#eb6834" },
  "Pintura": { label: "Pintura", color: "#1baf7a" },
  "Jardinagem": { label: "Jardinagem", color: "#eda100" },
  "Ar-condicionado": { label: "Ar-condicionado", color: "#e87ba4" },
  "Serviços Gerais": { label: "Serviços Gerais", color: "#008300" },
} satisfies ChartConfig

function renderLabel({ cx, cy, midAngle, outerRadius, percent, fill, payload }: PieSectorDataItem) {
  const RADIAN = Math.PI / 180
  const radius = (outerRadius as number) + 20
  const x = (cx as number) + radius * Math.cos(-midAngle! * RADIAN)
  const y = (cy as number) + radius * Math.sin(-midAngle! * RADIAN)
  const name = (payload as PieDatum)?.label

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={x > (cx as number) ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name} ${Math.round((percent ?? 0) * 100)}%`}
    </text>
  )
}

export function ServiceTypeChart() {
  const { serviceDistribution } = useReportStore()

  const data = serviceDistribution.map((item) => ({
    type: item.service,
    label: item.service,
    value: item.count,
    fill: chartConfig[item.service as keyof typeof chartConfig]?.color ?? "#9CA3AF",
  }))

  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-normal text-gray-500">
          Distribuição por Tipo de Serviço
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72 w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="type" />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="type"
              innerRadius={0}
              outerRadius="80%"
              paddingAngle={1}
              label={renderLabel}
              labelLine={false}
              activeShape={(props: PieSectorDataItem) => (
                <Sector {...props} outerRadius={(props.outerRadius as number) + 4} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
