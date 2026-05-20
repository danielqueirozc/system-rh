import Confirmation from "../confirmation/page";
import { Data } from "../data/page";
import { DatePage } from "../date/page";
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
    <div className="px-4">
      <Stepper steps={steps} currentStep={2} />
      {/* <Services /> */}
      {/* <DatePage /> */}
      {/* <Data /> */}
      <Confirmation />
    </div>
  )
}