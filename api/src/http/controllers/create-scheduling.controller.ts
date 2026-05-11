import { PrismaService } from "@/database/prisma/prisma.service";
import { Body, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const bodySchema = z.object({
  serviceName: z.string(),
  serviceDate: z.coerce.date(),
  clientName: z.string(),
  clientEmail: z.email(),
  clientPhone: z.string(),
  clientAddress: z.string(),
})

type CreateSchedulingType = z.infer<typeof bodySchema>

@Controller()
export class CreateScheduling {
  constructor(private prisma: PrismaService) {}

  @Post("/scheduling")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: CreateSchedulingType) {
    const { serviceName, serviceDate, clientName, clientEmail, clientPhone, clientAddress } = body;

    // 1. Busca o serviço pelo nome — ele já deve existir no banco
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
        // some: pelo menos um registro em employee_servicesque que aponte para este serviceId
        some: {
          serviceId: service.id,
        },
      },
    },
    })

    if (!employee) {
      throw new NotFoundException(`Nenhum funcionário disponivel para "${serviceName}"`)
    }
    // cria o cliente se não existir, ou atualiza se ja existir
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

    // cria o agendamento conectando cliente e serviço pelos IDs
    const scheduling = await this.prisma.scheduling.create({
      data: {
        serviceDate,
        status: "PENDING",
        client: { connect: { id: client.id } },
        service: { connect: { id: service.id } },
        employee: { connect: { id: employee.id } },
      },
    })

    return { schedulingId: scheduling.id };
  }
}
