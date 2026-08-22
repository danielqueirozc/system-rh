import type { BudgetProps, ChangeStatusProps, CreateBudgetProps } from '@/@types'
import { budgetService } from '@/lib/axios'
import { create } from 'zustand'

interface BudgetStoreType {
  budgets: BudgetProps[] | []
  total: number
  approved: number
  pending: number

  getBudgets: () => Promise<BudgetProps[] | []>
  getTotal: () => Promise<number>
  getApproved: () => Promise<number>
  getPending: () => Promise<number>
  createBudget: (data: CreateBudgetProps) => Promise<BudgetProps>
  changeStatus: ({ id, status }: ChangeStatusProps) => Promise<BudgetProps>
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

    createBudget: async (data) => {
      try {
        const response = await budgetService.create(data)

        set(state => ({
          budgets: [...state.budgets, response.budget]
        }))

        return response.budget

      } catch (error) {
        console.error('Erro ao criar budget', error)
        throw error
      }
    },

    changeStatus: async ({ id, status }) => {
      try {
        const response = await budgetService.changeStatus({ id, status })
        return response.budget
      } catch(error) {
        console.error('Erro ao trocar status do Budget', error)
        throw error
      }
    },
  })
)