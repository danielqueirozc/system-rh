import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Delete, HttpCode, NotFoundException, Param } from "@nestjs/common";

@Controller()
export class DeleteEmployee {
  constructor(private prisma: PrismaService) {}

  @Delete('/employee/:id')
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const employeeAlreadyExists = await this.prisma.employee.findUnique({
        where: { id }
    })
  
    if (!employeeAlreadyExists) {
        throw new NotFoundException(`Employee não existe no banco ou ja foi apagado "${employeeAlreadyExists}"`)
    }

    await this.prisma.employee.delete({
      where: { id }
    })
  }
}