import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode, Query } from "@nestjs/common";

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
]

@Controller()
export class GetReports {
  constructor(private prisma: PrismaService) {}

  @Get('/report')
  @HttpCode(200)
  async handle(@Query('year') year?: string) {
    // query param sempre chega como string (ou undefined) na URL, por isso convertemos pra number aqui
    const selectedYear = year ? Number(year) : new Date().getFullYear()

    // intervalo [1º de janeiro, 1º de janeiro do ano seguinte) do ano selecionado
    const yearStart = new Date(`${selectedYear}-01-01T00:00:00.000Z`)
    const yearEnd = new Date(`${selectedYear + 1}-01-01T00:00:00.000Z`)

    // roda as 3 queries em paralelo, igual no get-budgets.controller.ts
    const [approvedBudgets, completedAppointments, totalBudgetsInYear] = await Promise.all([
      // orçamentos aprovados no ano -> base de toda a receita do relatório
      // lt = less than (menor que, estritamente)
      // WHERE date >= yearStart AND date < yearEnd

      this.prisma.budget.findMany({
        // gte = greater than or equal (maior ou igual)
        where: { status: 'APPROVED', date: { gte: yearStart, lt: yearEnd } },
        select: {
          value: true,
          date: true,
          employee: { select: { id: true, name: true } },
        },
      }),
      // agendamentos concluídos no ano -> base de "serviços realizados", distribuição e quantidade mensal
      this.prisma.appointment.findMany({
        where: { status: 'COMPLETED', serviceDate: { gte: yearStart, lt: yearEnd } },
        select: {
          serviceDate: true,
          service: { select: { name: true } },
        },
      }),
      // todos os orçamentos criados no ano (independente do status) -> denominador da taxa de conversão
      this.prisma.budget.count({
        where: { date: { gte: yearStart, lt: yearEnd } },
      }),
    ])

    // budget.value vem como Decimal do banco, então precisa de Number() antes de somar
    const revenueTotal = approvedBudgets.reduce((acc, budget) => acc + Number(budget.value), 0)
    const servicesRealized = completedAppointments.length
    const ticketMedio = approvedBudgets.length > 0 ? revenueTotal / approvedBudgets.length : 0
    const taxaConversao = totalBudgetsInYear > 0 ? (approvedBudgets.length / totalBudgetsInYear) * 100 : 0

    // soma a receita aprovada mês a mês -> array de 12 posições (Jan a Dez)
    // getUTCMonth() pra não depender do fuso horário de onde o Node está rodando
    const monthlyRevenue = MONTHS.map((month, index) => ({
      month,
      total: approvedBudgets
        .filter((budget) => budget.date.getUTCMonth() === index) // getUTCMonth retorna o mes da data
        .reduce((acc, budget) => acc + Number(budget.value), 0),
    }))

    // conta quantos agendamentos concluídos caíram em cada mês
    const servicesQuantity = MONTHS.map((month, index) => ({
      month,
      count: completedAppointments.filter(
        (appointment) => appointment.serviceDate.getUTCMonth() === index,
      ).length,
    }))

    // agrupa os agendamentos concluídos por tipo de serviço e calcula o % de cada um sobre o total
    const serviceCountByName = new Map<string, number>()
    for (const appointment of completedAppointments) {
      const serviceName = appointment.service.name
      serviceCountByName.set(serviceName, (serviceCountByName.get(serviceName) ?? 0) + 1)
    }
    const serviceDistribution = Array.from(serviceCountByName.entries()).map(([service, count]) => ({
      service,
      count,
      percentage: servicesRealized > 0 ? (count / servicesRealized) * 100 : 0,
    }))

    // agrupa os orçamentos aprovados por funcionário: quantidade de serviços fechados e receita gerada
    const employeePerformanceById = new Map<string, {
      employeeId: string
      funcionario: string
      servicosConcluidos: number
      receitaGerada: number
    }>()
    for (const budget of approvedBudgets) {
      const employeeId = budget.employee.id
      const current = employeePerformanceById.get(employeeId) ?? {
        employeeId,
        funcionario: budget.employee.name,
        servicosConcluidos: 0,
        receitaGerada: 0,
      }

      current.servicosConcluidos += 1
      current.receitaGerada += Number(budget.value)

      employeePerformanceById.set(employeeId, current)
    }
    const employeePerformance = Array.from(employeePerformanceById.values()).map((employee) => ({
      ...employee,
      mediaPorServico: employee.servicosConcluidos > 0 ? employee.receitaGerada / employee.servicosConcluidos : 0,
    }))

    return {
      year: selectedYear,
      revenueTotal,
      servicesRealized,
      ticketMedio,
      taxaConversao,
      monthlyRevenue,
      servicesQuantity,
      serviceDistribution,
      employeePerformance,
    }
  }
}
