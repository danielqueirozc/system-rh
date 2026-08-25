import { Body, ConflictException, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "@/http/pipes/zod-validation-pipe";
import { hash } from "bcryptjs";
import { PrismaService } from "@/database/prisma/prisma.service";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Roles } from "@/auth/roles.decorator";

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['ADMIN', 'EMPLOYEE']),
  employeeId: z.string().uuid().optional(),
})

type CreateAccountType = z.infer<typeof bodySchema>

@Controller()
export class CreateAccount {
  constructor(private prisma: PrismaService) {}

  @Post('/accounts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body:CreateAccountType ) {
    const { name, email, password, role, employeeId } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email }
    })

    if (userWithSameEmail) {
       throw new ConflictException('User with same email adress already exists.')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        employeeId,
      }
    })

    const { password: _, ...userWithoutPassword } = user

    return { user: userWithoutPassword }
  }
}