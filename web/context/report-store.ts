import { reportService } from '@/lib/axios'
import { create } from 'zustand'

interface ReportStoreType {
    revenueTotal: number
    totalRevenueVariation: number
    servicesRealized: number
    realizedServicesVariation: number
    averageTicket: number
    averageTicketVariation: number
    conversionRate: number
    conversionRateVariation: number,
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
      { employeeId: string, employeeName: string, completedServices: number, generatedRevenue: number, averagePerService: number }
    ]

  getReports: (year?: number) => Promise<{}>
}

export const useReportStore = create<ReportStoreType>()(
  (set) => ({
    revenueTotal: 0,
    totalRevenueVariation: 0,
    servicesRealized: 0,
    realizedServicesVariation: 0,
    averageTicket: 0,
    averageTicketVariation: 0,
    conversionRate: 0,
    conversionRateVariation: 0,
    servicesQuantity: [{ month: '', count: 0 }],
    serviceDistribution: [{ service: '', count: 0, percentage: 0 }],
    monthlyRevenue: [{  month: '', total: 0}],
    employeePerformance: [{ employeeId: '', employeeName: '', completedServices: 0, generatedRevenue: 0, averagePerService: 0 }],

    getReports: async (year?: number) => {
      try {
        const response = await reportService.get(year)
        console.log(response.totalRevenueVariation)
        console.log(response.realizedServicesVariation)
        console.log(response.averageTicketVariation)
        console.log(response.conversionRateVariation)

          set({
            revenueTotal: response.revenueTotal,
            totalRevenueVariation: response.totalRevenueVariation,
            servicesRealized: response.servicesRealized,
            realizedServicesVariation: response.realizedServicesVariation,
            averageTicket: response.averageTicket,
            averageTicketVariation: response.averageTicketVariation,
            conversionRate: response.conversionRate,
            conversionRateVariation: response.conversionRateVariation,
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
