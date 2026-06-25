import { useSchedulingStore } from '@/context/scheduling-store'
import { SchedulingService } from '@/lib/axios'
import { vi } from 'vitest'

// Intercepta qualquer arquivo que importar @/lib/axios e substitui o módulo inteiro pela versão falsa
// vi.fn() cria uma função vazia que eu posso controlar e espionar
vi.mock('@/lib/axios', () => ({
  SchedulingService: {
    create: vi.fn(), // função falsa, eu controlo o retorno
  }
}))

describe('scheduling', () => {
  beforeEach(() => {
  useSchedulingStore.setState({
    step: 1,
    service: '',
    date: null,
  })
})


  it('testar se a troca de valor do step esta funcionando normalmente', () => {
    const { setStep } = useSchedulingStore.getState()

    setStep(3)

    expect(useSchedulingStore.getState().step).toBe(3)
  })

  it('testar se o estado inicial do step esta certo', () => {

    expect(useSchedulingStore.getState().step).toBe(1)
  })

  it('testar se a troca de valor do service esta funcionando normalmente', () => {
    const { setService } = useSchedulingStore.getState()

    setService('Elétrica')

    expect(useSchedulingStore.getState().service).toBe('Elétrica')
  })

  it('testar se o estado inicial do service esta certo', () => {

    expect(useSchedulingStore.getState().service).toBe('')
  })

  it('testar se a troca de valor do date esta funcionando normalmente', () => {
    const { setDateScheduling } = useSchedulingStore.getState()

    setDateScheduling(new Date('2026-02-12T13:00:00')
    )

    expect(useSchedulingStore.getState().date).toStrictEqual(new Date('2026-02-12T13:00:00')
    )
  })

  it('testar se o estado inicial do date esta certo', () => {

    expect(useSchedulingStore.getState().date).toBeNull()
  })


})

 // esse teste nao é exatamente sobre mandar os dados pra api mas sim sobre como os dados vao chegar no axios
describe('createScheduling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useSchedulingStore.setState({
      service: 'Elétrica',
      date: new Date('2026-02-12T13:00:00'),
    })
  })

  it('chama a API com os dados corretos', async () => {
    // Define que, na próxima vez que create for chamado, ele vai fingir que a API respondeu com sucesso ({ data: {} }). vi.mocked()
    // é só para o TypeScript saber que aquela função é um mock
    vi.mocked(SchedulingService.create).mockResolvedValueOnce({ data: {} } as any)

    await useSchedulingStore.getState().createScheduling({
      name: 'João',
      email: 'joao@email.com',
      phone: '11999999999',
      address: 'Rua A, 123',
    })


    // está testando se o store montou e enviou o payload certo para a API
    // O store poderia enviar clientName: 'joao' (minúsculo) em vez de 'João' e ninguém perceberia sem esse teste
    expect(SchedulingService.create).toHaveBeenCalledWith({
      serviceName: 'Elétrica',
      serviceDate: new Date('2026-02-12T13:00:00'),
      clientName: 'João',
      clientEmail: 'joao@email.com',
      clientPhone: '11999999999',
      clientAddress: 'Rua A, 123',
      clientDescription: '',
    })
  })

  it('chama a API e retorna um erro', async () => {
    // Define que, na próxima vez que create for chamado, ele vai fingir que a API respondeu com sucesso ({ data: {} }). vi.mocked()
    // é só para o TypeScript saber que aquela função é um mock
    vi.mocked(SchedulingService.create).mockRejectedValueOnce(new Error('falha na API'))

   await expect(
    useSchedulingStore.getState().createScheduling({
      name: 'João',
      email: 'joao@email.com',
      phone: '11999999999',
      address: 'Rua A, 123',
    })
   ).rejects.toThrow('falha na API')
  })
})
