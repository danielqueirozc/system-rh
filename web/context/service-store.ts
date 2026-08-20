import type { ServiceProps } from '@/@types'
import { serviceService } from '@/lib/axios'
import { create } from 'zustand'

interface ServiceStoreType {
  service: ServiceProps[] | []

  getServices: () => Promise<ServiceProps[] | []>
}

export const useServiceStore = create<ServiceStoreType>()(
  (set) => ({
    service: [],

    getServices: async () => {
      try {
        const response = await serviceService.get()

        set({ service: response.services })

        return response.services

      } catch (error) {
        console.error('Erro ao listar services', error)
        throw error
      }
    }
  })
)
