import Link from "next/link";
import { Card } from "./ui/card";
import { ItemTodaySchedule } from "./item-today-schedule";

export function CardTodaySchedule() {
  return (
    <div className="">
      <Card className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center">
          <strong className="text-lg">Agendamentos de Hoje</strong>
          <Link
            className="text-blue font-medium hover:underline"
            href='/'
          >
            Ver todos
          </Link>
        </div>

        <ItemTodaySchedule
          clientName='João Silva'
          service="Reparo Elétrico"
          time='09:00'
          status="Confirmado"
        />

        <ItemTodaySchedule
          clientName='Maria Santos'
          service="Manutenção Hidráulica"
          time='10:30'
          status="Em Andamento"
        />

        <ItemTodaySchedule
          clientName='Carlos Oliveira'
          service="Pintura"
          time='14:00'
          status="Confirmado"
        />

        <ItemTodaySchedule
          clientName='Ana Costa'
          service="Instalação"
          time='16:00'
          status="Pendente"
        />
      </Card>
    </div>
  )
}