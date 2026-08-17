import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, NotFoundException, Put, UsePipes } from "@nestjs/common";
import z from "zod";

const bodySchema = z.object({
  id: z.string(),
  status: z.enum(['CONFIRMED', 'IN_PROGRESS', 'PENDING', 'COMPLETED']),
  date: z.coerce.date(),
  description: z.string(),
})

type EditAppointment = z.infer<typeof bodySchema>

@Controller()
export class EditAppoinment {
  constructor(private prisma: PrismaService) {}

  @Put('/appointment')
  @UsePipes(new ZodValidationPipe(bodySchema))
  @HttpCode(200)
  async handle(@Body() body: EditAppointment) {
    const { id, status, date, description } = body

    const appointmentAlreadyExists = await this.prisma.appointment.findUnique({
      where: { id }
    })
    
    if (!appointmentAlreadyExists) {
      throw new NotFoundException(`Appointment "${id}" não existe no banco`)
    }

    const appointment = await this.prisma.appointment.update({
      where: {id},
      data: { status, serviceDate: date, description }
    })

    return { appointment }
  }
}