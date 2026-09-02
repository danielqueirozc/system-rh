import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'
import { number } from "zod"

describe("Budget", () => {
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
       name: 'Maria Silva',
       email: 'maria.silva@gmail.com',
       phone: '40028933',
       address: 'Rua 2',
       status: 'ACTIVE'
      },
    })

    const service = await prisma.service.create({
      data: { name: 'Pintura', description: 'Pintura interna e externa' },
    })

    const employee = await prisma.employee.create({
      data: {
        name: 'Roberto Alves',
        function: 'Pintor',
        status: 'ACTIVE',
        email: 'roberto.alves@avila.com',
        phone: '(11) 91111-0006',
      },
    })

    const budget = await request(app.getHttpServer()).post('/budget').send({
      description: 'pintar todos os comodos da casa',
      value: 8000,
      date: new Date(),
      clientId: client.id,
      serviceId: service.id,
      employeeId: employee.id,
    })

    expect(budget.statusCode).toBe(201)
    expect(budget.body.budget).toMatchObject({
      description: 'pintar todos os comodos da casa',
      client: { name: 'Maria Silva' },
      service: { name: 'Pintura' },
    })
  })

  test('[PATCH] /budget', async () => {
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

    const employee = await prisma.employee.create({
      data: {
        name: 'Fernanda Oliveira',
        function: 'Pintora',
        status: 'ACTIVE',
        email: 'fernanda.oliveira@avila.com',
        phone: '(11) 91111-0005',
      },
    })

    const budget = await prisma.budget.create({
      data: {
        description: 'pintar todos os comodos da casa',
        value: 8000,
        date: new Date(),
        status: 'PENDING',
        clientId: client.id,
        serviceId: service.id,
        employeeId: employee.id,
        employeeName: employee.name,
      }
    })

    const changeStatus = await request(app.getHttpServer()).patch('/budget').send({
      id: budget.id,
      status: 'APPROVED'
    })

    expect(changeStatus.statusCode).toBe(200)
    expect(changeStatus.body.budget).toMatchObject({
      status: 'APPROVED'
    })
  })
})
