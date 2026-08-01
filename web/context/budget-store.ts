import { budgetService, clientService, employeeService } from '@/lib/axios'
import { create } from 'zustand'

const budgetStatus = {
  PENDING: 'PENDING',
  APPROVED: 'INACTIVE',
  REJECTED: 'REJECTED',
}

type BudgetStatus = (typeof budgetStatus)[keyof typeof budgetStatus]


interface BudgetProps {
  id: string
  description: string
  value: number
  date: Date
  client: { name: string }
  service: {name: string}
  status: BudgetStatus
  createdAt: Date
  updatedAt: Date
}

interface BudgetStoreType {
  budgets: BudgetProps[] | []
  total: number
  approved: number
  pending: number

  getBudgets: () => Promise<BudgetProps[] | []>
  getTotal: () => Promise<number>
  getApproved: () => Promise<number>
  getPending: () => Promise<number>
}

export const useBudgetStore = create<BudgetStoreType>()(
  (set) => ({
    budgets: [],
    total: 0,
    approved: 0,
    pending: 0,
  
    getBudgets: async () => {
      try {
        const response = await budgetService.get()

        set({ budgets: response.budgets })

        return response.budgets

      } catch (error) {
        console.error('Erro ao listar budgets', error)
        throw error
      }
    },

    getTotal: async () => {
      try {
        const response = await budgetService.get()

        set({ total: response.total })

        return response.total

      } catch (error) {
        console.error('Erro ao listar total', error)
        throw error
      }
    },

    getApproved: async () => {
      try {
        const response = await budgetService.get()

        set({ approved: response.approved })

        return response.approved

      } catch (error) {
        console.error('Erro ao listar approved', error)
        throw error
      }
    },

    getPending: async () => {
      try {
        const response = await budgetService.get()

        set({ pending: response.pending })

        return response.pending

      } catch (error) {
        console.error('Erro ao listar pending', error)
        throw error
      }
    },
  })
)