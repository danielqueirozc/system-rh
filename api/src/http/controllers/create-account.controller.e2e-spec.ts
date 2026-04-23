import { AppModule } from '@/app.module'
import { PrismaService } from '@/database/prisma/prisma.service'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create Account (e2e)', () => {
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

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Snow',
      email: 'johnsnow9@gmail.com',
      password: '1234567',
    })

    expect(response.statusCode).toBe(201)
    
    const userOnDatabase = prisma.user.findUnique({
      where: { email: 'johnsnow9@gmail.com' }
    })
    expect(userOnDatabase).toBeTruthy()
  })
})