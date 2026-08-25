import { AppModule } from '@/app.module'
import { PrismaService } from '@/database/prisma/prisma.service'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
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

  test('[POST] /accounts as ADMIN', async () => {
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@avila.com',
        password: await hash('1234567', 8),
        role: 'ADMIN',
      },
    })

    const session = await request(app.getHttpServer()).post('/sessions').send({
      email: 'admin@avila.com',
      password: '1234567',
    })

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${session.body.access_token}`)
      .send({
        name: 'John Snow',
        email: 'johnsnow000@gmail.com',
        password: '1234567',
        role: 'EMPLOYEE',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.user.password).toBeUndefined()

    const userOnDatabase = await prisma.user.findUnique({
      where: { email: 'johnsnow000@gmail.com' }
    })
    expect(userOnDatabase).toBeTruthy()
  })

  test('[POST] /accounts as EMPLOYEE is forbidden', async () => {
    await prisma.user.create({
      data: {
        name: 'Regular User',
        email: 'employee@avila.com',
        password: await hash('1234567', 8),
        role: 'EMPLOYEE',
      },
    })

    const session = await request(app.getHttpServer()).post('/sessions').send({
      email: 'employee@avila.com',
      password: '1234567',
    })

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${session.body.access_token}`)
      .send({
        name: 'Someone Else',
        email: 'someoneelse@gmail.com',
        password: '1234567',
        role: 'EMPLOYEE',
      })

    expect(response.statusCode).toBe(403)
  })

  test('[POST] /accounts without a token is unauthorized', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'No Auth',
      email: 'noauth@gmail.com',
      password: '1234567',
      role: 'EMPLOYEE',
    })

    expect(response.statusCode).toBe(401)
  })
})