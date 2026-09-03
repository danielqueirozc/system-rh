import { PrismaService } from "@/database/prisma/prisma.service";
import { Body, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { EmailService } from "@/email/email.service";

const bodySchema = z.object({
  serviceName: z.string(),
  serviceDate: z.coerce.date(),
  clientName: z.string(),
  clientEmail: z.email(),
  clientPhone: z.string(),
  clientAddress: z.string(),
  clientDescription: z.string().optional()
})

type CreateAppointmentType = z.infer<typeof bodySchema>

@Controller()
export class CreateAppointmentClient {
  constructor(
    private prisma: PrismaService,
    private email: EmailService
  ) {}

  @Post("/appointment")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: CreateAppointmentType) {
    const { serviceName, serviceDate, clientName, clientEmail, clientPhone, clientAddress } = body

    const service = await this.prisma.service.findFirst({
      where: { name: serviceName },
    })

    if (!service) {
      throw new NotFoundException(`Serviço "${serviceName}" não encontrado`)
    }

    const employee = await this.prisma.employee.findFirst({
      where: {
      status: "ACTIVE",
      employeeServices: {
        some: {
          serviceId: service.id,
        },
      },
    },
    })

    if (!employee) {
      throw new NotFoundException(`Nenhum funcionário disponivel para "${serviceName}"`)
    }

    const client = await this.prisma.client.upsert({
      where: { email: clientEmail },
      update: { name: clientName, phone: clientPhone, address: clientAddress },
      create: {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        address: clientAddress,
        status: "ACTIVE",
      },
    })

    const appointment = await this.prisma.appointment.create({
      data: {
        serviceDate,
        status: "PENDING",
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

    await this.email.sendAppointmentConfirmation(clientEmail, { clientName, serviceDate, serviceName })
    .catch(error => console.error('Erro ao enviar e-mail de confirmação', error))

    return { appointment }
  }
}
