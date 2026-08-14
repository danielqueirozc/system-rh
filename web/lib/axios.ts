import type { AppointmentStatus } from "@/context/appointment-store"
import axios from "axios"

interface AppointmentProps {
  serviceName: string
  serviceDate: Date
  clientName: string
  clientEmail: string
  clientAddress: string
  clientPhone: string
  clientDescription: string
}

interface ClientProps {
  name: string
  email: string
  phone: string
  address: string
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token

//    if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

// api.interceptors.response.use(
//  (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Usa a action logout da própria store
//       useAuthStore.getState().logout()
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

export const appointmentService = {
  get: async (status?: AppointmentStatus) => {
    const response = await api.get('/appointment', { params: { status } })
    return response.data
  },
  create: async (data: AppointmentProps) => {
    const response = await api.post('/appointment', data)
    return response
  }
}

export const authService = {
  create: async () => {}
}

export const employeeService = {
  get: async () => {
    const response = await api.get('/employee')
    return response.data
  }
}

export const clientService = {
  get: async () => {
    const response = await api.get('/client')
    return response.data
  },
  create: async (data: ClientProps) => {
    // console.log('estou no axios', data)
    const response = await api.post('/client', data)
    console.log('axios', response.data)
    return response.data
  },
  delete: async (id: string) => {
    const response = await api.delete(`/client/${id}`)
  }
}

export const budgetService = {
  get: async () => {
    const response = await api.get('/budget')
    return response.data
  },
}

export const reportService = {
  get: async (year?: number) => {
    const response = await api.get('/report', { params: { year } })
    return response.data
  }
}