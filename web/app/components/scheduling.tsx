import Date from "./date/page";
import { Services } from "./services";
import { Stepper } from "./stepper";

export default function Scheduling() {
  const steps = [
    { label: "Serviço" },
    { label: "Data/Hora" },
    { label: "Dados" },
    { label: "Confirmação" },
  ]
  
  return (
    <div>
      <Stepper steps={steps} currentStep={2} />
      {/* <Services /> */}
      <Date />
    </div>
  )
}