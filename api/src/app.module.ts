import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './http/filters/prisma-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule
  ],
  providers: [
    // filtro global: traduz erros do Prisma (P2002, P2003, P2025) em respostas http
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
  ]
})
export class AppModule {}
