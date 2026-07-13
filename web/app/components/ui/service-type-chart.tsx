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

const data = [
  { type: "eletrica", label: "Elétrica", value: 35, fill: "#3B82F6" },
  { type: "hidraulica", label: "Hidráulica", value: 28, fill: "#059669" },
  { type: "pintura", label: "Pintura", value: 20, fill: "#D97706" },
  { type: "reforma", label: "Reforma", value: 12, fill: "#9333EA" },
  { type: "outro", label: "Outro", value: 5, fill: "#9CA3AF" },
]

const chartConfig = {
  value: { label: "Serviços" },
  eletrica: { label: "Elétrica", color: "#3B82F6" },
  hidraulica: { label: "Hidráulica", color: "#059669" },
  pintura: { label: "Pintura", color: "#D97706" },
  reforma: { label: "Reforma", color: "#9333EA" },
  outro: { label: "Outro", color: "#9CA3AF" },
} satisfies ChartConfig

function renderLabel({ cx, cy, midAngle, outerRadius, percent, fill, payload }: PieSectorDataItem) {
  const RADIAN = Math.PI / 180
  const radius = (outerRadius as number) + 20
  const x = (cx as number) + radius * Math.cos(-midAngle! * RADIAN)
  const y = (cy as number) + radius * Math.sin(-midAngle! * RADIAN)
  const name = (payload as typeof data[number])?.label

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
  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-sm font-normal text-gray-500">
          Distribuição por Tipo de Serviço
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72">
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
