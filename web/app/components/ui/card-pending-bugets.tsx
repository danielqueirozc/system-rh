import Link from "next/link";
import { Card } from "./card";
import { ItemPendingBudgets } from "../item-pending-budgets";

export function CardPendingBudgets() {
  return (
    <div className="">
      <Card className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <strong className="text-lg">Orçamentos Pendentes</strong>
          <Link
            className="text-blue font-medium hover:underline"
            href='/'
          >
            Ver todos
          </Link>
        </div>

        <ItemPendingBudgets
          clientName='Pedro Alves'
          service="Reforma Completa"
          value='8.500'
          date="07/10/2025"
        />

        <ItemPendingBudgets
          clientName='Lucia Mendes'
          service="Reparo de Telhado"
          value='3.200'
          date="06/10/2025"
        />

        <ItemPendingBudgets
          clientName='Roberto Lima'
          service="Instalação Elétrica"
          value='2.800'
          date="05/10/2025"
        />
      </Card>
    </div>
  )
}