import { House, LogIn } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="text-white bg-blue pt-6 pb-4 px-4 md:px-16 lg:px-64 flex flex-col gap-2">
      <div className="flex gap-2">
        <House size={28} />
        <h1 className="text-xl font-medium">Ávila Manutenção e Reparos</h1>
      </div>

     <span className="text-gray-200">Agende seu serviço de forma rápida e fácil</span>

    <Link 
      className="fixed right-16 flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-medium rounded-lg"
      href='/login'
    >
      <LogIn size={14} />
        Acesso Funcionários
      </Link>
    </header>
  )
}