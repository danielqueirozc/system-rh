import { Droplet, Paintbrush, Wrench } from "lucide-react"
import { CardService } from "./ui/card-service"

export function Services() {
  return (
    <section className="flex flex-col text-center px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-black font-medium">Escolha o Serviço</h1>
        <h2 className="text-gray-400">Selecione o tipo de serviço que você precisa</h2>
      </div>

      <div className="flex flex-col gap-5 mt-8">
       <CardService
          img={<Droplet size={28} />}
          service="Encanamento"
          description="Reparos, instalação e manutenção hidráulica"
          time="2-4 horas"
          price={150}
        />
       
      <CardService
          img={<Paintbrush size={28} />}
          service="Encanamento"
          description="Reparos, instalação e manutenção hidráulica"
          time="2-4 horas"
          price={150}
        />

        <CardService
          img={<Wrench size={28} />}
          service="Encanamento"
          description="Reparos, instalação e manutenção hidráulica"
          time="2-4 horas"
          price={150}
        />
      </div>
    </section>
  )
}
