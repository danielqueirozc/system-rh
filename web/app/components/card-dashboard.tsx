import type { ReactNode } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface CardDashboardProps {
  icon: ReactNode
  name: string
  number: number
  totalClients: number
  background: string
}

export function CardDashboard({ icon, name, number, totalClients, background }: CardDashboardProps) {
  return (
    <Card className="flex flex-col gap-10 p-6">
      <div className="flex justify-between">
        <div className={cn(background, "p-2.5 rounded-lg")}>
          {icon}
        </div>

        <span className="bg-[#020290] text-white rounded-md h-5 w-12 flex justify-center font-semibold items-center text-xs">
          +{number}%
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-gray-500">{name}</p>
        <span>{totalClients}</span>
      </div>
    </Card>
  )
}