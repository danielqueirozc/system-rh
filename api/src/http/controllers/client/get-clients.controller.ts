import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetClients {
  constructor(private prisma: PrismaService) {}

  @Get('/client')
  @HttpCode(200)
  async handle() {
    const clients = await this.prisma.client.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { clients }
  }
}