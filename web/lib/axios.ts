import type { SchedulingProps } from "@/context/scheduling-store"
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

export const schedulingService = {
  create: async (data: SchedulingProps) => {

    console.log(data, 'indo a partir do axios')
    const response = await api.post('/scheduling', data)

    console.log('vindo a partir do axios')
    return response
  }
}

export const authService = {
  create: async () => {}
}