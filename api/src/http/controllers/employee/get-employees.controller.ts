import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetEmployees {
  constructor(private prisma: PrismaService) {}

  @Get('/employee')
  @HttpCode(200)
  async handle() {
   const employees = await this.prisma.employee.findMany({
    include: {
      _count: {
        select: { budgets: { where: { status: 'APPROVED' } } }
      }
    }
   })

   const employeePerformance = employees.map(({ _count, ...employee }) => ({
    employee,
    completedServices: _count.budgets
   }))

   return { employeePerformance }
  }
}