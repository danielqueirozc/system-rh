import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, NotFoundException, Put, UsePipes } from "@nestjs/common";
import z from "zod";

const bodySchema = z.object({
  id: z.string(),
  name: z.string(),
  function: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.enum(['ACTIVE', 'VACATION', 'INACTIVE'])
})

type EditEmployeeType = z.infer<typeof bodySchema>

@Controller()
export class EditEmployee {
  constructor(private prisma: PrismaService) {}

  @Put('/employee')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: EditEmployeeType) {
    const { id, name, email, phone, function: employeeFunction, status } = body

    const employeeAlreadyExists = await this.prisma.employee.findUnique({
      where: { id }
    })

    if (!employeeAlreadyExists) {
      throw new NotFoundException(`Employee nao encontrado`)
    }

    const employee = await this.prisma.employee.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        function: employeeFunction,
        status
      }
    })

    return { employee }
  }
}