'use client'

import { Droplet, Paintbrush, Wrench } from "lucide-react"
import Link from "next/link"
import { useSchedulingStore } from "@/context/scheduling-store"
import { CardService } from "@/app/components/ui/card-service"

export default function Service() {
  const {setService, setStep } = useSchedulingStore()

  return (
    <section className="flex flex-col text-center pb-25 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-black font-medium">Escolha o Serviço</h1>
        <h2 className="text-gray-400">Selecione o tipo de serviço que você precisa</h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-center gap-5 mt-8">
        <Link 
          onClick={() => { setService('Encanamento'); setStep(2)  }}
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
          onClick={() => { setService('Elétrica'); setStep(2) }}
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
          onClick={() => { setService('Pintura'); setStep(2) }}
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
          onClick={() => { setService('Reparos Gerais'); setStep(2) }}
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
