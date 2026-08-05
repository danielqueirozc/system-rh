'use client'

import { Card } from "@/app/components/ui/card";
import { SelectYear } from "@/app/components/ui/seletct-year";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { MonthlyRevenueChart } from "@/app/components/ui/monthly-revenue-chart";
import { ServiceTypeChart } from "@/app/components/ui/service-type-chart";
import { ServicesQuantityChart } from "@/app/components/ui/services-quantity-chart";
import { EmployeePerformanceChart } from "@/app/components/ui/employee-performance-chart";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";
import { useReportStore } from "@/context/report-store";

const employeePerformance = [
  { id: 1, funcionario: "Carlos Tech", servicosConcluidos: 45, receitaGerada: 12500.00, mediaPorServico: 277.78 },
  { id: 2, funcionario: "Ana Pintura", servicosConcluidos: 52, receitaGerada: 15200.00, mediaPorServico: 292.31 },
  { id: 3, funcionario: "Pedro Hidro", servicosConcluidos: 38, receitaGerada: 10800.00, mediaPorServico: 284.21 },
  { id: 4, funcionario: "João Reforma", servicosConcluidos: 67, receitaGerada: 18900.00, mediaPorServico: 282.09 },
  { id: 5, funcionario: "Maria Geral", servicosConcluidos: 28, receitaGerada: 7920.00, mediaPorServico: 282.86 },
]

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export default function Reports() {
  const [windowWidth, setWindowWidth] = useState(0)

  const { reports, getReports } = useReportStore()
  
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Fragment>
      {windowWidth >= 1024 ? (
      <div className="flex-1 flex flex-col h-screen">
        <header className="p-5.5 text-gray-700 border-b border-gray-200">
          Relatórios
        </header>

        <div className="flex justify-between items-center px-4 py-6 text-gray-900 text-sm">
          <p>Relatórios e Análises</p>
          <div className="flex justify-baseline gap-4">
            <SelectYear getReports={getReports} />

            <button className="flex items-center gap-3 border border-purple rounded-lg px-3">
              <Download size={14} />
              Exportar
            </button>
          </div>
        </div>

        <main className="flex-1 flex flex-col px-4 pt-1 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-6 text-gray-900 text-sm">
            <div className="grid grid-cols-4 gap-4">
              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Receita Total</p>
                  <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                </div>

                <span>R$ 330.820</span>

                <p className="text-[#00A63E]">+18.2% vs ano anterior</p>
              </Card>

              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Serviços Realizados</p>
                  <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                </div>

                <span>543</span>

                <p className="text-[#00A63E]">+12.5% vs ano anterior</p>
              </Card>
              
              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Ticket Médio</p>
                  <TrendingUp 
                    className="text-blue-500" 
                    size={18} 
                    strokeWidth={2.25} 
                  />
                </div>

                <span>R$ 609</span>

                <p className="text-blue-500">+12.5% vs ano anterior</p>
              </Card>

              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Taxa de Conversão</p>
                  <TrendingDown 
                    className="text-red-500" 
                    size={18} 
                    strokeWidth={2.25} 
                  />
                </div>

                <span>68%</span>

                <p className="text-red-500">-2.3% vs mês anterior</p>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <MonthlyRevenueChart />
              <ServiceTypeChart />
              <ServicesQuantityChart />
              <EmployeePerformanceChart />
            </div>

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

                  <tbody>
                    {employeePerformance.map((employee, i) => (
                      <tr
                        key={employee.id}
                        className={cn(
                          'border-t border-gray-100 rounded-lg text-center',
                          i % 2 === 0 ? 'bg-[#f0f0fa]' : 'bg-white'
                        )}
                      >
                        <td className="py-4 pr-6 whitespace-nowrap">{employee.funcionario}</td>
                        <td className="py-4 pr-6 whitespace-nowrap">{employee.servicosConcluidos}</td>
                        <td className="py-4 pr-6 whitespace-nowrap text-green-600">{currencyFormatter.format(employee.receitaGerada)}</td>
                        <td className="py-4 whitespace-nowrap text-blue-500">{currencyFormatter.format(employee.mediaPorServico)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
      ) : (
      <div className="flex flex-col">
        <div className="pt-24 px-4 pb-8">
          <div className="flex flex-col gap-6 text-gray-900 text-sm">
            <p>Relatórios e Análises</p>
            <div className="flex justify-baseline gap-4">
              
              <SelectYear />

              <button className="flex items-center gap-3 border border-purple rounded-lg px-3">
                <Download size={14} />
                Exportar
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Receita Total</p>
                  <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                </div>

                <span>R$ 330.820</span>

                <p className="text-[#00A63E]">+18.2% vs ano anterior</p>
              </Card>

              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Serviços Realizados</p>
                  <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                </div>

                <span>543</span>

                <p className="text-[#00A63E]">+12.5% vs ano anterior</p>
              </Card>
              
              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Ticket Médio</p>
                  <TrendingUp 
                    className="text-blue-500" 
                    size={18} 
                    strokeWidth={2.25} 
                  />
                </div>

                <span>R$ 609</span>

                <p className="text-blue-500">+12.5% vs ano anterior</p>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <MonthlyRevenueChart />
              <ServiceTypeChart />
              <ServicesQuantityChart />
              <EmployeePerformanceChart />

              <Card className="flex flex-col gap-16 px-8 py-6">
                <span className="text-base font-medium">Desempenho Detalhado dos Funcionários</span>
                <div className="overflow-x-auto">
                  <table className="text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-3 pr-6 font-semibold whitespace-nowrap">Funcionário</th>
                        <th className="pb-3 pr-6 font-semibold whitespace-nowrap">Serviços Concluídos</th>
                        <th className="pb-3 pr-6 font-semibold whitespace-nowrap">Receita Gerada</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Média por Serviço</th>
                      </tr>
                    </thead>

                    <tbody>
                      {employeePerformance.map((employee, i) => (
                        <tr
                          key={employee.id}
                          className={cn(
                            'border-t border-gray-100 rounded-lg text-center',
                            i % 2 === 0 ? 'bg-[#f0f0fa]' : 'bg-white'
                          )}
                        >
                          <td className="py-2 pr-6 whitespace-nowrap">{employee.funcionario}</td>
                          <td className="py-2 pr-6 whitespace-nowrap">{employee.servicosConcluidos}</td>
                          <td className="py-2 pr-6 whitespace-nowrap">{currencyFormatter.format(employee.receitaGerada)}</td>
                          <td className="py-2 whitespace-nowrap">{currencyFormatter.format(employee.mediaPorServico)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>)}
    </Fragment>
  )
}