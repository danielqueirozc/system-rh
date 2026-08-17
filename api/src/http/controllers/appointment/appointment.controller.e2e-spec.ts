import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'

describe("Appointment", () => {
  let app: INestApplication
  let prisma: PrismaService
  let service: Awaited<ReturnType<PrismaService['service']['create']>>
  let employee: Awaited<ReturnType<PrismaService['employee']['create']>>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    service = await prisma.service.create({
      data: { name: 'Pintura', description: 'Pintura interna e externa' },
    })

    employee = await prisma.employee.create({
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

    test('[PUT] /appointment', async () => {
    const client = await prisma.client.create({
      data: {
        name: 'Roberto',
        email: 'roberto@test.com',
        phone: '40099999',
        address: 'Rua 2',
        status: 'ACTIVE',
      },
    })

    const appointment = await prisma.appointment.create({
      data: {
        clientId: client.id,
        serviceId: service.id,
        employeeId: employee.id,
        status: 'PENDING',
        serviceDate: new Date(),
      },
    })

    const response = await request(app.getHttpServer()).put('/appointment').send({
      id: appointment.id,
      status: 'CONFIRMED',
      date: new Date(),
      description: 'Confirmado por telefone',
    })

    expect(response.statusCode).toBe(200)
  })
})
