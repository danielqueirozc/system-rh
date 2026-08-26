'use client'

import { useEffect, useState } from "react"

import { Card } from "./card"
import { ItemPendingBudgets } from "../item-pending-budgets"
import { Button } from "./button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { useBudgetStore } from "@/context/budget-store"
import type { BudgetProps } from "@/@types"
import { dateFormatter } from "@/utils/date-formartter"

function formatValue(value: number | string) {
  const parsedValue = typeof value === "number" ? value : Number(value)
  return parsedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function CardPendingBudgets() {
  const { getBudgets } = useBudgetStore()
  const [pendingBudgets, setPendingBudgets] = useState<BudgetProps[]>([])

  useEffect(() => {
    getBudgets().then((budgets) => {
      setPendingBudgets(budgets.filter((budget) => budget.status === 'PENDING'))
    })
  }, [])

  const preview = pendingBudgets.slice(0, 3)

  return (
    <div className="">
      <Card className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <strong className="text-lg">Orçamentos Pendentes</strong>

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-blue font-medium hover:underline">
                Ver todos
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Orçamentos Pendentes</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
                {pendingBudgets.length === 0 && (
                  <p className="text-gray-500 text-sm">Nenhum orçamento pendente.</p>
                )}

                {pendingBudgets.map((budget) => (
                  <ItemPendingBudgets
                    key={budget.id}
                    clientName={budget.client.name}
                    service={budget.service.name}
                    value={formatValue(budget.value)}
                    date={dateFormatter(budget.date)}
                  />
                ))}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {preview.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum orçamento pendente.</p>
        )}

        {preview.map((budget) => (
          <ItemPendingBudgets
            key={budget.id}
            clientName={budget.client.name}
            service={budget.service.name}
            value={formatValue(budget.value)}
            date={dateFormatter(budget.date)}
          />
        ))}
      </Card>
    </div>
  )
}
