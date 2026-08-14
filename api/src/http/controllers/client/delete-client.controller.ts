import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, Delete, HttpCode, NotFoundException, Param, UsePipes } from "@nestjs/common";
import z from "zod";

@Controller()
export class DeleteClient {
  constructor(private prisma: PrismaService)  {}

  @Delete('/client/:id')
  @HttpCode(204)
  async handle(@Param('id') id: string) {

    const clientAlreadyExists = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!clientAlreadyExists) {
      throw new NotFoundException(`Client não existe no banco ou ja foi apagado "${clientAlreadyExists}"`)
    }

    await this.prisma.client.delete({
      where: { id }
    })
  }
  
}