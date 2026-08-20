import { PrismaService } from "@/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { Body, Controller, HttpCode, NotFoundException, Param, Patch, UsePipes } from "@nestjs/common";
import z from "zod";

const bodySchema = z.object({
  id: z.number(),
  status: z.enum(['PENDING','APPROVED','REJECTED'])
})

type ChangeStatusType = z.infer<typeof bodySchema>

@Controller()
export class ChangeStatus {
  constructor(private prisma: PrismaService) {}

  @Patch('/budget')
  @UsePipes(new ZodValidationPipe(bodySchema))
  @HttpCode(200)
  async handle(@Body() body: ChangeStatusType) {
    const { id, status } = body

    const budgetAlreadyExists = await this.prisma.budget.findUnique({
      where: { id }
    })

    if (!budgetAlreadyExists) {
      throw new NotFoundException(`Budget "${id}" não existe no banco`)
    }

    const budget = await this.prisma.budget.update({
      where: { id },
      data: {
        status
      }
    })

    return { budget }
  }
} 