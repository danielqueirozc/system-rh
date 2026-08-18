'use client'

import { FormEvent, useState } from "react"

import { useAppointmentStore, type AppointmentsProps } from "@/context/appointment-store"
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
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"

interface EditAppointmentDialogProps {
  appointment: AppointmentsProps
}

function toDateInputValue(date: Date | string) {
  return new Date(date).toISOString().slice(0, 10)
}

function toTimeInputValue(date: Date | string) {
  return new Date(date).toISOString().slice(11, 16)
}

function buildForm(appointment: AppointmentsProps) {
  return {
    id: appointment.id,
    status: appointment.status,
    date: toDateInputValue(appointment.serviceDate),
    time: toTimeInputValue(appointment.serviceDate),
    description: appointment.description ?? "",
  }
}

export function EditAppointmentDialog({ appointment }: EditAppointmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(() => buildForm(appointment))

  const { editAppointment } = useAppointmentStore()

  function handleOpenChange(next: boolean) {
    if (next) {
      setForm(buildForm(appointment))
    }

    setOpen(next)
  }
  
  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const serviceDate = new Date(`${form.date}T${form.time}:00.000Z`)

    editAppointment({
      id: form.id,
      status: form.status,
      date: serviceDate.toISOString(),
      description: form.description,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="w-full border border-gray-200 rounded-md text-gray-900 text-sm font-medium py-1 hover:bg-violet-100 hover:text-violet-900">
          Editar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Editar Agendamento</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-1 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
            <span><span className="font-medium text-gray-900">Cliente:</span> {appointment.client.name}</span>
            <span><span className="font-medium text-gray-900">Serviço:</span> {appointment.service.name}</span>
            <span><span className="font-medium text-gray-900">Funcionário:</span> {appointment.employee?.name ?? "Não atribuído"}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-appointment-status">Status</Label>
            <Select
              value={form.status}
              onValueChange={value => handleChange("status", value)}
            >
              <SelectTrigger id="edit-appointment-status" className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                <SelectItem value="IN_PROGRESS">Em Andamento</SelectItem>
                <SelectItem value="COMPLETED">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-appointment-date">Data</Label>
              <Input
                id="edit-appointment-date"
                type="date"
                value={form.date}
                onChange={e => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-appointment-time">Horário</Label>
              <Input
                id="edit-appointment-time"
                type="time"
                value={form.time}
                onChange={e => handleChange("time", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-appointment-description">Descrição</Label>
            <Textarea
              id="edit-appointment-description"
              placeholder="Observações do agendamento"
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#1a1a8c] text-white hover:bg-[#1a1a8c]/90">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
