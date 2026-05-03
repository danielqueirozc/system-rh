import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Serviços
  const encanamento = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Encanamento", description: "Reparos, instalação e manutenção hidráulica" },
  });

  const eletrica = await prisma.service.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "Elétrica", description: "Instalação elétrica e reparos" },
  });

  const pintura = await prisma.service.upsert({
    where: { id: 3 },
    update: {},
    create: { name: "Pintura", description: "Pintura interna e externa" },
  });

  const servicosGerais = await prisma.service.upsert({
    where: { id: 4 },
    update: {},
    create: { name: "Serviços Gerais", description: "Manutenção e consertos diversos" },
  });

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
  ]);

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
  ];

  for (const link of links) {
    await prisma.employeeService.upsert({
      where: { employeeId_serviceId: link },
      update: {},
      create: link,
    });
  }

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
