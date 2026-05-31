import { SchedulingService } from '@/lib/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DataProps {
    name: string
    email: string
    phone: string
    address: string
    description?: string
}

export interface SchedulingProps {
  serviceName: string 
  serviceDate: Date 
  clientName: string 
  clientEmail: string 
  clientAddress: string 
  clientPhone: string 
  clientDescription: string 
}

interface SchedulingStoreType {
  service: string
  date: Date | null
  data: DataProps
  step: number

  setStep: (step: number) => void
  setService: (service: string) => void
  setDateScheduling: (date: Date) => void
  setData: (data: DataProps) => void
  createScheduling: (data :SchedulingProps) => Promise<void>
} 

export const useSchedulingStore = create<SchedulingStoreType>()(
  persist(
    (set) => ({
    service: '',
    date: null,
    data: {
      name: '',
      email: '',
      phone: '',
      address: '',
      description: ''
    },
    step: 1,

    setStep: (step) => set ({ step }),
    setService: (service) => set({ service }),
    setDateScheduling: (date) => set({ date }),
    setData: (data) => { set({ data }), console.log(data) },
    createScheduling: async (data) => {
      try {
        const response = await SchedulingService.create(data)

        // set(state => ({

        // }))
      } catch (error) {
        console.error('Erro ao criar Scheduling', error)
        throw error
      }
    },
  }),
  {
      name: 'scheduling-storage',
      partialize: (state) => ({
        service: state.service,
        date: state.date,
        data: state.data,
        step: state.step,
      }),
    }
  )
)