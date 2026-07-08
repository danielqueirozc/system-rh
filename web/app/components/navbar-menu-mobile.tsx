'use client'

import { BarChart2, Calendar, FileText, LayoutDashboard, LogOut, UserCog, Users } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ButtonHamburguer } from "./ui/button-hamburguer";
import { useState } from "react";

export function NavbarMenuMobile() {
  const [isOpen, setIsOpen] = useState(false)

  const route = usePathname()

  const navItems = [
    { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
    { label: "Clientes",     href: "/clients",      icon: Users },
    { label: "Agendamentos", href: "/appointments",  icon: Calendar },
    { label: "Orçamentos",   href: "/budgets",    icon: FileText },
    { label: "Funcionários", href: "/employees",  icon: UserCog },
    { label: "Relatórios",   href: "/reports",    icon: BarChart2 },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <ButtonHamburguer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </SheetTrigger>

      <SheetContent side="left" className="">
        <header className="flex flex-col border-b border-gray-200 p-6">
          <SheetTitle className="text-lg">Sistema Ávila</SheetTitle>
          <span className="text-gray-500 font-medium">Gestão Completa</span>
        </header>

        <main className="flex flex-col justify-between h-full pb-8">
          <div className="flex flex-col gap-2 px-6 pt-4">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className={cn(
                "flex gap-4 items-center font-semibold py-2 px-3 rounded-lg",
                route === href ? "bg-[#1a1a8c] text-white" : "text-gray-800"
              )}>
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 px-6">
            <button className="flex gap-4 items-center text-gray-800 font-semibold py-2 px-3">
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </main>
      </SheetContent>
    </Sheet>
  )
}