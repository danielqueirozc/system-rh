import { reportService } from '@/lib/axios'
import { create } from 'zustand'

interface ReportStoreType {
  reports: []

  getReports: (year: number) => Promise<[]>
}

export const useReportStore = create<ReportStoreType>()(
  (set) => ({
    reports: [],

    getReports: async (year: number) => {
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