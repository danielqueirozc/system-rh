import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetServices {
  constructor(private prisma: PrismaService) {}

  @Get('/service')
  @HttpCode(200)
  async handle() {
    const services = await this.prisma.service.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return { services }
  }
}
