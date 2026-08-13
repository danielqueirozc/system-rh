import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'


describe('Create Client (e2e)', () => {
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

    test('[POST] /client', async () => {
      const response = await request(app.getHttpServer()).post('/client').send({
        name: 'boris',
        email: 'boris@gmail.com',
        phone: '45335830',
        address: 'Rua dos alfinetes 124'
      })

      expect(response.statusCode).toBe(201)
    })
})