'use client'

import { useState } from "react"

import type { AppointmentsProps } from "@/@types"
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
import { dateFormatter } from "@/utils/date-formartter"

interface AppointmentDetailsDialogProps {
  appointment: AppointmentsProps
}

const STATUS_LABEL: Record<AppointmentsProps["status"], string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
}

function formatTime(date: Date | string) {
  const parsed = new Date(date)
  return `${String(parsed.getUTCHours()).padStart(2, "0")}:${String(parsed.getUTCMinutes()).padStart(2, "0")}`
}

export function AppointmentDetailsDialog({ appointment }: AppointmentDetailsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full border border-gray-200 rounded-md text-gray-900 text-sm font-medium py-1 hover:bg-violet-100 hover:text-violet-900">
          Detalhes
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium">{appointment.client.name}</p>
              <span className="text-gray-500">{appointment.service.name}</span>
            </div>
            <span
              className={cn(
                'flex items-center font-medium rounded-lg px-3 h-5 text-xs shrink-0',
                appointment.status === 'PENDING' ? 'bg-white text-black border border-violet-100' :
                appointment.status === 'COMPLETED' ? 'text-gray-900' :
                appointment.status === 'IN_PROGRESS' ? 'bg-gray-100 text-blue' :
                'bg-blue text-white'
              )}
            >
              {STATUS_LABEL[appointment.status]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Data</span>
              <span className="text-gray-700">{dateFormatter(appointment.serviceDate)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Horário</span>
              <span className="text-gray-700">{formatTime(appointment.serviceDate)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Funcionário</span>
            <span className="text-gray-700">{appointment.employee?.name ?? "Não atribuído"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Descrição</span>
            <span className="text-gray-700">{appointment.description || "Nenhuma observação registrada."}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <span>Criado em {dateFormatter(appointment.createdAt)}</span>
            <span>Atualizado em {dateFormatter(appointment.updatedAt)}</span>
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
