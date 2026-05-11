import { Input } from "@/components/ui/input";
import { Calendar, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Login() {
  return (
    <div className="flex flex-col gap-10 px-8 pt-40 pb-30">
      <header className="flex flex-col">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue text-white">
            <Wrench size={22} />
          </div>

          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-black">Sistema Ávila</h1>
            <h2 className="text-gray-500">Agendamentos e Orçamentos</h2>
          </div>
        </div>

        <Link
          href='/'
          className="flex gap-2 fixed left-4 top-4 px-4 py-1.5 text-sm font-medium text-black border border-gray-200 rounded-lg bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
        >
          <Calendar size={16} />
          Área de agendamento
        </Link>
      </header>

      <div className="flex flex-col gap-2">
        <span className="text-black font-semibold">
          Bem-vindo de volta
        </span>
        <p className="text-gray-500">
          Entre com suas credenciais para acessar o sistema
        </p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-black font-medium text-sm">E-mail</label>
            <Input
              className="border-0 bg-gray-50 focus:border placeholder:text-gray-500 placeholder:text-sm transition-colors"
              placeholder="seu@email.com" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-black font-medium text-sm">Senha</label>
            <Input
              className="border-0 bg-gray-50 focus:border placeholder:text-gray-500 placeholder:text-sm transition-colors"
              placeholder="******"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Lembrar-me</span>
          <Link 
            className="text-blue"
            href='/'>
            Esqueceu a senha?
          </Link>
        </div>

        <Button className="bg-blue py-4.5">Entrar</Button>

        <div className="flex justify-center gap-2">
          <p className="text-gray-500 text-sm">Não tem uma conta?</p>
          <Link 
            className="text-blue text-sm"
            href='/'>
            Entre em contato
          </Link>
        </div>
      </form>
    </div>
  )
}