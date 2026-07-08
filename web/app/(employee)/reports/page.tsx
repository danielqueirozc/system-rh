import { HeaderMobile } from "@/app/components/header-mobile";
import { Card } from "@/app/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Download, TrendingUp } from "lucide-react";

export default function Reports() {
  return (
    <div className="flex flex-col">
      <HeaderMobile title='Relatórios' />

      <div className="pt-24 px-4">
        <div className="flex flex-col gap-4 text-gray-900 text-sm">
          <p>Relatórios e Análises</p>
          <div className="flex justify-baseline gap-4">
            <Select>
              <SelectTrigger className="w-30 border-0 bg-gray-50 py-4">
                <SelectValue placeholder="2026" />
              </SelectTrigger>
              <SelectContent className="min-w-0 w-30">
                <SelectGroup>
                  <SelectItem value="light">2026</SelectItem>
                  <SelectItem value="dark">2025</SelectItem>
                  <SelectItem value="system">2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
          </div>
        </div>
      </div>
    </div>
  )
}