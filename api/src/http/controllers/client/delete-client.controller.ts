import { Roles } from "@/auth/roles.decorator";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Delete, HttpCode, NotFoundException, Param } from "@nestjs/common";

@Controller()
export class DeleteClient {
  constructor(private prisma: PrismaService)  {}

  @Roles('ADMIN')
  @Delete('/client/:id')
  @HttpCode(204)
  async handle(@Param('id') id: string) {

    const clientAlreadyExists = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!clientAlreadyExists) {
      throw new NotFoundException(`Client não existe no banco ou ja foi apagado, id: ${id}`)
    }

    await this.prisma.client.delete({
      where: { id }
    })
  }
  
}