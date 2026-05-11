import { Header } from "./components/header";

export default function Home() {
  const steps = [
  { label: "Serviço" },
  { label: "Data/Hora" },
  { label: "Dados" },
  { label: "Confirmação" },
]

  return (
   <div className="">
    <Header />
   </div>
  )
}
