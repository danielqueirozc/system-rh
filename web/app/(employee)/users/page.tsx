'use client'

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"

import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { useAuthStore } from "@/context/auth-store"
import { useEmployeeStore } from "@/context/employee-stores"
import { Role } from "@/@types"

const emptyForm = { name: "", email: "", password: "", role: "", employeeId: "" }

export default function Users() {
  const [form, setForm] = useState(emptyForm)
  const [feedback, setFeedback] = useState<{ type: "success" | "error", message: string } | null>(null)
  const router = useRouter()
  
  const { user, createUser } = useAuthStore()
  const { employee, getEmployees } = useEmployeeStore()

  useEffect(() => {
    if (user && user.role !== Role.ADMIN) {
      router.replace('/dashboard')
    }
  }, [user, router])

  useEffect(() => {
    getEmployees()
  }, [])

  function handleChange(field: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFeedback(null)

    try {
      await createUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role as typeof Role[keyof typeof Role],
        employeeId: form.employeeId || undefined,
      })

      setFeedback({ type: "success", message: "Usuário criado com sucesso." })
      setForm(emptyForm)
    } catch {
      setFeedback({ type: "error", message: "Não foi possível criar o usuário. Verifique os dados e tente novamente." })
    }
  }

  if (!user || user.role !== Role.ADMIN) {
    return null
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      <header className="p-5.5 text-gray-700 border-b border-gray-200">
        Usuários
      </header>

      <main className="flex flex-col gap-6 px-4 pb-8 pt-24 lg:pt-0">
        <Card className="max-w-md w-full p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-[#1a1a8c] text-white">
              <UserPlus size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">Cadastrar Acesso</span>
              <span className="text-sm text-gray-500">Crie o login de um novo administrador ou funcionário</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="user-name">Nome Completo</Label>
              <Input
                id="user-name"
                placeholder="Digite o nome"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="user-email">E-mail</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="user-password">Senha</Label>
              <Input
                id="user-password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={e => handleChange("password", e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="user-role">Nível de Acesso</Label>
              <Select
                value={form.role}
                onValueChange={value => handleChange("role", value)}
              >
                <SelectTrigger id="user-role" className="w-full">
                  <SelectValue placeholder="Selecione o nível de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Role.ADMIN}>Administrador</SelectItem>
                  <SelectItem value={Role.EMPLOYEE}>Funcionário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.role === Role.EMPLOYEE && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="user-employee">Vincular a um Funcionário (opcional)</Label>
                <Select
                  value={form.employeeId}
                  onValueChange={value => handleChange("employeeId", value)}
                >
                  <SelectTrigger id="user-employee" className="w-full">
                    <SelectValue placeholder="Selecione o funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    {employee.map(e => (
                      <SelectItem key={e.employee.id} value={e.employee.id}>{e.employee.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {feedback && (
              <p className={feedback.type === "success" ? "text-sm text-green-600" : "text-sm text-red-500"}>
                {feedback.message}
              </p>
            )}

            <Button type="submit" className="bg-[#1a1a8c] text-white hover:bg-[#1a1a8c]/90">
              Criar Acesso
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}
