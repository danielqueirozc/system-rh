import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { hash } from "bcryptjs";
import { PrismaService } from "@/database/prisma/prisma.service";

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

type CreateAccountType = z.infer<typeof bodySchema>

@Controller()
export class CreateAccount {
  constructor(private prisma: PrismaService) {}

  @Post('/accounts')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body:CreateAccountType ) {
    const { name, email, password } = body

    const userWithSameEmail = this.prisma.user.findUnique({
      where: { email }
    })

    if (!userWithSameEmail) {
       throw new ConflictException('User with same email adress already exists.')
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  }
}