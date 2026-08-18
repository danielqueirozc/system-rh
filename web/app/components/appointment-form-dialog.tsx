'use client'

import { FormEvent, useEffect, useState } from "react"
import { Plus } from "lucide-react"

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
import { useClientStore } from "@/context/client-store"
import { useEmployeeStore } from "@/context/employee-stores"
import { SERVICES } from "@/lib/constants"
import { useAppointmentStore } from "@/context/appointment-store"

const emptyForm = { clientId: "", service: "", employeeId: "", date: "", time: "" }

export function AppointmentFormDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const { client, getClients } = useClientStore()
  const { employee, getEmployees, } = useEmployeeStore()
  const { createAppointmentAdmin } = useAppointmentStore()

  useEffect(() => {
    if (!open) return

    getClients()
    getEmployees()
  }, [open])

  function handleChange(field: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }


//   function handleSubmit(event: FormEvent) {
//   event.preventDefault()

//   const selectedClient = client.find(c => c.id === form.clientId)
//   if (!selectedClient) return

//   createAppointment({
//     serviceName: form.service,
//     serviceDate: `${form.date}T${form.time}:00.000Z`,
//     clientName: selectedClient.name,
//     clientEmail: selectedClient.email,
//     clientPhone: selectedClient.phone,
//     clientAddress: selectedClient.address,
//   })

//   setForm(emptyForm)
//   setOpen(false)
// }


  
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const serviceDate = new Date(`${form.date}T${form.time}:00.000Z`)

    createAppointmentAdmin({
      clientId: form.clientId,
      employeeId: form.employeeId,
      serviceName: form.service,
      serviceDate,
    })

    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-xs font-semibold px-4 py-2 rounded-lg w-fit cursor-pointer">
          <Plus size={16} />
          Novo Agendamento
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="appointment-client">Cliente</Label>
            <Select
              value={form.clientId}
              onValueChange={value => handleChange("clientId", value)}
            >
              <SelectTrigger id="appointment-client" className="w-full">
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {client.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="appointment-service">Serviço</Label>
            <Select
              value={form.service}
              onValueChange={value => handleChange("service", value)}
            >
              <SelectTrigger id="appointment-service" className="w-full">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="appointment-employee">Funcionário</Label>
            <Select
              value={form.employeeId}
              onValueChange={value => handleChange("employeeId", value)}
            >
              <SelectTrigger id="appointment-employee" className="w-full">
                <SelectValue placeholder="Selecione o funcionário" />
              </SelectTrigger>
              <SelectContent>
                {employee.map(e => (
                  <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="appointment-date">Data</Label>
              <Input
                id="appointment-date"
                type="date"
                value={form.date}
                onChange={e => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="appointment-time">Horário</Label>
              <Input
                id="appointment-time"
                type="time"
                value={form.time}
                onChange={e => handleChange("time", e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#1a1a8c] text-white hover:bg-[#1a1a8c]/90">
              Agendar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
