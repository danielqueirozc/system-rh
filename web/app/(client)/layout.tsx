'use client'

import type { ReactNode } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Stepper } from "../components/stepper";
import { useAppointmentStore } from "@/context/appointment-store";

interface ChildrenType {
  children: ReactNode
}

export default function ClientLayout({ children }: ChildrenType) {
  const {step} = useAppointmentStore()

  const steps = [
    { label: "Serviço" },
    { label: "Data/Hora" },
    { label: "Dados" },
    { label: "Confirmação" },
  ]

  return (
    <div className="bg-[#F9F9F9] min-h-screen flex flex-col">
      <Header />
      <div className="lg:w-full lg:flex lg:justify-center">
        <Stepper steps={steps} currentStep={step} />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}