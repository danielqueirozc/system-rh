import { render, screen } from '@testing-library/react'
import { Header } from '@/app/components/header'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  )
}))

describe('header', () => {
  it('renderiza o titulo', () => {
    render(<Header />)

    const texto = screen.getByText('Ávila Manutenção e Reparos')

    expect(texto).toBeInTheDocument()
  })

  it('renderiza o subtitulo', () => {
    render(<Header />)

    const texto = screen.getByText('Agende seu serviço de forma rápida e fácil')

    expect(texto).toBeInTheDocument()
  })

  it('busca por papel semântico', () => {
    render(<Header />)

    const link = screen.getByRole('link', { name: 'Acesso Funcionários' })

    expect(link).toHaveAttribute('href', '/login')
  })
})
