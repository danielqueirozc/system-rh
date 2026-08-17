import type { ClientProps, CreateClientProps, EditClientProps,  } from '@/@types'
import { clientService } from '@/lib/axios'
import { create } from 'zustand'

const ClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus]



interface ClientStoreType {
  client: ClientProps[] | []

  getClients: () => Promise<ClientProps[] | []>
  createClient: (data: CreateClientProps) => Promise<ClientProps>
  deleteClient: (id: string) => Promise<void>
  editClient: (data: EditClientProps) => Promise<ClientProps>
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
    },
    editClient: async (data: EditClientProps) => {
      try {
        const response = await clientService.edit(data)
        set(state => ({
          client: state.client.map(item => 
            item.id === data.id ? { ...item, ...response.client } : item
          )
        }))
        return response.client
      } catch (error) {
        console.error('Erro ao edita client:', error)
        throw error
      }
    }
  })
)