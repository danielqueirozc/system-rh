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
  createClient: (data: CreateClientProps) => Promise<GetClientProps>
  deleteClient: (id: string) => Promise<void>
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
        // console.log('estou no contexto', data)
        const response = await clientService.create(data)
        // coloquei return para se um dia precisar pegar o cliet recem-criado
        console.log('resposta no context', response.client)
        set(state => ({ client: [... state.client, response.client] }))
        return response.client
        
      } catch (error) {
        console.error('Erro ao criar client', error)
        throw error
      }
    },
    deleteClient: async (id: string) => {
      try {
      const response = await clientService.delete(id)
      
      set(state => ({
        client: state.client.filter(item => item.id != id)
      }))
      } catch (error) {
        console.error('Erro ao deletar client:', error)
        throw error
      }
    }
  })
)