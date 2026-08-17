import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, NotFoundException, Put, UsePipes } from "@nestjs/common";
import z from "zod";

const bodySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE'])
})

type EditClientType = z.infer<typeof bodySchema>

@Controller()
export class EditClient {
  constructor(private prisma: PrismaService) {}

  @Put('/client')
  @UsePipes(new ZodValidationPipe(bodySchema))
  @HttpCode(200)
  async handle(@Body() body: EditClientType) {
    const { id, name, email, phone, address, status } = body

     const clientAlreadyExists = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!clientAlreadyExists) {
      throw new NotFoundException(`Client "${id}" não existe no banco`)
    }

    const client = await this.prisma.client.update({
      where: { id },
      data: { name, email, phone, address, status }
    })

  
  return { client }

  }
}