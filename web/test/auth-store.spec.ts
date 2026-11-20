import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Role } from '@/@types'

vi.mock('@/lib/axios', () => ({
  authService: {
    create: vi.fn(),
    autheticate: vi.fn(),
  },
}))

import { useAuthStore } from '@/context/auth-store'
import { authService } from '@/lib/axios'

const mockUser = {
  id: '1',
  name: 'Daniel',
  email: 'daniel@test.com',
  role: Role.ADMIN,
  employeeId: null,
}

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    // reseta só os dados, sem sobrescrever as actions (setState faz merge, não replace)
    useAuthStore.setState({ user: null, token: null, hasHydrated: false })
    vi.clearAllMocks()
  })

  it('autentica e guarda o token e o usuário no state', async () => {
    vi.mocked(authService.autheticate).mockResolvedValue({
      access_token: 'fake-jwt-token',
      user: mockUser,
    })

    const response = await useAuthStore.getState().authenticate({
      email: 'daniel@test.com',
      password: '123456',
    })

    expect(authService.autheticate).toHaveBeenCalledWith({
      email: 'daniel@test.com',
      password: '123456',
    })
    expect(useAuthStore.getState().token).toBe('fake-jwt-token')
    expect(useAuthStore.getState().user).toEqual(mockUser)
    expect(response.access_token).toBe('fake-jwt-token')
  })

  it('não guarda nada no state quando a autenticação falha', async () => {
    vi.mocked(authService.autheticate).mockRejectedValue(new Error('credenciais inválidas'))

    await expect(
      useAuthStore.getState().authenticate({ email: 'daniel@test.com', password: 'errada' })
    ).rejects.toThrow('credenciais inválidas')

    expect(useAuthStore.getState().token).toBeNull()
    expect(useAuthStore.getState().user).toBeNull()
  })

  it('logout limpa o usuário e o token', () => {
    useAuthStore.setState({ user: mockUser, token: 'algum-token' })

    useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().token).toBeNull()
  })

  it('createUser não loga automaticamente (não altera o state)', async () => {
    const novoUsuario = { ...mockUser, id: '2', role: Role.EMPLOYEE }
    vi.mocked(authService.create).mockResolvedValue({ user: novoUsuario })

    const result = await useAuthStore.getState().createUser({
      name: novoUsuario.name,
      email: novoUsuario.email,
      password: '123456',
      role: Role.EMPLOYEE,
    })

    expect(result).toEqual(novoUsuario)
    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().token).toBeNull()
  })

  it('setHasHydrated atualiza a flag', () => {
    expect(useAuthStore.getState().hasHydrated).toBe(false)

    useAuthStore.getState().setHasHydrated(true)

    expect(useAuthStore.getState().hasHydrated).toBe(true)
  })

  it('persiste no localStorage só token e user, nunca hasHydrated', () => {
    useAuthStore.setState({ user: mockUser, token: 'algum-token', hasHydrated: true })

    const stored = JSON.parse(localStorage.getItem('auth-storage') ?? '{}')

    expect(stored.state.token).toBe('algum-token')
    expect(stored.state.user).toEqual(mockUser)
    expect(stored.state.hasHydrated).toBeUndefined()
  })
})
