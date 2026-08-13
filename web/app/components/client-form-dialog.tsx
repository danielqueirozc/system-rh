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
import { useClientStore } from "@/context/client-store"

const emptyForm = { name: "", email: "", phone: "", address: "" }

export function ClientFormDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const { createClient } = useClientStore()

  function handleChange(field: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    // console.log('estou no form', form)
    await createClient(form)

    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit cursor-pointer">
          <Plus size={16} />
          Novo Cliente
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="client-name">Nome Completo</Label>
            <Input
              id="client-name"
              placeholder="Digite o nome"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="client-email">E-mail</Label>
            <Input
              id="client-email"
              type="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="client-phone">Telefone</Label>
            <Input
              id="client-phone"
              type="tel"
              placeholder="(11) 98765-4321"
              value={form.phone}
              onChange={e => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="client-address">Endereço</Label>
            <Input
              id="client-address"
              placeholder="Rua, número, bairro"
              value={form.address}
              onChange={e => handleChange("address", e.target.value)}
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
