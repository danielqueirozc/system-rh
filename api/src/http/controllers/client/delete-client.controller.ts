import type { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, Delete, HttpCode, NotFoundException, UsePipes } from "@nestjs/common";
import z from "zod";

const zodSchema = z.object({
  id: z.string()
})

type DeleteClientType = z.infer<typeof zodSchema>

@Controller()
export class DeleteClient {
  constructor(private prisma: PrismaService)  {}

  @Delete('/client')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(zodSchema))
  async handle(@Body() body: DeleteClientType) {
    const { id } = body

    const clientAlreadyExists = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!clientAlreadyExists) {
      throw new NotFoundException(`Client não existe no banco ou ja foi apagado "${clientAlreadyExists}"`)
    }

    const client = await this.prisma.client.delete({
      where: {id}
    })
  }
  
}