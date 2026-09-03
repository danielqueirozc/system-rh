'use client'

import { useState } from "react"

import type { BudgetProps } from "@/@types"
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { cn } from "@/lib/utils"
import { currencyFormatter } from "@/utils/currency-formatter"
import { dateFormatter } from "@/utils/date-formartter"

interface BudgetDetailsDialogProps {
  budget: BudgetProps
}

const STATUS_LABEL: Record<BudgetProps["status"], string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
}

export function BudgetDetailsDialog({ budget }: BudgetDetailsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-violet-100 hover:text-violet-900">
          Ver
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Orçamento</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium">{budget.client.name}</p>
              <span className="text-gray-500">{budget.service.name}</span>
            </div>
            <span
              className={cn(
                'flex items-center font-medium rounded-lg px-3 h-5 text-xs shrink-0',
                budget.status === 'PENDING' ? 'border border-gray-400 text-gray-600' :
                budget.status === 'REJECTED' ? 'bg-red-500 text-white' :
                'bg-[#1a1a8c] text-white'
              )}
            >
              {STATUS_LABEL[budget.status]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Valor</span>
              <span className="text-green-600 font-medium">R$ {currencyFormatter(budget.value)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Data</span>
              <span className="text-gray-700">{dateFormatter(budget.date)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Descrição</span>
            <span className="text-gray-700">{budget.description || "Nenhuma descrição registrada."}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <span>Criado em {dateFormatter(budget.createdAt)}</span>
            <span>Atualizado em {dateFormatter(budget.updatedAt)}</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="border-purple-100">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
