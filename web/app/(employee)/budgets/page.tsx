'use client'

import { HeaderMobile } from "@/app/components/header-mobile";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

const budgets = [
  { id: 1, client: "Pedro Alves",    service: "Reforma Completa",   description: "Reforma de 3 cômodos",     value: "8.500,00", date: "07/10/2025", status: "Pendente" },
  { id: 2, client: "Lucia Mendes",   service: "Reparo de Telhado",  description: "Troca de telhas e calhas",  value: "3.200,00", date: "06/10/2025", status: "Pendente" },
  { id: 3, client: "Roberto Lima",   service: "Instalação Elétrica", description: "Nova instalação completa", value: "2.800,00", date: "05/10/2025", status: "Aprovado" },
  { id: 4, client: "Fernanda Costa", service: "Pintura Externa",    description: "Pintura de fachada",        value: "4.500,00", date: "04/10/2025", status: "Aprovado" },
  { id: 5, client: "Marcos Silva",   service: "Impermeabilização",  description: "Laje e paredes",            value: "5.200,00", date: "03/10/2025", status: "Rejeitado" },
]

export default function Budgets() {
  const [windowWidth, setWindowWidth] = useState(0)
  
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    
    handleResize() 
    
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Fragment>
      {windowWidth >= 1024 ? (
        <div className="flex-1 flex flex-col gap-6">
          <header className="p-5.5 text-gray-700 border-b border-gray-200">
            Agendamentos
          </header>

          <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Card className="flex flex-col gap-7 p-4">
                    <p className="text-gray-500">Total Orçado</p>
                    <span className="text-gray-900 font-medium text-lg">R$ 24.200</span>
                  </Card>

                  <Card className="flex flex-col gap-7 p-4">
                    <p className="text-gray-500">Aprovados</p>
                    <span className="text-green-600 font-medium text-lg">R$ 8.000</span>
                  </Card>

                  <Card className="flex flex-col gap-7 p-4">
                    <p className="text-gray-500">Pendentes</p>
                    <span className="text-red-500 font-medium text-lg">R$ 11.700</span>
                  </Card>
                </div>

                <button className="flex items-center self-start gap-2 bg-[#1a1a8c] text-white text-xs font-semibold px-4 py-2 rounded-lg w-fit">
                  <Plus size={16} />
                  Novo Orçamento
                </button>
              </div>

              <div className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm mt-2 min-w-225">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-3 font-semibold text-gray-900">ID</th>
                        <th className="pb-3 font-semibold text-gray-900">Cliente</th>
                        <th className="pb-3 font-semibold text-gray-900">Serviço</th>
                        <th className="pb-3 font-semibold text-gray-900">Descrição</th>
                        <th className="pb-3 font-semibold text-gray-900">Valor</th>
                        <th className="pb-3 font-semibold text-gray-900">Data</th>
                        <th className="pb-3 font-semibold text-gray-900 text-center">Status</th>
                        <th className="pb-3 font-semibold text-gray-900 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgets.map((budget, i) => (
                        <tr
                          key={budget.id}
                          className={cn(
                            "border-t border-gray-100 rounded-lg",
                            i % 2 === 0 ? "bg-[#f0f0fa]" : "bg-white"
                          )}
                        >
                          <td className="py-4 px-2 pr-4 font-medium text-gray-800">#{budget.id}</td>
                          <td className="py-4 pr-4 font-medium text-gray-800">{budget.client}</td>
                          <td className="py-4 pr-4 text-gray-500">{budget.service}</td>
                          <td className="py-4 pr-4 text-gray-500">{budget.description}</td>
                          <td className="py-4 pr-4 text-green-600 font-medium">R$ {budget.value}</td>
                          <td className="py-4 pr-4 text-gray-500">{budget.date}</td>
                          <td className="py-4 text-center">
                            <span className={cn(
                              "inline-block px-2 py-1 rounded-full text-xs font-semibold",
                              budget.status === "Aprovado" && "bg-[#1a1a8c] text-white",
                              budget.status === "Pendente" && "border border-gray-400 text-gray-600",
                              budget.status === "Rejeitado" && "bg-red-500 text-white"
                            )}>
                              {budget.status}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex items-center justify-center gap-2 px-2">
                              <button className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
                                Ver
                              </button>
                              {budget.status === "Pendente" && (
                                <>
                                  <button className="bg-[#1a1a8c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                                    Aprovar
                                  </button>
                                  <button className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                                    Rejeitar
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 px-4 pt-24">
            <Card className="flex flex-col gap-7 p-4">
              <p className="text-gray-500">Total Orçado</p>
              <span className="text-gray-900 font-medium text-lg">R$ 24.200</span>
            </Card>

            <Card className="flex flex-col gap-7 p-4">
              <p className="text-gray-500">Aprovados</p>
              <span className="text-green-600 font-medium text-lg">R$ 8.000</span>
            </Card>

            <Card className="flex flex-col gap-7 p-4">
              <p className="text-gray-500">Pendentes</p>
              <span className="text-red-500 font-medium text-lg">R$ 11.700</span>
            </Card>

            <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-xs font-semibold px-4 py-2 rounded-lg w-fit">
              <Plus size={16} />
              Novo Orçamento
            </button>

            <div className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-2 min-w-225">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 font-semibold text-gray-900">ID</th>
                      <th className="pb-3 font-semibold text-gray-900">Cliente</th>
                      <th className="pb-3 font-semibold text-gray-900">Serviço</th>
                      <th className="pb-3 font-semibold text-gray-900">Descrição</th>
                      <th className="pb-3 font-semibold text-gray-900">Valor</th>
                      <th className="pb-3 font-semibold text-gray-900">Data</th>
                      <th className="pb-3 font-semibold text-gray-900 text-center">Status</th>
                      <th className="pb-3 font-semibold text-gray-900 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets.map((budget, i) => (
                      <tr
                        key={budget.id}
                        className={cn(
                          "border-t border-gray-100 rounded-lg",
                          i % 2 === 0 ? "bg-[#f0f0fa]" : "bg-white"
                        )}
                      >
                        <td className="py-4 px-2 pr-4 font-medium text-gray-800">#{budget.id}</td>
                        <td className="py-4 pr-4 font-medium text-gray-800">{budget.client}</td>
                        <td className="py-4 pr-4 text-gray-500">{budget.service}</td>
                        <td className="py-4 pr-4 text-gray-500">{budget.description}</td>
                        <td className="py-4 pr-4 text-green-600 font-medium">R$ {budget.value}</td>
                        <td className="py-4 pr-4 text-gray-500">{budget.date}</td>
                        <td className="py-4 text-center">
                          <span className={cn(
                            "inline-block px-2 py-1 rounded-full text-xs font-semibold",
                            budget.status === "Aprovado" && "bg-[#1a1a8c] text-white",
                            budget.status === "Pendente" && "border border-gray-400 text-gray-600",
                            budget.status === "Rejeitado" && "bg-red-500 text-white"
                          )}>
                            {budget.status}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2 px-2">
                            <button className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
                              Ver
                            </button>
                            {budget.status === "Pendente" && (
                              <>
                                <button className="bg-[#1a1a8c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                                  Aprovar
                                </button>
                                <button className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                                  Rejeitar
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}