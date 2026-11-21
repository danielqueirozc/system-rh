import { PrismaService } from "@/database/prisma/prisma.service";
import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";

const zodSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
})

type CreateClientType = z.infer<typeof zodSchema>

@Controller()
export class CreateClient {
  constructor(private prisma: PrismaService) {}

  @Post('/client')
  @UsePipes(new ZodValidationPipe(zodSchema))
  @HttpCode(201)
  async handle(@Body() body: CreateClientType) {
    const { name, email, phone, address } = body

    const clientAlreadyExists = await this.prisma.client.findUnique({
      where: { email }
    })

    if (clientAlreadyExists) {
      throw new ConflictException(`Client já criado`)
    }

    const client = await this.prisma.client.create({
      data: {
        name,
        email,
        phone,
        address,
      }
    })

    return { client }
  }
}