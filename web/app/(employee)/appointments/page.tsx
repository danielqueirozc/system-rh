'use client'

import { NavbarMenuMobile } from "@/app/components/navbar-menu-mobile";
import { cn } from "@/lib/utils";
import { Calendar, Plus, User } from "lucide-react";
import { useState } from "react";

export default function Appointments() {
  const [activeStatus, setActiveStatus] = useState("Todos")

  const status = ["Todos", "Pendentes", "Confirmados", "Em Andamento", "Concluídos"]

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full flex items-center gap-8 p-7 border-b border-gray-200 bg-white z-10">
        <NavbarMenuMobile />
        <span className="text-black text-sm font-medium">Agendamentos</span>
      </header>

      <main className="flex flex-col gap-6 pt-28 px-4">
        <div className="flex flex-col gap-4">
          <span className="text-gray-800">
            Gestão de Agendamentos
          </span>

          <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">
            <Plus size={16} />
            Novo Agendamento
          </button>

          <div className="overflow-x-auto w-full p-1 flex text-sm gap-2 bg-gray-100 rounded-lg">
            {status.map(stt => (
              <button
                key={stt}
                onClick={() => setActiveStatus(stt)}
                className={cn(activeStatus === stt ? 'bg-white' : 'bg-transparent', 'shrink-0 whitespace-nowrap px-3 py-1 text-gray-900 rounded-lg' )}
              >
                {stt}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-purple rounded-lg p-3 flex flex-col gap-8">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium">Joao Silva</p>
              <span className="text-gray-500">Reparo Elétrico</span>
            </div>
            <span className="text-xs flex items-center font-semibold rounded-lg px-2 h-5 bg-blue text-white">Confirmado</span>
          </div>

          <div className="flex flex-col gap-4 text-gray-500 font-medium">
            <div className="flex justify-between">
              <div className="w-full flex items-center gap-2">
                <Calendar size={16} />
                08/10/2025
              </div>
              <div className="text-left w-full">
                <div className="text-left">09:00</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User size={16} />
              Carlos Tech
            </div>
          </div>

          <div className="flex gap-2">
            <button className="w-full border border-gray-200 rounded-md text-gray-900 text-sm font-medium py-1">Editar</button>
            <button className="w-full border border-gray-200 rounded-md text-gray-900 text-sm font-medium py-1">Detalhes</button>
          </div>
        </div>
      </main>
    </div>
  )
} 