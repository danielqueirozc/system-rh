'use client'

import { FormEvent, useState } from "react"
import { SquarePen } from "lucide-react"

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
import type { EmployeeProps } from "@/@types"
import { useEmployeeStore } from "@/context/employee-stores"

interface EditEmployeeDialogProps {
  employee: EmployeeProps
}

function buildForm(employee: EmployeeProps) {
  return {
    id: employee.id,
    name: employee.name,
    function: employee.function,
    email: employee.email,
    phone: employee.phone,
    status: employee.status,
  }
}

export function EditEmployeeDialog({ employee }: EditEmployeeDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(() => buildForm(employee))

  const { editEmployee } = useEmployeeStore()

  function handleOpenChange(next: boolean) {
    if (next) {
      setForm(buildForm(employee))
    }

    setOpen(next)
  }

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    editEmployee(form)

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="w-full flex justify-center items-center gap-4 py-1 border font-medium transition-colors border-violet-100 rounded-lg hover:bg-violet-100 hover:text-blue">
          <SquarePen size={16} />
          Editar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Editar Funcionário</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-employee-name">Nome Completo</Label>
            <Input
              id="edit-employee-name"
              placeholder="Digite o nome"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-employee-function">Função</Label>
            <Select
              value={form.function}
              onValueChange={value => handleChange("function", value)}
            >
              <SelectTrigger id="edit-employee-function" className="w-full">
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
            <Label htmlFor="edit-employee-email">E-mail</Label>
            <Input
              id="edit-employee-email"
              type="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-employee-phone">Telefone</Label>
            <Input
              id="edit-employee-phone"
              type="tel"
              placeholder="(11) 98765-4321"
              value={form.phone}
              onChange={e => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-employee-status">Status</Label>
            <Select
              value={form.status}
              onValueChange={value => handleChange("status", value)}
            >
              <SelectTrigger id="edit-employee-status" className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="VACATION">Férias</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
              </SelectContent>
            </Select>
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
