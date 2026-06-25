'use client'

import { ButtonHamburguer } from "@/app/components/ui/button-hamburguer";
import { CardDashboard } from "@/app/components/card-dashboard";
import { CardTodaySchedule } from "@/app/components/card-today schedule";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Calendar, ChartColumn, FileText, LayoutDashboard, LogOut, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CardPendingBudgets } from "@/app/components/ui/card-pending-bugets";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const route = usePathname()

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 w-full flex items-center gap-8 p-7 border-b border-gray-200 bg-white z-10">
        <Sheet>
          <SheetTrigger asChild>
            <ButtonHamburguer
              isOpen={isOpen} 
              onClick={handleOpen} 
            />
          </SheetTrigger>

          <SheetContent side="left" className="">
            <header className="flex flex-col border-b border-gray-200 p-6">
              <SheetTitle className="text-lg">Sistema Ávila</SheetTitle>
              <span className="text-gray-500 font-medium">Gestão Completa</span>
            </header>

            <main className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 px-6">
                <div className={cn(route === '/dashboard' ? "flex gap-4 items-center text-white font-semibold bg-blue py-2 px-3 rounded-lg" : "flex gap-4 items-center text-gray-800 font-semibold py-2 px-3")}>
                  <LayoutDashboard />
                  <span >Dashboard</span>
                </div>

                <Link href='/clients' className={cn(route === '/clients' ? "flex gap-4 items-center text-white font-semibold bg-blue py-2 px-3 rounded-lg" : "flex gap-4 items-center text-gray-800 font-semibold py-2 px-3")}>
                  <Users />
                  <span >Clientes</span>
                </Link>

                <div className={cn(route === '/appointments' ? "flex gap-4 items-center text-white font-semibold bg-blue py-2 px-3 rounded-lg" : "flex gap-4 items-center text-gray-800 font-semibold py-2 px-3")}>
                  <Calendar />
                  <span >Agendamentos</span>
                </div>

                <div className={cn(route === '/budgets' ? "flex gap-4 items-center text-white font-semibold bg-blue py-2 px-3 rounded-lg" : "flex gap-4 items-center text-gray-800 font-semibold py-2 px-3")}>
                  <FileText />
                  <span >Orçamentos</span>
                </div>

                <div className={cn(route === '/employees' ? "flex gap-4 items-center text-white font-semibold bg-blue py-2 px-3 rounded-lg" : "flex gap-4 items-center text-gray-800 font-semibold py-2 px-3")}>
                  <UserCog />
                  <span >Funcionários</span>
                </div>

                <div className={cn(route === '/reports' ? "flex gap-4 items-center text-white font-semibold bg-blue py-2 px-3 rounded-lg" : "flex gap-4 items-center text-gray-800 font-semibold py-2 px-3")}>
                  <ChartColumn />
                  <span >Relatórios</span>
                </div>
              </div>
              <div className="flex gap-8 border-t border-gray-200 p-6">
                <LogOut />
                <span className="font-medium">Sair</span>
              </div>
            </main>
          </SheetContent>
        </Sheet>

        <span className="text-black text-sm font-medium">Dashboard</span>
      </header>

      <main className="flex flex-col gap-8 pt-20">
        <div className="p-4 flex flex-col gap-4">
          <CardDashboard
            number={12}
            name='Total de Clientes'
            totalClients={248}
            background="bg-[#2B7FFF]"
            icon={<Users color="white" size={22} />}
          />

          <CardDashboard
            number={3}
            name='Agendamentos Hoje'
            totalClients={15}
            background="bg-[#00C951]"
            icon={<Calendar color="white" size={22} />}
          />

          <CardDashboard
            number={2}
            name='Orçamentos Pendentes'
            totalClients={8}
            background="bg-[#FF6900]"
            icon={<Users color="white" size={22} />}
          />

          <CardDashboard
            number={18}
            name='Receita do Mês'
            totalClients={45.320}
            background="bg-[#AD46FF]"
            icon={<FileText color="white" size={22} />}
          />
        </div>

        <div className="p-4 flex flex-col gap-4">
          <CardTodaySchedule />
          <CardPendingBudgets />
        </div>
      </main>
    </div>
  )
}
