import { HeaderMobile } from "@/app/components/header-mobile";
import { Card } from "@/app/components/ui/card";
import { SelectYear } from "@/app/components/ui/seletct-year";
import { Download, TrendingUp } from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart"

export default function Reports() {
  return (
    <div className="flex flex-col">
      <HeaderMobile title='Relatórios' />

      <div className="pt-24 px-4">
        <div className="flex flex-col gap-6 text-gray-900 text-sm">
          <p>Relatórios e Análises</p>
          <div className="flex justify-baseline gap-4">
            
            <SelectYear />

            <button className="flex items-center gap-3 border border-purple rounded-lg px-3">
              <Download size={14} />
              Exportar
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="flex flex-col gap-8 p-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Receita Total</p>
                <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
              </div>

              <span>R$ 330.820</span>

              <p className="text-[#00A63E]">+18.2% vs ano anterior</p>
            </Card>

            <Card className="flex flex-col gap-8 p-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Serviços Realizados</p>
                <TrendingUp size={18} color="#00A63E" strokeWidth={2.25}/>
              </div>

              <span>543</span>

              <p className="text-[#00A63E]">+12.5% vs ano anterior</p>
            </Card>
            
            <Card className="flex flex-col gap-8 p-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Ticket Médio</p>
                <TrendingUp 
                  className="text-blue-500" 
                  size={18} 
                  strokeWidth={2.25} 
                />
              </div>

              <span>R$ 609</span>

              <p className="text-blue-500">+12.5% vs ano anterior</p>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="flex flex-col gap-8 p-6">
                <p className="text-gray-500">Receita Total</p>

                <div>
                  
                </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}