import { Mail, MapPin, Phone, User } from "lucide-react";
import { Input } from "../components/ui/input";
import Link from "next/link";

export function Data() {
  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-black font-semibold">Seus Dados</h1>
        <h2 className="text-gray-500">Preencha suas informações para confirmar o agendamento</h2>
      </div>

      <div className="rounded-lg border border-purple py-6 px-8 flex flex-col gap-4 text-gray-900 bg-white">
       

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <User size={16} />
            <label className="text-sm font-medium">Nome completo  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Seu nome completo"
          />
        </div>

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Mail size={16} />
            <label className="text-sm font-medium">Email  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Seu @email.com"
          />
        </div>

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Phone size={16} />
            <label className="text-sm font-medium">Telefone  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="(00) 00000 0000"
          />
        </div>

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <MapPin size={16}/>
            <label className="text-sm font-medium">Endereço completo  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>

       <div className="flex flex-col gap-2">
          <div>
            <label className="text-sm font-medium">Descreva o problema (Opcional)</label>
          </div>

          <textarea
            className="border-0 p-3 rounded-lg bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Conte-nos mais sobre o serviço que você precisa"
          />

        </div>

        <div className="flex gap-5 justify-between text-sm">
          <Link
            className="border border-purple rounded-lg py-2 px-6"
            href='/date'
          >
            Voltar
          </Link>

          <Link
            className="text-white font-medium bg-blue rounded-lg py-2 px-4"
            href='/'
          >
            Confirmar Agendamento
          </Link>
        </div>
      </div>
    </div>
  )
}