'use client'

import { HeaderMobile } from "@/app/components/header-mobile";
import { NavbarMenuMobile } from "@/app/components/navbar-menu-mobile";
import { cn } from "@/lib/utils";
import { Mail, Phone, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

const clients = [
  { id: 1, name: "João Silva",      email: "joao@email.com",    phone: "(11) 98765-4321", address: "Rua A, 123", services: 5,  status: "Ativo" },
  { id: 2, name: "Maria Santos",    email: "maria@email.com",   phone: "(11) 98765-4322", address: "Rua B, 456", services: 3,  status: "Ativo" },
  { id: 3, name: "Carlos Oliveira", email: "carlos@email.com",  phone: "(11) 98765-4323", address: "Rua C, 789", services: 8,  status: "Ativo" },
  { id: 4, name: "Ana Costa",       email: "ana@email.com",     phone: "(11) 98765-4324", address: "Rua D, 321", services: 2,  status: "Inativo" },
  { id: 5, name: "Pedro Alves",     email: "pedro@email.com",   phone: "(11) 98765-4325", address: "Rua E, 654", services: 12, status: "Ativo" },
]

export default function Clients() {
  const [search, setSearch] = useState("")

  const filtered = clients.filter(c =>
    // uma string mesmo vazia continua sendo uma string, entao passa na comparacao com o obj.name
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      <HeaderMobile title="Clientes" />

      <main className="flex flex-col gap-6 pt-28 px-4">
        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 p-4">

          <div className="flex items-center gap-2 border border-[#1a1a8c] rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">
            <Plus size={16} />
            Novo Cliente
          </button>

          <div className="overflow-x-auto">
          <table className="w-full text-sm mt-2 min-w-150">
            <thead>
              <tr className="text-left">
                <th className="pb-3 font-semibold text-gray-900">Cliente</th>
                <th className="pb-3 font-semibold text-gray-900">Contato</th>
                <th className="pb-3 font-semibold text-gray-900">Endereço</th>
                <th className="pb-3 font-semibold text-gray-900 text-center">Serviços</th>
                <th className="pb-3 font-semibold text-gray-900 text-center">Status</th>
                <th className="pb-3 font-semibold text-gray-900 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => (
                <tr
                  key={client.id}
                  className={cn(
                    "border-t border-gray-100 rounded-lg",
                    i % 2 === 0 ? "bg-[#f0f0fa]" : "bg-white"
                  )}
                >
                  <td className="py-4 px-2 pr-4 font-medium text-gray-800">{client.name}</td>
                  <td className="py-4 pr-4">
                    <div className="flex flex-col gap-1 text-gray-500">
                      <span className="flex items-center gap-1"><Mail size={13} />{client.email}</span>
                      <span className="flex items-center gap-1"><Phone size={13} />{client.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-gray-500">{client.address}</td>
                  <td className="py-4 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-[#1a1a8c] text-xs font-semibold">
                      {client.services}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <span className={cn(
                      "inline-block px-2 py-1 rounded-full text-xs font-semibold",
                      client.status === "Ativo"
                        ? "bg-[#1a1a8c] text-white"
                        : "border border-gray-400 text-gray-600"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-5 px-2">
                      <button className="text-gray-500 hover:text-gray-800">
                        <SquarePen size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </main>
    </div>
  )
}
