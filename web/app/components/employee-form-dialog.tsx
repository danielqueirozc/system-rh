'use client'

import { FormEvent, useState } from "react"
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
import { EMPLOYEE_FUNCTIONS } from "@/lib/constants"
import { useEmployeeStore } from "@/context/employee-stores"

const emptyForm = { name: "", function: "", email: "", phone: "" }

export function EmployeeFormDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const { createEmployee } = useEmployeeStore()

  function handleChange(field: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    createEmployee(form)

    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit cursor-pointer">
          <Plus size={16} />
          Novo Funcionário
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Cadastrar Funcionário</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="employee-name">Nome Completo</Label>
            <Input
              id="employee-name"
              placeholder="Digite o nome"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="employee-function">Função</Label>
            <Select
              value={form.function}
              onValueChange={value => handleChange("function", value)}
            >
              <SelectTrigger id="employee-function" className="w-full">
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYEE_FUNCTIONS.map(fn => (
                  <SelectItem key={fn} value={fn}>{fn}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="employee-email">E-mail</Label>
            <Input
              id="employee-email"
              type="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="employee-phone">Telefone</Label>
            <Input
              id="employee-phone"
              type="tel"
              placeholder="(11) 98765-4321"
              value={form.phone}
              onChange={e => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#1a1a8c] text-white hover:bg-[#1a1a8c]/90">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
