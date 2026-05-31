'use client'

import { Mail, MapPin, Phone, User } from "lucide-react";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import { useSchedulingStore } from "@/context/scheduling-store";

export default function Data() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth) // window.innerWidth = pega a largura atual da tela
  
  const router = useRouter()

  const { setData, createScheduling } = useSchedulingStore()

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)

      window.addEventListener('resize', handleResize)
    }

    return () => window.removeEventListener('resize', handleResize)

  }, [windowWidth])
    
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const address = formData.get('address')
    const description = formData.get('description')

    if (!name) {
      // colocar algo para mostrar o erro na tela
      alert('nome é obrigatório')
    }

    if (!email) {
      // colocar algo para mostrar o erro na tela
      alert('nome é obrigatório')
    }
    if (!phone) {
      // colocar algo para mostrar o erro na tela
      alert('nome é obrigatório')
    }
    if (!address) {
      // colocar algo para mostrar o erro na tela
      alert('nome é obrigatório')
    }
    if (!description) {
      // colocar algo para mostrar o erro na tela
      alert('nome é obrigatório')
    }

    try {
      await createScheduling({
        name: name as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
        description: description as string
      })
    } catch(error) {
      console.log('erro ao enviar os dados para o context', error)
    }
  }

  return (
    <div className="flex flex-col pb-25">
      <div className="text-center">
        <h1 className="text-black font-semibold">Seus Dados</h1>
        <h2 className="text-gray-500">Preencha suas informações para confirmar o agendamento</h2>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-purple py-6 px-8 flex flex-col gap-4 text-gray-900 bg-white">
       

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <User size={16} />
            <label className="text-sm font-medium">Nome completo  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Seu nome completo"
            name="name"
          />
        </div>

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Mail size={16} />
            <label className="text-sm font-medium">Email  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Seu @email.com"
            name="email"
          />
        </div>

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Phone size={16} />
            <label className="text-sm font-medium">Telefone  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="(00) 00000 0000"
            name="phone"
          />
        </div>

         <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <MapPin size={16}/>
            <label className="text-sm font-medium">Endereço completo  *</label>
          </div>

          <Input
            className="border-0 bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Rua, número, bairro, cidade"
            name="address"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <label className="text-sm font-medium">Descreva o problema (Opcional)</label>
          </div>

          <textarea
            className="border-0 p-3 rounded-lg bg-[#F9F9F9] placeholder:text-sm transition-colors"
            placeholder="Conte-nos mais sobre o serviço que você precisa"
            name="description"
          />

        </div>

        <div className="flex gap-5 justify-between text-sm">
          <Link
            className="border border-purple rounded-lg py-2 px-6"
            href='/date'
          >
            Voltar
          </Link>

          <Link
            className="text-white font-medium bg-blue rounded-lg py-2 px-4"
            href='/confirmation'
          >
            Confirmar Agendamento
          </Link>
        </div>
      </form>
    </div>
  )
}