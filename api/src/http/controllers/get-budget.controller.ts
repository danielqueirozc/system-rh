import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetBudget {
  constructor(private prisma: PrismaService) {}

  @Get('/budget')
  @HttpCode(200)
  async handle() {
    const budgets = await this.prisma.budget.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        client: {
          select: { name: true }
        },
        service: {
          select: { name: true }
        }
      },
    })

    // Promise.all é uma feature nativa do JavaScript pra lidar com várias promises ao mesmo tempo
    // permite que as 3 promises rodem juntas sem depender que uma acabe para a outra poder começar
    const [totalAgg, approvedAgg, pendingAgg] = await Promise.all([
      this.prisma.budget.aggregate({ _sum: { value: true } }),
      this.prisma.budget.aggregate({ _sum: { value: true }, where: { status: 'APPROVED' } }),
      this.prisma.budget.aggregate({ _sum: { value: true }, where: { status: 'PENDING' } }),
    ])

    return {
      budgets,
      total: Number(totalAgg._sum.value ?? 0), // precisa ser assim porque pode retornar null
      approved: Number(approvedAgg._sum.value ?? 0),
      pending: Number(pendingAgg._sum.value ?? 0),
    }

  }
}

// outra forma de retornar os resultados de soma
// const total = budget.reduce((acc, b) => acc + Number(b.value), 0)

// const approved = budget
//   .filter(b => b.status === 'APPROVED')
//   .reduce((acc, b) => acc + Number(b.value), 0)

// const pending = budget
//   .filter(b => b.status === 'PENDING')
//   .reduce((acc, b) => acc + Number(b.value), 0)
