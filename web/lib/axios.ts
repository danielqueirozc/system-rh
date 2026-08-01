import type { AppointmentProps } from "@/context/appointment-store"
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
  create: async (data: AppointmentProps) => {

    console.log(data, 'indo a partir do axios')
    const response = await api.post('/appointment', data)

    console.log('vindo a partir do axios')
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
    console.log(response)
    return response.data
  }
}
