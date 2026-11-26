import { PrismaService } from "@/database/prisma/prisma.service";
import { AppointmentStatus } from "../../../../generated/prisma/client";
import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";

const statusSchema = z.enum(AppointmentStatus).optional()

@Controller()
export class GetAppointmentByStatus {
  constructor(private prisma: PrismaService) {}

  @Get('/appointment')
  @HttpCode(200)
  async handle(@Query('status', new ZodValidationPipe(statusSchema)) status?: AppointmentStatus) {
    const appointments = await this.prisma.appointment.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        serviceDate: 'desc'
      },
      include: {
        client: {
          select: { name: true }
        },
        service: {
          select: { name: true }
        },
        employee: {
          select: { name: true }
        }
      }
    })

    // console.log(appointments)

    return { appointments }
  }
}
