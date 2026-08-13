'use client'

import { AppointmentFormDialog } from "@/app/components/appointment-form-dialog";
import { Card } from "@/app/components/ui/card";
import { useAppointmentStore } from "@/context/appointment-store";
import { cn } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function Appointments() {
  const [activeStatus, setActiveStatus] = useState("Todos")
  const [windowWidth, setWindowWidth] = useState(0)

  const { appointments, getAppointments } = useAppointmentStore()

  const status = ["Todos", "Pendentes", "Confirmados", "Em Andamento", "Concluídos"]

  function handleStatus(query: string) {
    const stt = query === 'Pendentes' ? 'PENDING'
      : query === 'Confirmados' ? 'CONFIRMED'
      : query === 'Em Andamento' ? 'IN_PROGRESS'
      : query === 'Concluídos' ? 'COMPLETED'
      : undefined
    getAppointments(stt)
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    getAppointments()
  }, [])

  return (
    <Fragment>
      {windowWidth >= 1024 ? (
        <div className="flex-1 flex flex-col gap-6">
          <header className="p-5.5 text-gray-700 border-b border-gray-200">
            Agendamentos
          </header>

          <main className="flex flex-col gap-6 px-4">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <span className="text-gray-800">
                  Gestão de Agendamentos
                </span>

                <AppointmentFormDialog />
              </div>

              <div className="overflow-x-auto w-full p-1 grid grid-cols-5 justify-between text-sm gap-2 bg-gray-100 rounded-lg">
                {status.map(stt => (
                  <button
                    key={stt}
                    onClick={() => { setActiveStatus(stt); handleStatus(stt) }}
                    className={cn(activeStatus === stt ? 'bg-white' : 'bg-transparent', 'shrink-0 whitespace-nowrap py-1 text-gray-900 rounded-lg cursor-pointer' )}
                  >
                    {stt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {appointments.map(app => (
                <Card key={app.id} className="rounded-lg p-4 flex flex-col gap-12 text-sm">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <p className="text-gray-800 font-medium">{app.client.name}</p>
                      <span className="text-gray-500">{app.service.name}</span>
                    </div>
                    <span 
                      className={cn(
                        'flex items-center font-medium rounded-lg px-3 h-5 text-xs',
                        app.status === 'PENDING' ? ' bg-white text-black border border-violet-100':
                        app.status === 'COMPLETED' ? 'text-gray-900' : 
                        app.status === 'IN_PROGRESS' ? 'bg-gray-100 text-blue' :
                        'bg-blue text-white'
                      )}
                    >
                      {app.status === 'CONFIRMED' ? 'Confirmado': 
                        app.status === 'PENDING' ? 'Pendente' :
                        app.status === 'IN_PROGRESS' ? 'Em Andamento' :
                        'Concluído'
                      }
                    </span>
                  </div>
                        {/* , */}

                  <div className="flex flex-col gap-4 text-gray-500 font-medium">
                    <div className="flex justify-between">
                      <div className="w-full flex items-center gap-2">
                        <Calendar size={16} />
                        08/10/2025
                      </div>
                      <div className="flex items-center gap-2 text-left w-full">
                        <Clock size={16} />
                        <div className="text-left">09:00</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {app.employee?.name ?? 'Não atribuído'}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="w-full border border-gray-200 rounded-md text-gray-900 text-sm font-medium py-1 hover:bg-violet-100 hover:text-violet-900">Editar</button>
                    <button className="w-full border border-gray-200 rounded-md text-gray-900 text-sm font-medium py-1 hover:bg-violet-100 hover:text-violet-900">Detalhes</button>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
        
      ) : (
        <div className="flex flex-col gap-6 pt-28 px-4">
          <div className="flex flex-col gap-4">
            <span className="text-gray-800">
              Gestão de Agendamentos
            </span>

            <AppointmentFormDialog />

            <div className="overflow-x-auto w-full p-1 flex text-sm gap-2 bg-gray-100 rounded-lg">
              {status.map(stt => (
                <button
                  key={stt}
                  onClick={() => { setActiveStatus(stt); handleStatus(stt) }}
                  className={cn(activeStatus === stt ? 'bg-white' : 'bg-transparent', 'shrink-0 whitespace-nowrap px-3 py-1 text-gray-900 rounded-lg' )}
                >
                  {stt}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-violet-100 rounded-lg p-3 flex flex-col gap-8 text-sm">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-gray-800 font-medium">Joao Silva</p>
                <span className="text-gray-500">Reparo Elétrico</span>
              </div>
              <span className="flex items-center font-semibold rounded-lg px-3 h-5 bg-blue text-white text-xs">Confirmado</span>
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
        </div>
      )}
    </Fragment>
  )
} 