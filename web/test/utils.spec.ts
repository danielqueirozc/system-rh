import { cn } from "@/lib/utils"

describe('cn', () => {
  it('combinar classes', () => {
    const result = cn('grid', 'grid-cols-3')

    expect(result).toBe('grid grid-cols-3')
  })

  it('ignorar valores falsos', () => {
    const result = cn('grid', undefined, null)

    expect(result).toBe('grid')
  })

  it('conflito de classes', () => {
    const result = cn('m-4', 'm-8')

    expect(result).toBe('m-8')
  })
})