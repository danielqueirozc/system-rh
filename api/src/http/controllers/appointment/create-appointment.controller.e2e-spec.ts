import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'

describe("Create Appointment", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    const service = await prisma.service.create({
      data: { name: 'Pintura', description: 'Pintura interna e externa' },
    })

    const employee = await prisma.employee.create({
      data: {
        name: 'Fernanda Oliveira',
        function: 'Pintora',
        status: 'ACTIVE',
        email: 'fernanda.oliveira@avila.com',
        phone: '(11) 91111-0005',
      },
    })

    await prisma.employeeService.create({
      data: { employeeId: employee.id, serviceId: service.id },
    })
  })

  test('[POST] /appointment', async () => {
    const response = await request(app.getHttpServer()).post('/appointment').send({
      serviceName: 'Pintura',
      serviceDate: new Date(),
      clientName: 'Thiago',
      clientEmail: 'thiago@test.com',
      clientPhone: '40028922',
      clientAddress: 'Rua 1',
    })

    expect(response.statusCode).toBe(201)
  })
})
