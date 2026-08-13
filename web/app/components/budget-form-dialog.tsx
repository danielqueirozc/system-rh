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
import { Textarea } from "@/app/components/ui/textarea"
import { useClientStore } from "@/context/client-store"

const emptyForm = { clientId: "", service: "", description: "", value: "" }

export function BudgetFormDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const { client, getClients } = useClientStore()

  useEffect(() => {
    if (!open) return

    getClients()
  }, [open])

  function handleChange(field: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center self-start gap-2 bg-[#1a1a8c] text-white text-xs font-semibold px-4 py-2 rounded-lg w-fit cursor-pointer">
          <Plus size={16} />
          Novo Orçamento
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Criar Novo Orçamento</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="budget-client">Cliente</Label>
            <Select
              value={form.clientId}
              onValueChange={value => handleChange("clientId", value)}
            >
              <SelectTrigger id="budget-client" className="w-full">
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
            <Label htmlFor="budget-service">Serviço</Label>
            <Input
              id="budget-service"
              placeholder="Nome do serviço"
              value={form.service}
              onChange={e => handleChange("service", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="budget-description">Descrição</Label>
            <Textarea
              id="budget-description"
              placeholder="Detalhes do orçamento"
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="budget-value">Valor (R$)</Label>
            <Input
              id="budget-value"
              inputMode="decimal"
              placeholder="0,00"
              value={form.value}
              onChange={e => handleChange("value", e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#1a1a8c] text-white hover:bg-[#1a1a8c]/90">
              Criar Orçamento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
