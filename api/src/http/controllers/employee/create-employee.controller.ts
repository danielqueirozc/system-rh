import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import z from "zod";

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  function: z.string(),
})

type CreateEmployeeType = z.infer<typeof bodySchema>

@Controller()
export class CreateEmployee {
  constructor(private prisma: PrismaService) {}

  @Post('/employee')
  @UsePipes(new ZodValidationPipe(bodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateEmployeeType) {
    const { name, email, phone, function: employeeFunction } = body
    const employeeAlreadyExists = await this.prisma.employee.findUnique({
      where: { email }
    })

    if(employeeAlreadyExists) {
      throw new NotFoundException(`Client já criado "${employeeAlreadyExists.id}"`)
    }

    const employee = await this.prisma.employee.create({
      data: {
        name,
        email,
        phone,
        function: employeeFunction,
        status: 'ACTIVE'
      }
    })

    return { employee }
  }
}