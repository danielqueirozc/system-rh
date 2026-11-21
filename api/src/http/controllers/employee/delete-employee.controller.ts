import { Roles } from "@/auth/roles.decorator";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Controller, Delete, HttpCode, NotFoundException, Param } from "@nestjs/common";

@Controller()
export class DeleteEmployee {
  constructor(private prisma: PrismaService) {}

  @Roles('ADMIN')
  @Delete('/employee/:id')
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const employeeAlreadyExists = await this.prisma.employee.findUnique({
        where: { id }
    })

    if (!employeeAlreadyExists) {
        throw new NotFoundException(`Employee not found, ${id}`)
    }

    await this.prisma.employeeService.deleteMany({ where: { employeeId: id } })

    await this.prisma.employee.delete({
      where: { id },
    })
  }
}