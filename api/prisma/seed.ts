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

  const marcenaria = await prisma.service.upsert({
    where: { id: 5 },
    update: {},
    create: { name: "Marcenaria", description: "Fabricação e reparo de móveis planejados e estruturas de madeira" },
  })

  const jardinagem = await prisma.service.upsert({
    where: { id: 6 },
    update: {},
    create: { name: "Jardinagem", description: "Manutenção de jardins, poda de árvores e paisagismo" },
  })

  const limpezaPosObra = await prisma.service.upsert({
    where: { id: 7 },
    update: {},
    create: { name: "Limpeza Pós-obra", description: "Limpeza pesada e remoção de entulho após reformas e construções" },
  })

  const arCondicionado = await prisma.service.upsert({
    where: { id: 8 },
    update: {},
    create: { name: "Ar-condicionado", description: "Instalação, manutenção e higienização de aparelhos de ar-condicionado" },
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
    prisma.employee.upsert({
      where: { email: "juliana.martins@avila.com" },
      update: {},
      create: {
        name: "Juliana Martins",
        function: "Marceneira",
        status: "ACTIVE",
        email: "juliana.martins@avila.com",
        phone: "(11) 91111-0008",
      },
    }),
    prisma.employee.upsert({
      where: { email: "bruno.tavares@avila.com" },
      update: {},
      create: {
        name: "Bruno Tavares",
        function: "Marceneiro",
        status: "ACTIVE",
        email: "bruno.tavares@avila.com",
        phone: "(11) 91111-0009",
      },
    }),
    prisma.employee.upsert({
      where: { email: "camila.ribeiro@avila.com" },
      update: {},
      create: {
        name: "Camila Ribeiro",
        function: "Jardineira",
        status: "ACTIVE",
        email: "camila.ribeiro@avila.com",
        phone: "(11) 91111-0010",
      },
    }),
    prisma.employee.upsert({
      where: { email: "rafael.barbosa@avila.com" },
      update: {},
      create: {
        name: "Rafael Barbosa",
        function: "Técnico de Ar-condicionado",
        status: "ACTIVE",
        email: "rafael.barbosa@avila.com",
        phone: "(11) 91111-0011",
      },
    }),
    prisma.employee.upsert({
      where: { email: "sandra.nogueira@avila.com" },
      update: {},
      create: {
        name: "Sandra Nogueira",
        function: "Auxiliar de Limpeza Pós-obra",
        status: "INACTIVE",
        email: "sandra.nogueira@avila.com",
        phone: "(11) 91111-0012",
      },
    }),
    prisma.employee.upsert({
      where: { email: "thiago.correia@avila.com" },
      update: {},
      create: {
        name: "Thiago Correia",
        function: "Eletricista",
        status: "ACTIVE",
        email: "thiago.correia@avila.com",
        phone: "(11) 91111-0013",
      },
    }),
  ])

  const [
    carlos, marcos, roberto, andre, fernanda, paulo, diego,
    julianaMartins, bruno, camila, rafael, sandra, thiago,
  ] = employees;

  // Vincula funcionários aos serviços (N:N via EmployeeService)
  const links = [
    { employeeId: carlos.id,         serviceId: encanamento.id },
    { employeeId: carlos.id,         serviceId: servicosGerais.id },
    { employeeId: marcos.id,         serviceId: encanamento.id },
    { employeeId: roberto.id,        serviceId: eletrica.id },
    { employeeId: roberto.id,        serviceId: servicosGerais.id },
    { employeeId: andre.id,          serviceId: eletrica.id },
    { employeeId: fernanda.id,       serviceId: pintura.id },
    { employeeId: paulo.id,          serviceId: pintura.id },
    { employeeId: paulo.id,          serviceId: servicosGerais.id },
    { employeeId: diego.id,          serviceId: servicosGerais.id },
    { employeeId: diego.id,          serviceId: limpezaPosObra.id },
    { employeeId: julianaMartins.id, serviceId: marcenaria.id },
    { employeeId: bruno.id,          serviceId: marcenaria.id },
    { employeeId: bruno.id,          serviceId: servicosGerais.id },
    { employeeId: camila.id,         serviceId: jardinagem.id },
    { employeeId: rafael.id,         serviceId: arCondicionado.id },
    { employeeId: sandra.id,         serviceId: limpezaPosObra.id },
    { employeeId: thiago.id,         serviceId: eletrica.id },
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
    prisma.client.upsert({
      where: { email: "patricia.gomes@gmail.com" },
      update: {},
      create: {
        name: "Patrícia Gomes",
        email: "patricia.gomes@gmail.com",
        phone: "(11) 92222-0007",
        address: "Rua Harmonia, 320 - Sumaré, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "eduardo.martins@hotmail.com" },
      update: {},
      create: {
        name: "Eduardo Martins",
        email: "eduardo.martins@hotmail.com",
        phone: "(11) 92222-0008",
        address: "Rua dos Pinheiros, 900 - Pinheiros, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "camila.duarte@gmail.com" },
      update: {},
      create: {
        name: "Camila Duarte",
        email: "camila.duarte@gmail.com",
        phone: "(11) 92222-0009",
        address: "Av. Rebouças, 3200 - Pinheiros, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "bruno.azevedo@outlook.com" },
      update: {},
      create: {
        name: "Bruno Azevedo",
        email: "bruno.azevedo@outlook.com",
        phone: "(11) 92222-0010",
        address: "Rua Teodoro Sampaio, 1120 - Pinheiros, São Paulo - SP",
        status: "INACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "larissa.cardoso@gmail.com" },
      update: {},
      create: {
        name: "Larissa Cardoso",
        email: "larissa.cardoso@gmail.com",
        phone: "(11) 92222-0011",
        address: "Rua Girassol, 210 - Vila Madalena, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
    prisma.client.upsert({
      where: { email: "marcelo.teixeira@hotmail.com" },
      update: {},
      create: {
        name: "Marcelo Teixeira",
        email: "marcelo.teixeira@hotmail.com",
        phone: "(11) 92222-0012",
        address: "Rua Cardoso de Almeida, 560 - Perdizes, São Paulo - SP",
        status: "ACTIVE",
      },
    }),
  ])

  const [
    maria, joao, anaBeatriz, ricardo, julianaRocha, fernando,
    patricia, eduardo, camilaDuarte, brunoAzevedo, larissa, marcelo,
  ] = clients;

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
      clientId: julianaRocha.id,
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
    {
      id: 9,
      description: "Fabricação de armário planejado para cozinha",
      value: 6200.0,
      date: new Date("2026-06-15"),
      status: "APPROVED" as const,
      clientId: patricia.id,
      serviceId: marcenaria.id,
    },
    {
      id: 10,
      description: "Poda de árvores e manutenção geral do jardim",
      value: 780.0,
      date: new Date("2026-07-05"),
      status: "PENDING" as const,
      clientId: eduardo.id,
      serviceId: jardinagem.id,
    },
    {
      id: 11,
      description: "Limpeza pós-obra de apartamento reformado",
      value: 950.0,
      date: new Date("2026-08-01"),
      status: "PENDING" as const,
      clientId: camilaDuarte.id,
      serviceId: limpezaPosObra.id,
    },
    {
      id: 12,
      description: "Instalação de 2 aparelhos de ar-condicionado split",
      value: 2400.0,
      date: new Date("2026-08-12"),
      status: "APPROVED" as const,
      clientId: brunoAzevedo.id,
      serviceId: arCondicionado.id,
    },
    {
      id: 13,
      description: "Reforma de deck de madeira na varanda",
      value: 3100.5,
      date: new Date("2026-09-01"),
      status: "PENDING" as const,
      clientId: larissa.id,
      serviceId: marcenaria.id,
    },
    {
      id: 14,
      description: "Manutenção preventiva de 4 aparelhos de ar-condicionado",
      value: 890.0,
      date: new Date("2026-05-28"),
      status: "REJECTED" as const,
      clientId: marcelo.id,
      serviceId: arCondicionado.id,
    },
    {
      id: 15,
      description: "Instalação de gramado sintético no quintal",
      value: 4500.0,
      date: new Date("2026-09-20"),
      status: "PENDING" as const,
      clientId: patricia.id,
      serviceId: jardinagem.id,
    },
    {
      id: 16,
      description: "Limpeza pesada de terreno após demolição",
      value: 1750.25,
      date: new Date("2026-04-10"),
      status: "REJECTED" as const,
      clientId: eduardo.id,
      serviceId: limpezaPosObra.id,
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
      clientId: julianaRocha.id,
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
    {
      id: "a1111111-0000-4000-8000-000000000011",
      clientId: patricia.id,
      serviceId: marcenaria.id,
      employeeId: julianaMartins.id,
      status: "CONFIRMED" as const,
      serviceDate: new Date("2026-08-20T09:00:00"),
      description: "Levar medidas finais do armário",
    },
    {
      id: "a1111111-0000-4000-8000-000000000012",
      clientId: eduardo.id,
      serviceId: jardinagem.id,
      employeeId: camila.id,
      status: "COMPLETED" as const,
      serviceDate: new Date("2026-06-10T08:00:00"),
      description: "Poda concluída, jardim aparado",
    },
    {
      id: "a1111111-0000-4000-8000-000000000013",
      clientId: camilaDuarte.id,
      serviceId: limpezaPosObra.id,
      employeeId: sandra.id,
      status: "PENDING" as const,
      serviceDate: new Date("2026-08-25T07:30:00"),
      description: null,
    },
    {
      id: "a1111111-0000-4000-8000-000000000014",
      clientId: brunoAzevedo.id,
      serviceId: arCondicionado.id,
      employeeId: rafael.id,
      status: "IN_PROGRESS" as const,
      serviceDate: new Date("2026-08-18T10:00:00"),
      description: "Instalando unidade externa",
    },
    {
      id: "a1111111-0000-4000-8000-000000000015",
      clientId: larissa.id,
      serviceId: marcenaria.id,
      employeeId: bruno.id,
      status: "CONFIRMED" as const,
      serviceDate: new Date("2026-09-05T13:30:00"),
      description: null,
    },
    {
      id: "a1111111-0000-4000-8000-000000000016",
      clientId: marcelo.id,
      serviceId: arCondicionado.id,
      employeeId: rafael.id,
      status: "COMPLETED" as const,
      serviceDate: new Date("2026-05-30T09:00:00"),
      description: "Manutenção realizada em 4 unidades",
    },
    {
      id: "a1111111-0000-4000-8000-000000000017",
      clientId: patricia.id,
      serviceId: jardinagem.id,
      employeeId: camila.id,
      status: "PENDING" as const,
      serviceDate: new Date("2026-09-22T08:00:00"),
      description: "Aguardando aprovação do orçamento",
    },
    {
      id: "a1111111-0000-4000-8000-000000000018",
      clientId: eduardo.id,
      serviceId: limpezaPosObra.id,
      employeeId: undefined,
      status: "PENDING" as const,
      serviceDate: new Date("2026-08-30T07:00:00"),
      description: "Sem funcionário disponível ainda",
    },
    {
      id: "a1111111-0000-4000-8000-000000000019",
      clientId: julianaRocha.id,
      serviceId: servicosGerais.id,
      employeeId: thiago.id,
      status: "CONFIRMED" as const,
      serviceDate: new Date("2026-08-05T14:00:00"),
      description: "Troca de fiação combinada por telefone",
    },
    {
      id: "a1111111-0000-4000-8000-000000000020",
      clientId: fernando.id,
      serviceId: eletrica.id,
      employeeId: thiago.id,
      status: "COMPLETED" as const,
      serviceDate: new Date("2026-03-15T11:00:00"),
      description: "Substituição de disjuntores antigos",
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
