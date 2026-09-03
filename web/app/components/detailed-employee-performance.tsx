import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { currencyFormatter } from "@/utils/currency-formatter";
import { useReportStore } from "@/context/report-store";
import { Tooltip, TooltipTrigger,TooltipContent } from "./ui/tooltip";

export function DetailedEmployeePerformance() {
  const { employeePerformance } = useReportStore()

  return (
    <Card className="flex flex-col gap-16 px-8 py-6">
      <span className="text-base font-medium">Desempenho Detalhado dos Funcionários</span>
      <div className="overflow-x-auto">
        <table className="text-sm w-full">
          <thead>
            <tr className="text-center">
              <th className="pb-3 pr-6 font-bold whitespace-nowrap">Funcionário</th>
              <th className="pb-3 pr-6 font-bold whitespace-nowrap">Serviços Concluídos</th>
              <th className="pb-3 pr-6 font-bold whitespace-nowrap">Receita Gerada</th>
              <th className="pb-3 font-bold whitespace-nowrap">Média por Serviço</th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto">
            {employeePerformance.map((employee, i) => (
              <tr
                key={employee.employeeId ?? employee.employeeName}
                className={cn(
                  'border-t border-gray-100 rounded-lg text-center',
                  i % 2 === 0 ? 'bg-[#f0f0fa]' : 'bg-white'
                )}
              >
                <td 
                  className={cn(
                    "py-4 pr-6 whitespace-nowrap", 
                    employee.employeeStatus === 'INACTIVE' ? 'text-red-600' : '',
                    employee.employeeStatus === null ? 'text-gray-600/50' : ''
                  )
                  }
                >
                  {employee.employeeStatus === 'INACTIVE' || employee.employeeStatus === null ? (
                    <Tooltip>
                    <TooltipTrigger className="cursor-default">
                      {employee.employeeName}
                    </TooltipTrigger>
                    <TooltipContent>
                      {employee.employeeStatus === 'INACTIVE'
                      ? 'Funcionário inativo'
                      : 'Funcionário não faz mais parte da empresa'}
                    </TooltipContent>
                  </Tooltip> 
                  ) : (
                    employee.employeeName
                  )} 

                </td>
                <td className="py-4 pr-6 whitespace-nowrap">{employee.completedServices}</td>
                <td className="py-4 pr-6 whitespace-nowrap text-green-600">{currencyFormatter(employee.generatedRevenue)}</td>
                <td className="py-4 whitespace-nowrap text-blue-500">{currencyFormatter(employee.averagePerService)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}