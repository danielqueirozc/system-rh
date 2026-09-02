import { PrismaService } from "@/database/prisma/prisma.service";
import { Body, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";

const bodySchema = z.object({
  description: z.string(),
  value: z.number().positive(),
  date: z.coerce.date(),
  clientId: z.string().uuid(),
  serviceId: z.number().int(),
  employeeId: z.string().uuid(),
})

type CreateBudgetType = z.infer<typeof bodySchema>

@Controller()
export class CreateBudget {
  constructor(private prisma: PrismaService) {}
  
  @Post('/budget')
  @UsePipes(new ZodValidationPipe(bodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateBudgetType) {
    const { description, value, date, clientId, serviceId, employeeId } = body

    console.log(body)

    const client = await this.prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      throw new NotFoundException(`Nenhum cliente encontrado "${client}"`)
    }

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId }
    })

     if (!service) {
      throw new NotFoundException(`Nenhum serviço encontrado "${service}"`)
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId }
    })

    if (!employee) {
      throw new NotFoundException(`Nenhum funcionário encontrado "${employeeId}"`)
    }

    const budget = await this.prisma.budget.create({
      data: {
        description,
        value,
        date,
        status: 'PENDING',
        employeeName: employee.name,
        client: { connect: { id: client.id } },
        service: { connect: { id: service.id } },
        employee: { connect: { id: employee.id, } },
      },
      include: {
        client: { select: { name: true } },
        service: { select: { name: true } },
      },
    })

    return { budget }
  }
}
