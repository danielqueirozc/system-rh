'use client'

import { FormEvent, useState } from "react"
import { SquarePen } from "lucide-react"

import type { GetClientProps } from "@/@types"
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

interface EditClientDialogProps {
  client: GetClientProps
}

export function EditClientDialog({ client }: EditClientDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    status: client.status,
  })

  function handleOpenChange(next: boolean) {
    if (next) {
      setForm({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        status: client.status,
      })
    }

    setOpen(next)
  }

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-blue hover:bg-violet-100">
          <SquarePen size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-client-name">Nome Completo</Label>
            <Input
              id="edit-client-name"
              placeholder="Digite o nome"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-client-email">E-mail</Label>
            <Input
              id="edit-client-email"
              type="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-client-phone">Telefone</Label>
            <Input
              id="edit-client-phone"
              type="tel"
              placeholder="(11) 98765-4321"
              value={form.phone}
              onChange={e => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-client-address">Endereço</Label>
            <Input
              id="edit-client-address"
              placeholder="Rua, número, bairro"
              value={form.address}
              onChange={e => handleChange("address", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-client-status">Status</Label>
            <Select
              value={form.status}
              onValueChange={value => handleChange("status", value)}
            >
              <SelectTrigger id="edit-client-status" className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
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
