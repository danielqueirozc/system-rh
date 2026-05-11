import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { Services } from "./components/services"
import { Stepper } from "./components/stepper"

export default function Home() {
  const steps = [
  { label: "Serviço" },
  { label: "Data/Hora" },
  { label: "Dados" },
  { label: "Confirmação" },
]

  return (
   <div className="bg-gray-50">
    <Header />
    <Stepper steps={steps} currentStep={1} />
    <Services />
    <Footer />
   </div>
  )
}
