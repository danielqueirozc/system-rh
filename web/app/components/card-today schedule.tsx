'use client'

import { useEffect, useState } from "react"

import { Card } from "./ui/card"
import { ItemTodaySchedule } from "./item-today-schedule"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useAppointmentStore, type AppointmentsProps } from "@/context/appointment-store"

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

function isToday(date: Date | string) {
  const target = new Date(date)
  const now = new Date()
  return (
    target.getUTCFullYear() === now.getUTCFullYear() &&
    target.getUTCMonth() === now.getUTCMonth() &&
    target.getUTCDate() === now.getUTCDate()
  )
}

export function CardTodaySchedule() {
  const { getAppointments } = useAppointmentStore()
  const [todayAppointments, setTodayAppointments] = useState<AppointmentsProps[]>([])

  useEffect(() => {
    getAppointments().then((appointments) => {
      setTodayAppointments(appointments.filter((appointment) => isToday(appointment.serviceDate)))
    })
  }, [])

  const preview = todayAppointments.slice(0, 4)

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <strong className="text-lg">Agendamentos de Hoje</strong>

        <Dialog>
          <DialogTrigger asChild>
            <button className="text-blue font-medium hover:underline">
              Ver todos
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Agendamentos de Hoje</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {todayAppointments.length === 0 && (
                <p className="text-gray-500 text-sm">Nenhum agendamento para hoje.</p>
              )}

              {todayAppointments.map((appointment) => (
                <ItemTodaySchedule
                  key={appointment.id}
                  clientName={appointment.client.name}
                  service={appointment.service.name}
                  time={formatTime(appointment.serviceDate)}
                  status={STATUS_LABEL[appointment.status]}
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
        <p className="text-gray-500 text-sm">Nenhum agendamento para hoje.</p>
      )}

      {preview.map((appointment) => (
        <ItemTodaySchedule
          key={appointment.id}
          clientName={appointment.client.name}
          service={appointment.service.name}
          time={formatTime(appointment.serviceDate)}
          status={STATUS_LABEL[appointment.status]}
        />
      ))}
    </Card>
  )
}
