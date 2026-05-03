import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetEmployee {
  constructor(private prisma: PrismaService) {}

  @Get('/employee')
  @HttpCode(200)
  async handle() {
    const employee = await this.prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { employee }
  }
}