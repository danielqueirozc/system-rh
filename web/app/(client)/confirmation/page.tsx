import { Calendar, CircleCheck, MapPin, Phone, Wrench } from "lucide-react";
import Link from "next/link";

export default function Confirmation() {
  return (
    <section className="lg:flex lg:justify-center lg:pb-32 ">
      <div className="flex flex-col lg:w-2/6 border- border-purple bg-white p-8 pb-25 text-center rounded-lg">
      <div className="flex flex-col gap-10 items-center">
        <div className="flex items-center justify-center w-20 h-20 bg-[#DBFCE7] rounded-full">
          <CircleCheck size={46} color="#00A63E" />
        </div>

        <div className="flex flex-col gap-12">
          <span className="text-gray-700 font-medium">Agendamento Confirmado!</span>
          <p className="text-gray-500">Seu agendamento foi realizado com sucesso. Enviamos os detalhes para o e-mail danielkeirozz@gmail.com</p>
        </div>

        <div className="lg:w-full bg-[#F9F9F9] p-6 rounded-lg flex flex-col items-start gap-4 text-left">
          <span className="text-gray-700">Detalhes do Agendamento</span>

          <div className="text-sm flex gap-2">
            <Wrench size={16} color="#020290" />
            <div className="flex flex-col items-start">
              <p className="text-gray-400">Serviço</p>
              <p className="text-gray-700">Encanamento</p>
            </div>
          </div>

          <div className="text-sm flex gap-2">
            <Calendar size={16} color="#020290" />
            <div className="flex flex-col items-start">
              <p className="text-gray-400">Data e Horário</p>
              <p className="text-gray-700 pr-10">quinta-feira, 21 de maio de 2026 às 16:00</p>
            </div>
          </div>

          <div className="text-sm flex gap-2">
            <MapPin size={16} color="#020290" />
            <div className="flex flex-col items-start">
              <p className="text-gray-400">Endereço</p>
              <p className="text-gray-700">Rua Água Branca, 610</p>
            </div>
          </div>

          <div className="text-sm flex gap-2">
            <Phone size={16} color="#020290" />
            <div className="flex flex-col items-start">
              <p className="text-gray-400">Contato</p>
              <p className="text-gray-700">11964547273</p>
            </div>
          </div>
        </div>

        <div className="bg-purple rounded-lg border border-violet-300 p-4">
          <strong className="text-blue">💡 Importante:</strong>
          <p className="text-blue text-sm">Nossa equipe entrará em contato até 1 hora antes do horário agendado para confirmar a visita.</p>
        </div>

        <Link 
          className="bg-blue text-white text-sm font-medium w-full py-2 rounded-lg"
          href='/'>
          Fazer novo agendamento
        </Link>
      </div>
    </div>
    </section>
  )
} 