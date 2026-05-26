'use client'

import type { ReactNode } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Stepper } from "../components/stepper";
import { useSchedulingStore } from "@/context/scheduling-store";

interface ChildrenType {
  children: ReactNode
}

export default function ClientLayout({ children }: ChildrenType) {
  const {step} = useSchedulingStore()

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
      {children}
      <Footer />
    </div>
  )
}