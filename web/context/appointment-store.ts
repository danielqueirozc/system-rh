import { appointmentService } from '@/lib/axios'
import { create } from 'zustand'
interface CreateAppointmentDataProps {
    name: string
    email: string
    phone: string
    address: string
    description?: string
  }

  const AppointmentStatus = {
    CONFIRMED: 'CONFIRMED',
    IN_PROGRESS: 'IN_PROGRESS',
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED'
  } as const
  
  export type AppointmentStatus = (typeof AppointmentStatus) [keyof typeof AppointmentStatus]
interface AppointmentsProps {
  id: string
  client: { name: string }
  service: { name: string }
  employee: { name: string } | null
  description: string
  serviceDate: Date
  status: AppointmentStatus
  createdAt: Date
  updatedAt: Date
}

interface AppointmentStoreType {
  service: string
  date: Date | null
  data: CreateAppointmentDataProps
  step: number
  appointments: AppointmentsProps[]

  setStep: (step: number) => void
  setService: (service: string) => void
  setDateAppointment: (date: Date) => void
  setData: (data: CreateAppointmentDataProps) => void
  createAppointment: (data: CreateAppointmentDataProps) => Promise<void>
  getAppointments: (status?: AppointmentStatus) => Promise<AppointmentsProps[] | []>
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
    appointments: [],

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
    getAppointments: async (status) => {
      const response = await appointmentService.get(status)
      set({ appointments: response.appointments })
      return response.appointments
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
