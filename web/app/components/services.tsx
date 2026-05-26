'use client'

import { Droplet, Paintbrush, Wrench } from "lucide-react"
import { CardService } from "./ui/card-service"
import Link from "next/link"
import { useSchedulingStore } from "@/context/scheduling-store"

export default function Services() {
  const { service, setService, setStep } = useSchedulingStore()

  function handleService() {
    if (service) setStep(2)
  }

  return (
    <section className="flex flex-col text-center pb-25">
      <div className="flex flex-col gap-2">
        <h1 className="text-black font-medium">Escolha o Serviço</h1>
        <h2 className="text-gray-400">Selecione o tipo de serviço que você precisa</h2>
      </div>

      <div className="flex flex-col gap-5 mt-8">
        <Link 
          onClick={() => setService('Encanamento')}
          href='/date'
        >
          <CardService
            img={<Droplet size={28} />}
            service="Encanamento"
            description="Reparos, instalação e manutenção hidráulica"
            time="2-4 horas"
            price={150}
          />
        </Link>
       
         <Link 
          onClick={() => setService('Elétrica')}
          href='/date'
        >
          <CardService
              img={<Paintbrush size={28} />}
              service="Elétrica"
              description="instalação, elétrica e reparos"
              time="2-3 horas"
              price={150}
            />

        </Link>
        <Link 
          onClick={() => setService('Pintura')}
          href='/date'
        >
          <CardService
            img={<Wrench size={28} />}
            service="Pintura"
            description="Pintura interna e externa"
            time="1-2 dias"
            price={150}
          />
        </Link>

        <Link 
          onClick={() => setService('Reparos Gerais')}
          href='/date'
        >
          <CardService
            img={<Wrench size={28} />}
            service="Reparos Gerais"
            description="Manutensão e concertos diveros"
            time="1-3 horas"
            price={150}
          />
        </Link>
      </div>
    </section>
  )
}
