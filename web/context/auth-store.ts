import type { AuthenticateProps, AuthenticateResponseProps, CreateAccountProps, UserProps } from '@/@types'
import { authService } from '@/lib/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStoreType {
  user: UserProps | null
  token: string | null
  hasHydrated: boolean

  createUser: (data: CreateAccountProps) => Promise<UserProps>
  authenticate: ({ email, password }: AuthenticateProps) => Promise<AuthenticateResponseProps>
  logout: () => void
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,

      createUser: async (data) => {
        const response = await authService.create(data)
        return response.user
      },
      authenticate: async ({ email, password }) => {
        const response = await authService.autheticate({ email, password })

        set({
          token: response.access_token,
          user: response.user
        })

        return response
      },
      logout: () => {
        set({ user: null, token: null })
      },
      setHasHydrated: (value) => {
        set({ hasHydrated: value })
      }
    }),
    {
      name: 'auth-storage', // Nome da chave no localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }), // Salva apenas token e user
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
