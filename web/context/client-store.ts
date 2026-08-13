import type { CreateClientProps, GetClientProps } from '@/@types'
import { clientService, employeeService } from '@/lib/axios'
import { create } from 'zustand'

const ClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus]



interface ClientStoreType {
  client: GetClientProps[] | []

  getClients: () => Promise<GetClientProps[] | []>
  createClient: (data: CreateClientProps) => Promise<void>
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
    },
    createClient: async (data: CreateClientProps) => {
      try {
        const response = clientService.create(data)
      } catch (error) {
        console.error('Erro ao criar client', error)
      }
    }
  })
)