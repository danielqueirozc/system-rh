import { cn } from "@/lib/utils"
import { useAuthStore } from "@/context/auth-store"
import { Role } from "@/@types"
import { BarChart2, Calendar, FileText, LayoutDashboard, LogOut, ShieldUser, UserCog, Users } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function NavbarMenuDesktop() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  const navItems = [
    { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
    { label: "Clientes",     href: "/clients",      icon: Users },
    { label: "Agendamentos", href: "/appointments",  icon: Calendar },
    { label: "Orçamentos",   href: "/budgets",    icon: FileText },
    { label: "Funcionários", href: "/employees",  icon: UserCog },
    { label: "Relatórios",   href: "/reports",    icon: BarChart2 },
    ...(user?.role === Role.ADMIN ? [{ label: "Usuários", href: "/users", icon: ShieldUser }] : []),
  ]

  const route = usePathname()

  return (
    <div className="sticky top-0 h-screen w-full max-w-68 shrink-0 flex flex-col border-r border-gray-200">
      <header className="flex flex-col border-b border-gray-200 p-6">
        <span className="text-lg font-medium text-black">Sistema Ávila</span>
        <span className="text-gray-400 text-sm">Gestão Completa</span>
      </header>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2 px-4 pt-4">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={cn(
              "flex gap-4 items-center font-normal py-3 px-3 rounded-lg",
              route === href ? "bg-[#1a1a8c] text-white hover:none" : "text-gray-800 hover:bg-violet-100"
            )}>
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex gap-4 items-center text-gray-800 py-2 px-3 cursor-pointer">
            <LogOut size={16} />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </div>
    </div>
  )
}