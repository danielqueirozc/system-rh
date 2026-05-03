import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'
import { number } from "zod"

describe("Create Budget", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /budget', async () => {
     const client = await prisma.client.create({
      data: {
       name: 'John Doe',
       email: 'johndoe@gmail.com',
       phone: '40028922',
       address: 'Rua 1',
       status: 'ACTIVE'
      },
    })

    const service = await prisma.service.create({
      data: { name: 'Pintura', description: 'Pintura interna e externa' },
    })

    const budget = await request(app.getHttpServer()).post('/budget').send({
      description: 'pintar todos os comodos da casa',
      value: 8000,
      date: new Date(),
      clientId: client.id,
      serviceId: service.id,
    })

    expect(budget.statusCode).toBe(201)
    expect(budget.body).toEqual({
      budgetId: 1
    })
  })
})
