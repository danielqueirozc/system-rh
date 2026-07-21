'use client'

import { NavbarMenuMobile } from "./navbar-menu-mobile";
import { usePathname } from 'next/navigation'

export function HeaderMobile() {
  const route = usePathname()

  const routes = [
    { title: "Dashboard",    href: "/dashboard" },
    { title: "Clientes",     href: "/clients" },
    { title: "Agendamentos", href: "/appointments" },
    { title: "Orçamentos",   href: "/budgets" },
    { title: "Funcionários", href: "/employees" },
    { title: "Relatórios",   href: "/reports" },
  ]

  return (
     <header className="fixed top-0 left-0 w-full flex items-center gap-8 p-7 border-b border-gray-200 bg-white z-10">
      <NavbarMenuMobile />
      <span className="text-black text-sm md:text-base">{routes.find(r => r.href === route)?.title}</span>
    </header>
  )
}