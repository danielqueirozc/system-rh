'use client'

import { useState } from "react"
import Link from "next/link"
import { useSchedulingStore } from "@/context/scheduling-store"
import { Calendar } from "@/app/components/ui/calendar"
import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"

export default function DatePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  const { setDateScheduling, setStep } = useSchedulingStore()

  const router = useRouter()

  const times = [
   "08:00",
   "09:00",
   "10:00",
   "11:00",
   "13:00",
   "14:00",
   "15:00",
   "16:00",
   "17:00" 
  ]

  function handleConfirm(selectedTime: string) {
    if (!date) return

    const [hours, minutes] = selectedTime.split(":")
    const conbined = new Date(date)
    conbined.setHours(Number(hours), Number(minutes))

    setDateScheduling(conbined)
    setStep(3)
    router.push('/data')
  }

  return (
    <div className="flex flex-col mt-5 px-4 pb-25 text-gray-800 bg-[#F9F9F9]">
      <div className="flex flex-col gap-2 text-center mt-5">
        <h1 className="text-black text-lg font-semibold">Escolha Data e Horário</h1>
        <p className="text-gray-500 text-sm font-medium">Selecione o melhor dia e horário para o serviço de encanamento</p>
      </div>

      <div className="flex lg:justify-center lg:gap-8 flex-col lg:flex-row w-full lg:items-stretch">
        <div className="lg:w-102 bg-white border border-purple rounded-lg flex flex-col gap-4 p-8 mt-10">
          <span>Selecione a data</span>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
            classNames={{ root: "w-full" }}
            disabled={day => {
              const today = new Date()
              today.setHours(0,0,0,0)
              return day <= today
            }}
          />
        </div>

        <div className="lg:w-102 bg-white border border-purple rounded-lg flex flex-col gap-12 lg:gap-8 p-7 mt-10">
          <span>Horários Disponíveis</span>

          {date ? (
            <div className="grid grid-cols-3 gap-3">
              {times.map(time => (
                <Button
                  key={time}
                  variant="date"
                  className="px-10 py-2"
                  onClick={() => handleConfirm(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          ) : 
          (
            <span className="text-sm text-gray-500 mt-8">Selecione uma data para ver os horários disponíveis</span>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center mt-7">
        <Link href='/'>
          <Button 
            variant="date"
            className="px-8.5 py-2"
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  )
}