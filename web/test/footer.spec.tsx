import { render, screen } from '@testing-library/react'
import { Footer } from '@/app/components/footer'

describe('footer', () => {
  it('renderiza o copyright', () => {
    render(<Footer />)

    const texto = screen.getByText('© 2025 Ávila Manutenção e Reparos - Todos os direitos reservados')

    expect(texto).toBeInTheDocument()
  })

  it('o texto de contato com telefone e email', () => {
    render(<Footer />)

    const texto = screen.getByText('Dúvidas? Entre em contato: (00) 0000-0000 | contato@avila.com.br')

    expect(texto).toBeInTheDocument()
  })
})
