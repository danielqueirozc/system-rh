import { reportService } from '@/lib/axios'
import { create } from 'zustand'

interface ReportStoreType {
    revenueTotal: number
    servicesRealized: number
    ticketMedio: number
    taxaConversao: number
    servicesQuantity: [
      { month: string, count: number }
    ],
    serviceDistribution: [
      { service: string, count: number, percentage: number }
    ],
    monthlyRevenue: [
      { month: string, total: number }
    ],
    employeePerformance: [
      { employeeId: string, funcionario: string, servicosConcluidos: number, receitaGerada: number, mediaPorServico: number }
    ]

  getReports: (year?: number) => Promise<{}>
}

export const useReportStore = create<ReportStoreType>()(
  (set) => ({
    revenueTotal: 0,
    servicesRealized: 0,
    ticketMedio: 0,
    taxaConversao: 0,
    servicesQuantity: [{ month: '', count: 0 }],
    serviceDistribution: [{ service: '', count: 0, percentage: 0 }],
    monthlyRevenue: [{  month: '', total: 0}],
    employeePerformance: [{ employeeId: '', funcionario: '', servicosConcluidos: 0, receitaGerada: 0, mediaPorServico: 0 }],

    getReports: async (year?: number) => {
      try {
        const response = await reportService.get(year)
        console.log(response)
        
          set({
            revenueTotal: response.revenueTotal,
            servicesRealized: response.servicesRealized,
            ticketMedio: response.ticketMedio,
            taxaConversao: response.taxaConversao,
            servicesQuantity: response.servicesQuantity,
            serviceDistribution: response.serviceDistribution,
            monthlyRevenue: response.monthlyRevenue,
            employeePerformance: response.employeePerformance,
          })

        return response

      } catch (error) {
        console.error('Erro ao listar reports', error)
        throw error
      }
    }
  })
)