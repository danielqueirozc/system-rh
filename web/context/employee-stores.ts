import type { CreateEmployee, EditEmployee, EmployeePerformance, EmployeeProps } from '@/@types'
import { employeeService } from '@/lib/axios'
import { create } from 'zustand'

interface EmployeeStoreType {
  employee: EmployeePerformance[] | []

  getEmployees: () => Promise<EmployeePerformance[] | []>
  createEmployee: (data: CreateEmployee) => Promise<EmployeeProps>
  editEmployee: (data: EditEmployee) => Promise<EmployeeProps>
  deleteEmployee: (id: string) => Promise<void>
}

export const useEmployeeStore = create<EmployeeStoreType>()(
  (set) => ({
    employee: [],

    getEmployees: async () => {
      try {
        const response = await employeeService.get()

        set({ employee: response.employeePerformance })

        return response.employeePerformance

      } catch (error) {
        console.error('Erro ao listar employees', error)
        throw error
      }
    },
    createEmployee: async (data) => {
      try {
        const response = await employeeService.create(data)

        set(state => ({
          employee: [...state.employee, response.employee]
        }))

        return response.employee
      } catch(error) {
        console.error('Erro ao criar employee', error)
        throw error
      }
    },
    editEmployee: async (data: EditEmployee) => {
      try {
        const response = await employeeService.edit(data)

        set(state => ({
          employee: state.employee.map(emp => 
            emp.employee.id === data.id ? { ...emp, ...response.employee } : emp
          )
        }))

        return response.employee
      } catch(error) {
        console.error('Erro ao criar employee', error)
        throw error
      }
    },
    deleteEmployee: async (id: string) => {
      try {
        console.log(id, 'context')
        await employeeService.delete(id)

        set(state => ({
          employee: state.employee.filter(emp => emp.employee.id !== id)
        }))
      } catch(error) {
        console.error('Erro ao deletar employee', error)
        throw error
      }
    }
  })
)