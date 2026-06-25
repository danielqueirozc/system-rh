import { cn } from "@/lib/utils"

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function ButtonHamburguer({ isOpen, onClick, className }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        "relative flex size-3 flex-col items-center justify-center gap-1 rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <span
        className={cn(
          "block h-px w-3.5 rounded-full bg-foreground transition-all duration-300",
          isOpen && "translate-y-1 rotate-45"
        )}
      />
      <span
        className={cn(
          "block h-px w-3.5 rounded-full bg-foreground transition-all duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block h-px w-3.5 rounded-full bg-foreground transition-all duration-300",
          isOpen && "-translate-y-1 -rotate-45"
        )}
      />
    </button>
  )
}
