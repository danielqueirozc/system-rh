import { PrismaService } from "@/database/prisma/prisma.service";
import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import z from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { compare } from "bcryptjs";

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

type AuthenticateBodyType = z.infer<typeof bodySchema>

@Controller()
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post('/sessions')
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body:AuthenticateBodyType) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new UnauthorizedException('user credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('user credentials do not match.')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: accessToken
    }
  } 
}