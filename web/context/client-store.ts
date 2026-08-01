import { clientService, employeeService } from '@/lib/axios'
import { create } from 'zustand'

const ClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus]

interface ClientProps {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: ClientStatus
  appointments: []
  budgets: []
  createdAt: Date
  updatedAt: Date
}

interface ClientStoreType {
  client: ClientProps[] | []

  getClients: () => Promise<ClientProps[] | []>
}

export const useClientStore = create<ClientStoreType>()(
  (set) => ({
    client: [],

    getClients: async () => {
      try {
        const response = await clientService.get()

        set({ client: response.clients })

        return response.clients

      } catch (error) {
        console.error('Erro ao listar clients', error)
        throw error
      }
    }
  })
)