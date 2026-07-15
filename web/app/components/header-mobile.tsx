import { NavbarMenuMobile } from "./navbar-menu-mobile";

interface HeaderMobileProps {
  title: string
}

export function HeaderMobile({ title }: HeaderMobileProps) {
  return (
     <header className="fixed top-0 left-0 w-full flex items-center gap-8 p-7 border-b border-gray-200 bg-white z-10">
      <NavbarMenuMobile />
      <span className="text-black text-sm md:text-base">{title}</span>
    </header>
  )
}