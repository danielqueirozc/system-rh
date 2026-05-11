import { Card, CardContent } from "@/app/components/ui/card"
import { Clock } from "lucide-react"
import type { ReactNode } from "react"

interface CardServiceProps {
  img: ReactNode
  service: string
  description: string
  time: string
  price: number
}

export function CardService({ img, service, description, time, price }: CardServiceProps) {
  return (
    <Card className="">
        <CardContent className="flex flex-col justify-center items-center">
         <div className="w-14 h-14 rounded-full bg-purple flex items-center justify-center">
           {img}
         </div>

         <div className="flex flex-col gap-4 mt-3 items-center">
            <p className="text-gray-500">{service}</p>
            <p className="text-gray-400 ">{description}</p>
            <span className="flex items-center font-medium gap-2 text-gray-400">
              <Clock size={14} />
              {time}
            </span>
            <span className="px-2 py-0.5 border border-blue rounded-lg text-blue text-xs">A partir de R$ {price}</span>
         </div>
        </CardContent>
      </Card>
  )
} 