import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'

describe('Service (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    await prisma.service.create({
      data: { name: 'Encanamento', description: 'Reparos, instalação e manutenção hidráulica' },
    })
  })

  test('[GET] /service', async () => {
    const response = await request(app.getHttpServer()).get('/service')

    expect(response.statusCode).toBe(200)
    expect(response.body.services.length).toBeGreaterThan(0)
  })
})
