'use client'

import { useState } from "react"
import { Calendar } from "../components/ui/calendar"
import { Button } from "../components/ui/button"

export default function DatePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col mt-5 text-gray-800">
      <div className="flex flex-col gap-2 text-center mt-5">
        <h1 className="text-black text-lg font-semibold">Escolha Data e Horário</h1>
        <p className="text-gray-500 text-sm font-medium">Selecione o melhor dia e horário para o serviço de encanamento</p>
      </div>

      <div className="bg-white border border-purple rounded-lg flex flex-col gap-16 p-8 mt-10">
        <span>Selecione a data</span>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border border-purple w-full"
          captionLayout="dropdown"
        />
      </div>

      <div className="bg-white border border-purple rounded-lg flex flex-col gap-16 p-8 mt-10">
        <span>Horários Disponíveis</span>

        <div className="">

        </div>
      </div>

     <div className="w-full flex justify-center mt-7">
       <Button 
        variant="date"
        className="px-8.5 py-2"
      >
        Voltar
      </Button>
     </div>
    </div>
  )
}