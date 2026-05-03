import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetBudget {
  constructor(private prisma: PrismaService) {}

  @Get('/budget')
  @HttpCode(200)
  async handle() {
    const budget = await this.prisma.budget.findMany({
      orderBy: {
        date: 'desc'
      }
    })

    return { budget }
  }
}