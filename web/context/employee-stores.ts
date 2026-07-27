import { employeeService } from '@/lib/axios'
import { create } from 'zustand'

const EmployeeStatus = {
  ACTIVE: 'ACTIVE',
  VACATION: 'VACATION',
  INACTIVE: 'INACTIVE',
} as const

type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus]


interface EmployeeProps {
  id: string
  name: string
  function: string
  status: EmployeeStatus
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
  employeeServices: []
  appointment: []
}

interface EmployeeStoreType {
  employee: EmployeeProps[] | []

  getEmployees: () => Promise<EmployeeProps[] | []>
}

export const useEmployeeStore = create<EmployeeStoreType>()(
  (set) => ({
    employee: [],

    getEmployees: async () => {
      try {
        const response = await employeeService.get()

        set({ employee: response.employee })

        return response.employee

      } catch (error) {
        console.error('Erro ao listar employees', error)
        throw error
      }
    }
  })
)