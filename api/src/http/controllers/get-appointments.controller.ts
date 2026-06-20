import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class GetAppointment {
  constructor(private prisma: PrismaService) {}

  @Get('/appointment')
  @HttpCode(200)
  async handle() {
    const appointments = await this.prisma.appointment.findMany({
      orderBy: {
        serviceDate: 'desc'
      }
    })

    return { appointments }
  }
}
