import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetEmployees {
  constructor(private prisma: PrismaService) {}

  @Get('/employee')
  @HttpCode(200)
  async handle() {
    const approvedBudgets = await this.prisma.budget.findMany({
      where: { status: 'APPROVED' },
      select: {
        employee: true
      }
    })

    const employeePerformanceById = new Map()

    for (const budget of approvedBudgets) {
      const employee = budget.employee
      const employeeId = budget.employee.id

      const current = employeePerformanceById.get(employeeId) ?? {
        employee,
        completedServices: 0
      }

      current.completedServices += 1
      employeePerformanceById.set(employeeId, current)
    }

    const employeePerformance = Array.from(employeePerformanceById.values())

    return { employeePerformance }
  }
}

 // const employee = await this.prisma.employee.findMany({
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    // })

    // // const employeIdd = employee.map(emp => emp.id)
    // // const completedServices = await this.prisma.appointment.findMany({
    // //   where: {status: 'COMPLETED'},
    // //   select: {
    // //     employee: {}
    // //   }
    // // })