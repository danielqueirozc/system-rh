import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import z from "zod";

const bodySchema = z.object({
  clientId: z.string(),
  serviceName: z.string(),
  employeeId: z.string(),
  serviceDate: z.coerce.date(),
  description: z.string().optional(),
})

type CreateAppointmentAdminType = z.infer<typeof bodySchema>

@Controller()
export class CreateAppointmentAdmin {
  constructor(private prisma: PrismaService) {}

  @Post('/appointment/admin')
  @UsePipes(new ZodValidationPipe(bodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAppointmentAdminType) {
    const { clientId, serviceName, employeeId, serviceDate, description } = body

    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    })

    if (!client) {
      throw new NotFoundException(`Cliente "${clientId}" não encontrado`)
    }

    const service = await this.prisma.service.findFirst({
      where: { name: serviceName },
    })

    if (!service) {
      throw new NotFoundException(`Serviço "${serviceName}" não encontrado`)
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    })

    if (!employee) {
      throw new NotFoundException(`Funcionário "${employeeId}" não encontrado`)
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        serviceDate,
        status: 'PENDING',
        description,
        client: { connect: { id: client.id } },
        service: { connect: { id: service.id } },
        employee: { connect: { id: employee.id } },
      },
      include: {
        client: { select: { name: true } },
        service: { select: { name: true } },
        employee: { select: { name: true } },
      },
    })

    return { appointment }
  }
}
