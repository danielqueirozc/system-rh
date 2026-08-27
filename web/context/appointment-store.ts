import type { AppointmentsProps, AppointmentStatus, CreateAppointmentAdminProps, CreateAppointmentClientProps, EditAppointmentProps } from '@/@types'
import { appointmentService } from '@/lib/axios'
import { create } from 'zustand'

interface AppointmentStoreType {
  service: string
  date: Date | null
  step: number
  appointments: AppointmentsProps[]

  setStep: (step: number) => void
  setService: (service: string) => void
  setDateAppointment: (date: Date) => void
  createAppointmentClient: (data: CreateAppointmentClientProps) => Promise<AppointmentsProps>
  createAppointmentAdmin: (data: CreateAppointmentAdminProps) => Promise<AppointmentsProps>
  getAppointments: (status?: AppointmentStatus) => Promise<AppointmentsProps[] | []>
  editAppointment: (data: EditAppointmentProps) => Promise<AppointmentsProps>
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
    getAppointments: async (status) => {
      const response = await appointmentService.get(status)
      set({ appointments: response.appointments })
      return response.appointments
    },
    createAppointmentClient: async (data) => {
    const { service, date } = get()
    try {
      const response = await appointmentService.createClient({
        serviceName: service,
        serviceDate: date!,
        clientName: data.name,
        clientEmail: data.email,
        clientAddress: data.address,
        clientPhone: data.phone,
        clientDescription: data.description ?? '',
      })

      return response.appointment

    } catch (error) {
      console.error('Erro ao criar Appointment', error)
      throw error
    }
    },
    createAppointmentAdmin: async (data) => {
    try {
      const response = await appointmentService.createAdmin({
        serviceName: data.serviceName,
        serviceDate: data.serviceDate,
        clientId: data.clientId,
        employeeId: data.employeeId,
        description: data.description,
      })

      set(state => ({
        appointments: [...state.appointments, response.appointment]
      }))

      return response.appointment

    } catch (error) {
      console.error('Erro ao criar Appointment', error)
      throw error
    }
    },
    editAppointment: async (data: EditAppointmentProps) => {
      try {
        const response = await appointmentService.edit(data)
        set(state => ({
          appointments: state.appointments.map(item => 
            item.id === data.id ? { ...item, ...response.appointment } : item
          )
        }))
        return response.appointment
        
      } catch (error) {
        console.error('Erro ao editar Appointment', error)
        throw error
      }
    }
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
