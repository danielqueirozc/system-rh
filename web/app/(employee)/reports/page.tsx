'use client'

import { Card } from "@/app/components/ui/card";
import { SelectYear } from "@/app/components/ui/seletct-year";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { MonthlyRevenueChart } from "@/app/components/ui/monthly-revenue-chart";
import { ServiceTypeChart } from "@/app/components/ui/service-type-chart";
import { ServicesQuantityChart } from "@/app/components/ui/services-quantity-chart";
import { EmployeePerformanceChart } from "@/app/components/ui/employee-performance-chart";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useRef, useState } from "react";
import { useReportStore } from "@/context/report-store";
import { currencyFormatter } from "@/utils/currency-formatter";
import { DetailedEmployeePerformance } from "@/app/components/detailed-employee-performance";
import { percentFormatter } from "@/utils/percent-formatter";
import { exportReportToPdf } from "@/utils/export-report-pdf";

// const employeePerformance = [
//   { id: 1, employeeName: "Carlos Tech", completedServices: 45, generatedRevenue: 12500.00, averagePerService: 277.78 },
//   { id: 2, employeeName: "Ana Pintura", completedServices: 52, generatedRevenue: 15200.00, averagePerService: 292.31 },
//   { id: 3, employeeName: "Pedro Hidro", completedServices: 38, generatedRevenue: 10800.00, averagePerService: 284.21 },
//   { id: 4, employeeName: "João Reforma", completedServices: 67, generatedRevenue: 18900.00, averagePerService: 282.09 },
//   { id: 5, employeeName: "Maria Geral", completedServices: 28, generatedRevenue: 7920.00, averagePerService: 282.86 },
// ]

export default function Reports() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isExporting, setIsExporting] = useState(false)

  const reportContentRef = useRef<HTMLDivElement>(null)

  const {
    revenueTotal,
    totalRevenueVariation,
    servicesRealized,
    realizedServicesVariation,
    averageTicket,
    averageTicketVariation,
    conversionRate,
    conversionRateVariation,
    employeePerformance
  } = useReportStore()

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }


    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function handleExport() {
    if (!reportContentRef.current) return

    setIsExporting(true)

    try {
      await exportReportToPdf(reportContentRef.current, 'relatorio-analises.pdf')
    } catch (error) {
      console.error('Erro ao exportar relatório', error)
    } finally {
      setIsExporting(false)
    }
  }

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
            <SelectYear />

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-3 border border-purple rounded-lg px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={14} />
              {isExporting ? 'Exportando...' : 'Exportar'}
            </button>
          </div>
        </div>

        {/* { reports.map(report => ( */}
          <main ref={reportContentRef} className="flex-1 flex flex-col px-4 pt-1 pb-8 overflow-y-auto">
            <div className="flex flex-col gap-6 text-gray-900 text-sm">
              <div className="grid grid-cols-4 gap-4">
                <Card className="flex flex-col gap-8 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500">Receita Total</p>
                      {totalRevenueVariation >= 0 ? (
                        <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                      ) : (
                        <TrendingDown
                          className="text-red-500"
                          size={18} 
                          strokeWidth={2.25}
                        />
                      )}
                  </div>

                  <span>{currencyFormatter(revenueTotal)}</span>

                  <p className={cn(totalRevenueVariation >= 0 ? 'text-[#00A63E]' : 'text-red-500')}>{percentFormatter(totalRevenueVariation, { signed: true })} vs ano anterior</p>
                </Card>

                <Card className="flex flex-col gap-8 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500">Serviços Realizados</p>
                    {realizedServicesVariation >= 0 ? (
                        <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                      ) : (
                        <TrendingDown
                          className="text-red-500"
                          size={18} 
                          strokeWidth={2.25}
                        />
                      )}
                  </div>

                  <span>{servicesRealized}</span>

                  <p className={cn(realizedServicesVariation >= 0 ? 'text-[#00A63E]' : 'text-red-500')}>{percentFormatter(realizedServicesVariation, { signed: true })} vs ano anterior</p>
                </Card>
                
                <Card className="flex flex-col gap-8 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500">Ticket Médio</p>

                    {averageTicketVariation >= 0 ? (
                      <TrendingUp 
                        className="text-blue-500" 
                        size={18} 
                        strokeWidth={2.25} 
                      /> 
                    ) : (
                      <TrendingDown 
                      className="text-red-500" 
                      size={18} 
                      strokeWidth={2.25} 
                    />
                    )}
                  </div>

                  <span>{currencyFormatter(averageTicket)}</span>

                  <p className={cn(averageTicketVariation >= 0 ? 'text-blue-500' : 'text-red-500' )}>{percentFormatter(averageTicketVariation, { signed: true })} vs mes anterior</p>
                </Card>

                <Card className="flex flex-col gap-8 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500">Taxa de Conversão</p>
                    {conversionRateVariation >= 0 ? (
                      <TrendingUp 
                        className="text-blue-500" 
                        size={18} 
                        strokeWidth={2.25} 
                      /> 
                    ) : (
                      <TrendingDown 
                      className="text-red-500" 
                      size={18} 
                      strokeWidth={2.25} 
                    />
                    )}
                  </div>

                  <span>{percentFormatter(conversionRate)}</span>

                  <p className={cn(conversionRateVariation >= 0 ? 'text-blue-500' : 'text-red-500' )}>{percentFormatter(conversionRateVariation, { signed: true })} vs mês anterior</p>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <MonthlyRevenueChart />
                <ServiceTypeChart />
                <ServicesQuantityChart />
                <EmployeePerformanceChart />
              </div>

             <DetailedEmployeePerformance />
            </div>
          </main>
        {/* )) } */}
      </div>
      ) : (
      <div className="flex flex-col">
        <div className="pt-24 px-4 pb-8">
          <div className="flex flex-col gap-6 text-gray-900 text-sm">
            <p>Relatórios e Análises</p>
            <div className="flex justify-baseline gap-4">

              <SelectYear />

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-3 border border-purple rounded-lg px-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={14} />
                {isExporting ? 'Exportando...' : 'Exportar'}
              </button>
            </div>

            <div ref={reportContentRef} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Card className="flex flex-col gap-8 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500">Receita Total</p>
                      {totalRevenueVariation >= 0 ? (
                        <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                      ) : (
                        <TrendingDown
                          className="text-red-500"
                          size={18} 
                          strokeWidth={2.25}
                        />
                      )}
                  </div>

                  <span>{currencyFormatter(revenueTotal)}</span>

                  <p className={cn(totalRevenueVariation >= 0 ? 'text-[#00A63E]' : 'text-red-500')}>{percentFormatter(totalRevenueVariation, { signed: true })} vs ano anterior</p>
              </Card>

              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Serviços Realizados</p>
                  {realizedServicesVariation >= 0 ? (
                      <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
                    ) : (
                      <TrendingDown
                        className="text-red-500"
                        size={18} 
                        strokeWidth={2.25}
                      />
                    )}
                </div>

                <span>{servicesRealized}</span>

                <p className={cn(realizedServicesVariation >= 0 ? 'text-[#00A63E]' : 'text-red-500')}>{percentFormatter(realizedServicesVariation, { signed: true })} vs ano anterior</p>
              </Card>
                
              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Ticket Médio</p>

                  {averageTicketVariation >= 0 ? (
                    <TrendingUp 
                      className="text-blue-500" 
                      size={18} 
                      strokeWidth={2.25} 
                    /> 
                  ) : (
                    <TrendingDown 
                    className="text-red-500" 
                    size={18} 
                    strokeWidth={2.25} 
                  />
                  )}
                </div>

                <span>{currencyFormatter(averageTicket)}</span>

                <p className={cn(averageTicketVariation >= 0 ? 'text-blue-500' : 'text-red-500' )}>{percentFormatter(averageTicketVariation, { signed: true })} vs mes anterior</p>
              </Card>
              
              <Card className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Taxa de Conversão</p>
                  {conversionRateVariation >= 0 ? (
                    <TrendingUp 
                      className="text-blue-500" 
                      size={18} 
                      strokeWidth={2.25} 
                    /> 
                  ) : (
                    <TrendingDown 
                    className="text-red-500" 
                    size={18} 
                    strokeWidth={2.25} 
                  />
                  )}
                </div>

                <span>{percentFormatter(conversionRate)}</span>

                <p className={cn(conversionRateVariation >= 0 ? 'text-blue-500' : 'text-red-500' )}>{percentFormatter(conversionRateVariation, { signed: true })} vs mês anterior</p>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <MonthlyRevenueChart />
              <ServiceTypeChart />
              <ServicesQuantityChart />
              <EmployeePerformanceChart />

             <DetailedEmployeePerformance />
            </div>
            </div>
          </div>
        </div>
      </div>)}
    </Fragment>
  )
}