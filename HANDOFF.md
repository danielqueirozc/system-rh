# Handoff — soft delete de funcionários

Notas de continuação pra retomar em outra máquina.

## Feito

1. `Employee.deletedAt DateTime?` adicionado ao `schema.prisma`, migration `20260831155124_add_deleted_at_to_employee` já aplicada.
2. `delete-employee.controller.ts`: não apaga mais a linha de verdade — faz `update` setando `deletedAt`. Diferencia "não existe" (404) de "já foi apagado" (404, mensagem diferente).
3. `get-employees.controller.ts` (`GET /employee`) foi reescrito: em vez de listar todos os funcionários, agrega orçamentos aprovados por funcionário e retorna `{ employeePerformance: [{ employee, completedServices }] }`.
4. Frontend (`employee-stores.ts`, `@types/index.ts`, `employees/page.tsx`) já foi atualizado pra consumir esse novo formato — a tela de Funcionários usa `emp.employee.*` em vez de `emp.*`.
5. Os 3 dropdowns "Selecione o funcionário" (`users/page.tsx`, `appointment-form-dialog.tsx`, `budget-form-dialog.tsx`) foram corrigidos pra também usar `e.employee.id`/`e.employee.name`.

## Falta / decisão pendente

**Problema real encontrado**: `GET /employee` agora só retorna funcionários que têm **pelo menos um orçamento aprovado** (porque a query parte de `budget.findMany`, não de `employee.findMany`). Isso quebra dois fluxos:

- Um funcionário novo, sem orçamento nenhum ainda, não aparece na tela de Funcionários.
- Os dropdowns "Selecione o funcionário" (criar agendamento, criar orçamento, vincular usuário) também não vão listar esse funcionário — ou seja, hoje não dá pra atribuir trabalho a alguém recém-contratado.

**Fix proposto** (ainda não implementado, decisão de quem mexer primeiro): reescrever `get-employees.controller.ts` pra partir de `employee.findMany({ where: { deletedAt: null } })` (todos os funcionários ativos) em vez de `budget.findMany`, contando os orçamentos aprovados de cada um via `_count` do Prisma (relation count filtrado por `status: 'APPROVED'`). Isso resolve os dois problemas de uma vez — mantém o mesmo formato de resposta que o frontend já espera (`{ employeePerformance: [{ employee, completedServices }] }`), e já aplica o filtro de soft-delete (`deletedAt: null`) junto.

Esboço:

```ts
const employees = await this.prisma.employee.findMany({
  where: { deletedAt: null },
  include: {
    _count: {
      select: { budgets: { where: { status: 'APPROVED' } } }
    }
  },
  orderBy: { createdAt: 'desc' }
})

const employeePerformance = employees.map(({ _count, ...employee }) => ({
  employee,
  completedServices: _count.budgets
}))

return { employeePerformance }
```

**Ainda não feito, sem depender do fix acima**:
- Nos lugares que mostram histórico (agendamentos/orçamentos passados) com `employee.name`, checar `employee.deletedAt` e renderizar em vermelho + legenda tipo "não faz mais parte da equipe" (ideia original do soft delete).
- Testar de ponta a ponta: criar funcionário de teste, apagar, conferir no banco que a linha continua lá só com `deletedAt` preenchido, conferir que ele some da tela de Funcionários e dos dropdowns.
