import { AppModule } from "@/app.module"
import { PrismaService } from "@/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from 'supertest'

describe("Employee", () => {
  let app: INestApplication
  let prisma: PrismaService
  // let service: Awaited<ReturnType<PrismaService['service']['create']>>
  // let employee: Awaited<ReturnType<PrismaService['employee']['create']>>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()

    // service = await prisma.service.create({
    //   data: { name: 'Pintura', description: 'Pintura interna e externa' },
    // })

    // employee = await prisma.employee.create({
    //   data: {
    //     name: 'Fernanda Oliveira',
    //     function: 'Pintora',
    //     status: 'ACTIVE',
    //     email: 'fernanda.oliveira@avila.com',
    //     phone: '(11) 91111-0005',
    //   },
    // })

    // await prisma.employeeService.create({
    //   data: { employeeId: employee.id, serviceId: service.id },
    // })
  })

  test('[POST] /employee', async () => {
    const response = await request(app.getHttpServer()).post('/employee').send({
      name: 'Mario Kart',
      email: 'mario@kart.com',
      phone: '40028921',
      function: 'Encanador',
      status: 'ACTIVE'
    })

    expect(response.statusCode).toBe(201)
  })

  test('[PUT] /employee', async () => {
    const createEmployee = await prisma.employee.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        phone: '40028922',
        function: 'Pintor',
        status: 'ACTIVE',
      }
    })

    const response = await request(app.getHttpServer()).put('/employee').send({
      id: createEmployee.id,
      name: 'John Doe Editado',
      email: 'john@doe.com',
      phone: '40028922',
      function: 'Eletricista',
      status: 'VACATION',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.employee).toMatchObject({
      name: 'John Doe Editado',
      function: 'Eletricista',
      status: 'VACATION',
    })
  })

  test('[DELETE] /employee', async () => {
    const employee = await prisma.employee.create({
      data: {
        name: 'John Doe',
        email: 'john@doee.com',
        phone: '40028927',
        function: 'Pintor',
        status: 'ACTIVE',
      }
    })

    const response = await request(app.getHttpServer()).delete(`/employee/${employee.id}`)
    expect(response.statusCode).toBe(204)
  })
})
