import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetScheduling {
  constructor(private prisma: PrismaService) {}

  @Get('/scheduling')
  @HttpCode(200)
  async handle() {
    const schedulings = await this.prisma.scheduling.findMany({
      orderBy: {
        serviceDate: 'desc'
      }
    })

    return { schedulings }
  }
}