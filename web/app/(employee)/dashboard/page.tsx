'use client'

import { CardDashboard } from "@/app/components/card-dashboard";
import { CardTodaySchedule } from "@/app/components/card-today schedule";
import { Calendar, FileText, Users } from "lucide-react";
import { useState } from "react";
import { CardPendingBudgets } from "@/app/components/ui/card-pending-bugets";
import { usePathname } from "next/navigation";
import { HeaderMobile } from "@/app/components/header-mobile";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const route = usePathname()

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col">
      <HeaderMobile title='Dashboard' />

      <main className="flex flex-col gap-8 pt-20">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
