import type { AppointmentProps, CreateAppointmentAdminProps, CreateBudgetProps, CreateClientProps, EditAppointmentProps, EditClientProps } from "@/@types"
import type { AppointmentStatus } from "@/context/appointment-store"
import axios from "axios"

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
  createClient: async (data: AppointmentProps) => {
    const response = await api.post('/appointment', data)
    return response.data
  },
  createAdmin: async (data: CreateAppointmentAdminProps) => {
    console.log('axios', data)
    
    const response = await api.post('/appointment/admin', data)
    return response.data
  },

  edit: async ({ id, status, date, description }: EditAppointmentProps) => {
    const response = await api.put('/appointment', { id, status, date, description })
    return response.data
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
  create: async (data: CreateClientProps) => {
    // console.log('estou no axios', data)
    const response = await api.post('/client', data)
    console.log('axios', response.data)
    return response.data
  },
  delete: async (id: string) => {
    const response = await api.delete(`/client/${id}`)
  },
  edit: async (data: EditClientProps) => {
    const response = await api.put('/client', data)
    return response.data
  }
}

export const budgetService = {
  get: async () => {
    const response = await api.get('/budget')
    return response.data
  },
  create: async (data: CreateBudgetProps) => {
    console.log('axios', data)
    const response = await api.post('/budget', data)
    return response.data
  }
}

export const serviceService = {
  get: async () => {
    const response = await api.get('/service')
    return response.data
  }
}

export const reportService = {
  get: async (year?: number) => {
    const response = await api.get('/report', { params: { year } })
    return response.data
  }
}