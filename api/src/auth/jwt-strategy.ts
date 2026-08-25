import type { Env } from "@/env";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import z from "zod";

const tokenSchema = z.object({
  sub: z.string().uuid()
})

export type TokenType = z.infer<typeof tokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>, private prisma: PrismaService) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: unknown) {
    const { sub } = tokenSchema.parse(payload)

    const user = await this.prisma.user.findUnique({ where: { id: sub } })

    if (!user) {
      throw new UnauthorizedException()
    }

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}