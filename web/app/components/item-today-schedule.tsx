import { cn } from "@/lib/utils"

interface ItemTodayScheduleProps {
  clientName: string
  service: string
  time: string
  status: string
}

export function ItemTodaySchedule({clientName, service, time, status}: ItemTodayScheduleProps) {
  return (
    <div className="flex justify-between bg-purple p-6 rounded-lg">
      <div className="flex flex-col">
        <p className="font-medium">{clientName}</p>
        <p className="text-gray-600">{service}</p>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium">{time}</span>
          <span 
            className={cn(
              status === 'Confirmado' && "bg-[#020290] text-white rounded-md h-5 w-22 flex justify-center font-semibold items-center text-xs",
              status === 'Em Andamento' && "bg-white text-blue rounded-md h-5 w-26 flex justify-center font-semibold items-center text-xs",
              status === 'Pendente' && "border border-gray-600/10 text-gray-7T00 rounded-md h-5 w-18 flex justify-center font-semibold items-center text-xs"
            )}
          >
          {status}
        </span>
      </div>
    </div>
  )
}