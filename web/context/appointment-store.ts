import { appointmentService } from '@/lib/axios'
import { create } from 'zustand'

interface DataProps {
    name: string
    email: string
    phone: string
    address: string
    description?: string
}

export interface AppointmentProps {
  serviceName: string
  serviceDate: Date
  clientName: string
  clientEmail: string
  clientAddress: string
  clientPhone: string
  clientDescription: string
}

interface AppointmentStoreType {
  service: string
  date: Date | null
  data: DataProps
  step: number

  setStep: (step: number) => void
  setService: (service: string) => void
  setDateAppointment: (date: Date) => void
  setData: (data: DataProps) => void
  createAppointment: (data: DataProps) => Promise<void>
}

export const useAppointmentStore = create<AppointmentStoreType>()(
  // persist(
    (set, get) => ({
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
      setDateAppointment: (date) => set({ date }),
      setData: (data) => { set({ data }), console.log(data) },
      createAppointment: async (data) => {
      const { service, date } = get()
      try {
        const response = await appointmentService.create({
          serviceName: service,
          serviceDate: date!,
          clientName: data.name,
          clientEmail: data.email,
          clientAddress: data.address,
          clientPhone: data.phone,
          clientDescription: data.description ?? '',
        })

        console.log(response, 'response store')
      } catch (error) {
        console.error('Erro ao criar Appointment', error)
        throw error
      }
    },
  }),
  // {
  //     name: 'appointment-storage',
  //     partialize: (state) => ({
  //       service: state.service,
  //       date: state.date,
  //       data: state.data,
  //       step: state.step,
  //     }),
  //   }
  // )
)
