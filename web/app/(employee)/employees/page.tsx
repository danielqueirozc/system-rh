import { HeaderMobile } from "@/app/components/header-mobile";
import { Card } from "@/app/components/ui/card";
import { Briefcase, Mail, Phone, Plus, Search, SquarePen, Trash2 } from "lucide-react";

export default function Enployees() {
  return (
    <div className="flex flex-col">
      <HeaderMobile title='Funcionários' />
    
      <div className="px-4 pt-24">
        <Card className="flex flex-col gap-12 border border-purple px-6">
         <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 px-4 text-gray-500 bg-gray-50 rounded-lg focus-within:ring-3 focus-within:border focus-within:border-blue focus-within:ring-[#8080C7]">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar funcionários"
              className="w-full h-8 focus:outline-none placeholder:text-gray-500"
            />
            </div>

            <button className="flex items-center gap-2 bg-[#1a1a8c] text-white text-xs font-semibold px-4 py-2 rounded-lg w-fit">
              <Plus size={16} />
              Novo Funcionário
            </button>
         </div>

         <div className="flex flex-col gap-4">
            <Card className="p-6 flex flex-col gap-10">
              <div className="w-full flex justify-baseline gap-4">
                <div className="flex justify-center items-center w-18 h-18 rounded-full bg-blue text-white">
                  PH
                </div>
                <div className="flex flex-col gap-3">
                  <p>Pedro Hidro</p>

                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Encanador
                  </div>

                  <div className="flex justify-center w-12 py-0.5 rounded-lg bg-blue text-white text-xs">Ativo</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  carlos@avila.com
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  (11) 98111-1111
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-lg bg-purple p-2">
                <p className="text-gray-500">Serviços Concluídos</p>
                <span className="text-green-600">45</span>
              </div>

              <div className="flex gap-2">
                <button className="w-full flex justify-center items-center gap-4 py-1 border border-purple rounded-lg">
                  <SquarePen size={16} />
                  Editar
                </button>

                <button className="border border-purple px-2.5 py-1 rounded-lg">
                  <Trash2 className="text-red-500" size={16} />
                </button>
              </div>
            </Card>
         </div>
        </Card>
      </div>
    </div>
  )
}