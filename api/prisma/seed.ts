import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Serviços
  const encanamento = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Encanamento", description: "Reparos, instalação e manutenção hidráulica" },
  })

  const eletrica = await prisma.service.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "Elétrica", description: "Instalação elétrica e reparos" },
  })

  const pintura = await prisma.service.upsert({
    where: { id: 3 },
    update: {},
    create: { name: "Pintura", description: "Pintura interna e externa" },
  })

  const servicosGerais = await prisma.service.upsert({
    where: { id: 4 },
    update: {},
    create: { name: "Serviços Gerais", description: "Manutenção e consertos diversos" },
  })

  // Funcionários
  const employees = await Promise.all([
    prisma.employee.upsert({
      where: { email: "carlos.silva@avila.com" },
      update: {},
      create: {
        name: "Carlos Silva",
        function: "Encanador",
        status: "ACTIVE",
        email: "carlos.silva@avila.com",
        phone: "(11) 91111-0001",
      },
    }),
    prisma.employee.upsert({
      where: { email: "marcos.souza@avila.com" },
      update: {},
      create: {
        name: "Marcos Souza",
        function: "Encanador",
        status: "ACTIVE",
        email: "marcos.souza@avila.com",
        phone: "(11) 91111-0002",
      },
    }),
    prisma.employee.upsert({
      where: { email: "roberto.lima@avila.com" },
      update: {},
      create: {
        name: "Roberto Lima",
        function: "Eletricista",
        status: "ACTIVE",
        email: "roberto.lima@avila.com",
        phone: "(11) 91111-0003",
      },
    }),
    prisma.employee.upsert({
      where: { email: "andre.costa@avila.com" },
      update: {},
      create: {
        name: "André Costa",
        function: "Eletricista",
        status: "VACATION",
        email: "andre.costa@avila.com",
        phone: "(11) 91111-0004",
      },
    }),
    prisma.employee.upsert({
      where: { email: "fernanda.oliveira@avila.com" },
      update: {},
      create: {
        name: "Fernanda Oliveira",
        function: "Pintora",
        status: "ACTIVE",
        email: "fernanda.oliveira@avila.com",
        phone: "(11) 91111-0005",
      },
    }),
    prisma.employee.upsert({
      where: { email: "paulo.santos@avila.com" },
      update: {},
      create: {
        name: "Paulo Santos",
        function: "Pintor",
        status: "ACTIVE",
        email: "paulo.santos@avila.com",
        phone: "(11) 91111-0006",
      },
    }),
    prisma.employee.upsert({
      where: { email: "diego.alves@avila.com" },
      update: {},
      create: {
        name: "Diego Alves",
        function: "Técnico Geral",
        status: "ACTIVE",
        email: "diego.alves@avila.com",
        phone: "(11) 91111-0007",
      },
    }),
  ])

  const [carlos, marcos, roberto, andre, fernanda, paulo, diego] = employees;

  // Vincula funcionários aos serviços (N:N via EmployeeService)
  const links = [
    { employeeId: carlos.id,   serviceId: encanamento.id },
    { employeeId: carlos.id,   serviceId: servicosGerais.id },
    { employeeId: marcos.id,   serviceId: encanamento.id },
    { employeeId: roberto.id,  serviceId: eletrica.id },
    { employeeId: roberto.id,  serviceId: servicosGerais.id },
    { employeeId: andre.id,    serviceId: eletrica.id },
    { employeeId: fernanda.id, serviceId: pintura.id },
    { employeeId: paulo.id,    serviceId: pintura.id },
    { employeeId: paulo.id,    serviceId: servicosGerais.id },
    { employeeId: diego.id,    serviceId: servicosGerais.id },
  ]

  for (const link of links) {
    await prisma.employeeService.upsert({
      where: { employeeId_serviceId: link },
      update: {},
      create: link,
    })
  }

  // Clientes
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { email: "maria.fernandes@gmail.com" },
      update: {},
      create: {
        name: "Maria Fernandes",
        email: "maria.fernandes@gmail.com",
        phone: "(11) 92222-0001",
        address: "Rua das Acácias, 120 - Vila Mariana, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "joao.pereira@gmail.com" },
      update: {},
      create: {
        name: "João Pereira",
        email: "joao.pereira@gmail.com",
        phone: "(11) 92222-0002",
        address: "Av. Paulista, 1500, apto 82 - Bela Vista, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "ana.beatriz@gmail.com" },
      update: {},
      create: {
        name: "Ana Beatriz Souza",
        email: "ana.beatriz@gmail.com",
        phone: "(11) 92222-0003",
        address: "Rua Voluntários da Pátria, 845 - Santana, São Paulo - SP",
        status: "INACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "ricardo.nunes@hotmail.com" },
      update: {},
      create: {
        name: "Ricardo Nunes",
        email: "ricardo.nunes@hotmail.com",
        phone: "(11) 92222-0004",
        address: "Rua Augusta, 2200 - Consolação, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "juliana.rocha@outlook.com" },
      update: {},
      create: {
        name: "Juliana Rocha",
        email: "juliana.rocha@outlook.com",
        phone: "(11) 92222-0005",
        address: "Alameda Santos, 450 - Jardim Paulista, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "fernando.melo@gmail.com" },
      update: {},
      create: {
        name: "Fernando Melo",
        email: "fernando.melo@gmail.com",
        phone: "(11) 92222-0006",
        address: "Rua Cardeal Arcoverde, 780 - Pinheiros, São Paulo - SP",
        status: "INACTIVE",
      },
    }),
  ])

  const [maria, joao, anaBeatriz, ricardo, juliana, fernando] = clients;

  // Orçamentos
  const budgets = [
    {
      id: 1,
      description: "Troca de tubulação hidráulica da cozinha",
      value: 850.0,
      date: new Date("2026-05-10"),
      status: "APPROVED" as const,
      clientId: maria.id,
      serviceId: encanamento.id,
    },
    {
      id: 2,
      description: "Instalação de quadro de disjuntores",
      value: 1200.5,
      date: new Date("2026-06-02"),
      status: "APPROVED" as const,
      clientId: joao.id,
      serviceId: eletrica.id,
    },
    {
      id: 3,
      description: "Pintura completa de apartamento 2 quartos",
      value: 3200.0,
      date: new Date("2026-07-01"),
      status: "PENDING" as const,
      clientId: ricardo.id,
      serviceId: pintura.id,
    },
    {
      id: 4,
      description: "Reparo de vazamento no banheiro social",
      value: 250.0,
      date: new Date("2026-07-20"),
      status: "PENDING" as const,
      clientId: anaBeatriz.id,
      serviceId: encanamento.id,
    },
    {
      id: 5,
      description: "Revisão geral da rede elétrica da casa",
      value: 4800.75,
      date: new Date("2026-08-05"),
      status: "PENDING" as const,
      clientId: juliana.id,
      serviceId: eletrica.id,
    },
    {
      id: 6,
      description: "Manutenção de portão e fechaduras",
      value: 180.9,
      date: new Date("2026-04-18"),
      status: "REJECTED" as const,
      clientId: fernando.id,
      serviceId: servicosGerais.id,
    },
    {
      id: 7,
      description: "Pintura de fachada externa",
      value: 5600.0,
      date: new Date("2026-09-12"),
      status: "PENDING" as const,
      clientId: maria.id,
      serviceId: pintura.id,
    },
    {
      id: 8,
      description: "Troca de fiação antiga do escritório",
      value: 999.99,
      date: new Date("2026-03-22"),
      status: "REJECTED" as const,
      clientId: ricardo.id,
      serviceId: eletrica.id,
    },
  ]

  for (const budget of budgets) {
    const { id, ...data } = budget
    await prisma.budget.upsert({
      where: { id },
      update: {},
      create: { id, ...data },
    })
  }

  // Agendamentos
  const appointments = [
    {
      id: "a1111111-0000-4000-8000-000000000001",
      clientId: maria.id,
      serviceId: encanamento.id,
      employeeId: carlos.id,
      status: "COMPLETED" as const,
      serviceDate: new Date("2026-05-12T09:00:00"),
      description: "Concluído sem intercorrências",
    },
    {
      id: "a1111111-0000-4000-8000-000000000002",
      clientId: joao.id,
      serviceId: eletrica.id,
      employeeId: roberto.id,
      status: "COMPLETED" as const,
      serviceDate: new Date("2026-06-05T14:00:00"),
      description: null,
    },
    {
      id: "a1111111-0000-4000-8000-000000000003",
      clientId: ricardo.id,
      serviceId: pintura.id,
      employeeId: fernanda.id,
      status: "IN_PROGRESS" as const,
      serviceDate: new Date("2026-07-25T08:00:00"),
      description: "Cliente pediu para priorizar a sala",
    },
    {
      id: "a1111111-0000-4000-8000-000000000004",
      clientId: anaBeatriz.id,
      serviceId: encanamento.id,
      employeeId: marcos.id,
      status: "CONFIRMED" as const,
      serviceDate: new Date("2026-08-02T10:30:00"),
      description: null,
    },
    {
      id: "a1111111-0000-4000-8000-000000000005",
      clientId: juliana.id,
      serviceId: eletrica.id,
      employeeId: andre.id,
      status: "CONFIRMED" as const,
      serviceDate: new Date("2026-08-10T13:00:00"),
      description: "Levar escada e multímetro",
    },
    {
      id: "a1111111-0000-4000-8000-000000000006",
      clientId: fernando.id,
      serviceId: servicosGerais.id,
      employeeId: diego.id,
      status: "PENDING" as const,
      serviceDate: new Date("2026-08-15T09:00:00"),
      description: null,
    },
    {
      id: "a1111111-0000-4000-8000-000000000007",
      clientId: maria.id,
      serviceId: pintura.id,
      employeeId: paulo.id,
      status: "PENDING" as const,
      serviceDate: new Date("2026-09-01T08:30:00"),
      description: "Aguardando confirmação de disponibilidade do cliente",
    },
    {
      id: "a1111111-0000-4000-8000-000000000008",
      clientId: ricardo.id,
      serviceId: eletrica.id,
      employeeId: undefined,
      status: "PENDING" as const,
      serviceDate: new Date("2026-09-05T11:00:00"),
      description: "Ainda sem funcionário designado",
    },
    {
      id: "a1111111-0000-4000-8000-000000000009",
      clientId: joao.id,
      serviceId: servicosGerais.id,
      employeeId: carlos.id,
      status: "CONFIRMED" as const,
      serviceDate: new Date("2026-07-30T15:00:00"),
      description: null,
    },
    {
      id: "a1111111-0000-4000-8000-000000000010",
      clientId: anaBeatriz.id,
      serviceId: pintura.id,
      employeeId: fernanda.id,
      status: "COMPLETED" as const,
      serviceDate: new Date("2026-02-14T09:00:00"),
      description: "Retrabalho de pintura da varanda",
    },
  ]

  for (const appointment of appointments) {
    const { id, ...data } = appointment
    await prisma.appointment.upsert({
      where: { id },
      update: {},
      create: { id, ...data },
    })
  }

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
