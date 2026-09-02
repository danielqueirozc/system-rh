import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import type { EmployeeStatus } from "../../../../generated/prisma/enums";

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
    // query param sempre chega como string (ou undefined) na URL, por isso convervti pra number aqui
    const selectedYear = year ? Number(year) : new Date().getFullYear()

    // intervalo [1º de janeiro, 1º de janeiro do ano seguinte) do ano selecionado
    const yearStart = new Date(`${selectedYear}-01-01T00:00:00.000Z`)
    const yearEnd = new Date(`${selectedYear + 1}-01-01T00:00:00.000Z`)
    const previousYearStart = new Date(`${selectedYear - 1}-01-01T00:00:00.000Z`)
    const previousYearEnd = new Date(`${selectedYear}-01-01T00:00:00.000Z`)

    const today = new Date()
    const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
    const monthEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 1))
    const previousMonthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1))
    const previousMonthEnd = monthStart // início do mês atual = fim do mês anterior

    // roda as queries em paralelo, igual no get-budgets.controller.ts
    const [
      allEmployees,
      approvedBudgets,
      approvedBudgetsByMonth,
      previousApprovedBudgets,
      previousApprovedBudgetsByMonth,
      completedAppointments,
      previousCompletedAppointments,
      totalBudgetsInMonth,
      previousTotalBudgetsInMonth,
    ] = await Promise.all([
      this.prisma.employee.findMany({
        select: { id: true, name: true, status: true }
      }),

      // orçamentos aprovados no ano -> base de toda a receita do relatório
      // lt = less than = (menor que, estritamente)
      // WHERE date >= yearStart AND date < yearEnd

      this.prisma.budget.findMany({
        // gte = greater than or equal (maior ou igual)
      // lt = less than = (menor que, estritamente)
        where: { status: 'APPROVED', date: { gte: yearStart, lt: yearEnd } },
        select: {
          value: true,
          date: true,
          employeeId: true,
          employeeName: true,
        },
      }),

        this.prisma.budget.findMany({
        // gte = greater than or equal (maior ou igual)
        where: { status: 'APPROVED', date: { gte: monthStart, lt: monthEnd } },
        select: {
          value: true,
          date: true,
          employeeId: true,
          employeeName: true,
        },
      }),

      this.prisma.budget.findMany({
        where: { status: 'APPROVED', date: {gte: previousYearStart, lt: previousYearEnd} },
        select: {
          value: true,
          date: true,
          employeeId: true,
          employeeName: true,
        }
      }),

      this.prisma.budget.findMany({
        where: { status: 'APPROVED', date: {gte: previousMonthStart, lt: previousMonthEnd} },
        select: {
          value: true,
          date: true,
          employeeId: true,
          employeeName: true,
        }
      }),
      // agendamentos concluídos no ano -> base de "serviços realizados", distribuição e quantidade mensal
      this.prisma.appointment.findMany({
        where: { status: 'COMPLETED', serviceDate: { gte: yearStart, lt: yearEnd } },
        select: {
          serviceDate: true,
          service: { select: { name: true } },
        },
      }),

      this.prisma.appointment.findMany({
        where: { status: 'COMPLETED', serviceDate: { gte: previousYearStart, lt: previousYearEnd } },
        select: {
          serviceDate: true,
          service: { select: { name: true } },
        },
      }),
      // todos os orçamentos criados no mês (independente do status) -> denominador da taxa de conversão
      this.prisma.budget.count({
        where: { date: { gte: monthStart, lt: monthEnd } },
      }),

      this.prisma.budget.count({
        where: { date: { gte: previousMonthStart, lt: previousMonthEnd } },
      }),
    ])

    


    // budget.value vem como Decimal do banco, então precisa de Number() antes de somar
    const revenueTotal = approvedBudgets.reduce((acc, budget) => acc + Number(budget.value), 0)
    const previousRevenueTotal = previousApprovedBudgets.reduce((acc, budget) => acc + Number(budget.value), 0)
    const previousRevenueTotalByMonth = previousApprovedBudgetsByMonth.reduce((acc, budget) => acc + Number(budget.value), 0)
    const revenueTotalByMonth = approvedBudgetsByMonth.reduce((acc, budget) => acc + Number(budget.value), 0)
    const totalRevenueVariation = previousRevenueTotal > 0 ?((revenueTotal - previousRevenueTotal) / previousRevenueTotal) * 100 : 0

    const servicesRealized = completedAppointments.length
    const previousServicesRealized = previousCompletedAppointments.length
    const realizedServicesVariation = previousServicesRealized > 0 ? ((servicesRealized - previousServicesRealized) / previousServicesRealized) * 100 : 0
    const averageTicket = approvedBudgetsByMonth.length > 0 ? revenueTotalByMonth / approvedBudgetsByMonth.length : 0
    const previousAverageTicket = previousApprovedBudgetsByMonth.length > 0 ? previousRevenueTotalByMonth / previousApprovedBudgetsByMonth.length : 0
    const averageTicketVariation = previousAverageTicket > 0 ? ((averageTicket - previousAverageTicket) / previousAverageTicket) * 100 : 0
    const conversionRate = totalBudgetsInMonth > 0 ? (approvedBudgetsByMonth.length / totalBudgetsInMonth) * 100 : 0
    const previousConversionRate = previousTotalBudgetsInMonth > 0 ? (previousApprovedBudgetsByMonth.length / previousTotalBudgetsInMonth) * 100 : 0
    const conversionRateVariation = previousConversionRate > 0 ? ((conversionRate - previousConversionRate) / previousConversionRate) * 100 : 0

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
    // chave string = somente employeeId, valor obj
    const employeePerformanceById = new Map<string, {
      employeeId: string | null
      employeeName: string
      employeeStatus: EmployeeStatus | null
      completedServices: number
      generatedRevenue: number
    }>()

    for (const employee of allEmployees) {
      employeePerformanceById.set(employee.id, {
        employeeId: employee.id,
        employeeName: employee.name,
        employeeStatus: employee.status,
        completedServices: 0,
        generatedRevenue: 0,
      })
    }

    for (const budget of approvedBudgets) {
      const key = budget.employeeId ?? budget.employeeName
      const current = employeePerformanceById.get(key) ?? {
        employeeId: budget.employeeId,
        employeeName: budget.employeeName,
        employeeStatus: null,
        completedServices: 0,
        generatedRevenue: 0,
      }

      current.completedServices += 1
      current.generatedRevenue += Number(budget.value)
      employeePerformanceById.set(key, current)
    }

     const employeePerformance = Array.from(employeePerformanceById.values()).map((employee) => ({
        ...employee,
        averagePerService: employee.completedServices > 0 ? employee.generatedRevenue / employee.completedServices : 0,
      }))

    return {
      year: selectedYear,
      revenueTotal,
      totalRevenueVariation,
      servicesRealized,
      realizedServicesVariation,
      averageTicket,
      averageTicketVariation,
      conversionRate,
      conversionRateVariation,
      monthlyRevenue,
      servicesQuantity,
      serviceDistribution,
      employeePerformance,
    }
  }
}