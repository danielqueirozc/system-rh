import { cn } from "@/lib/utils"

interface ItemPendingBudgetsProps {
  clientName: string
  service: string
  date: string
  value: string
}

export function ItemPendingBudgets({ clientName, service, date, value }: ItemPendingBudgetsProps) {
  return (
    <div className="flex justify-between bg-purple p-6 rounded-lg">
      <div className="flex flex-col">
        <p className="font-medium">{clientName}</p>
        <p className="text-gray-600">{service}</p>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-green-600 font-medium">R$ {value}</span>
          <span 
            className=""
          >
          {date}
        </span>
      </div>
    </div>
  )
}