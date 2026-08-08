import { reportService } from '@/lib/axios'
import { create } from 'zustand'

interface ReportStoreType {
  reports: {
    year: number
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
      { employeeId: string, funcionarios: string, servicosConcluidos: number, receitaGerada: number, mediaPorServico: number }
    ]
  }[]

  getReports: (year?: number) => Promise<[]>
}

export const useReportStore = create<ReportStoreType>()(
  (set) => ({
    reports: [],

    // criar todas as veriaveis que estao no ReportStoreType

    getReports: async (year?: number) => {
      try {
        const response = await reportService.get(year)
        console.log(response)

        set({ reports: response })

        return response

      } catch (error) {
        console.error('Erro ao listar reports', error)
        throw error
      }
    }
  })
)