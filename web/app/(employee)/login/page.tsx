import { Calendar, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Login() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)

      window.addEventListener('resize', handleResize)
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Fragment>
      {windowWidth >= 1024 ? (
        <div className="w-full h-full grid grid-cols-2">
          <div className="bg-blue text-gray-200 flex flex-col justify-center gap-8 px-40">
            <div className="flex gap-4">
              <div className="bg-white/10 p-5 rounded-lg">
                <Wrench size={30} />
              </div>

              <div className="flex flex-col justify-center gap-1.5">
                <strong className="text-2xl text-white">Sistema Ávila</strong>
                <p className="font-medium">Agendamentos e Orçamentos</p>
              </div>
            </div>

            <p>Gerencie seus serviços de manutenção e reparos de forma moderna, ágil e segura.</p>
          
            <div className="flex flex-col gap-3">
              <p>✓ Controle completo de clientes</p>
              <p>✓ Agendamentos automatizados</p>
              <p>✓ Gestão de funcionários</p>
              <p>✓ Relatórios de desempenho</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-10 px-32 pt-40 pb-30">
            <header className="flex flex-col">
              <Link
                href='/'
                className="flex gap-2 fixed left-4 top-4 px-4 py-1.5 text-sm font-medium text-black border border-gray-200 rounded-lg bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
              >
                <Calendar size={16} />
                Área de agendamento
              </Link>
            </header>

            <div className="flex flex-col gap-2">
              <span className="text-black text-xl font-semibold">
                Bem-vindo de volta
              </span>
              <p className="text-gray-500">
                Entre com suas credenciais para acessar o sistema
              </p>
            </div>

            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-black font-medium text-sm">E-mail</label>
                  <Input
                    className="border-0 bg-gray-50 focus:border placeholder:text-gray-500 placeholder:text-sm transition-colors"
                    placeholder="seu@email.com" 
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-black font-medium text-sm">Senha</label>
                  <Input
                    className="border-0 bg-gray-50 focus:border placeholder:text-gray-500 placeholder:text-sm transition-colors"
                    placeholder="******"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Lembrar-me</span>
                <Link 
                  className="text-blue"
                  href='/'>
                  Esqueceu a senha?
                </Link>
              </div>

              <Link
                className="w-full"  
                href='/dashboard'
              >
                <Button className="bg-blue py-4.5 w-full">Entrar</Button>
              </Link>

              <div className="flex justify-center gap-2">
                <p className="text-gray-600 text-sm">Não tem uma conta?</p>
                <Link 
                  className="text-blue text-sm"
                  href='/'>
                  Entre em contato
                </Link>
              </div>
            </form>
          </div>
        </div>  
      ) : (
        <div className="flex flex-col gap-10 px-8 pt-40 pb-30">
        <header className="flex flex-col">
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue text-white">
              <Wrench size={22} />
            </div>

          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-black">Sistema Ávila</h1>
            <h2 className="text-gray-500">Agendamentos e Orçamentos</h2>
          </div>
        </div>

        <Link
          href='/'
          className="flex gap-2 fixed left-4 top-4 px-4 py-1.5 text-sm font-medium text-black border border-gray-200 rounded-lg bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
        >
          <Calendar size={16} />
          Área de agendamento
        </Link>
      </header>

      <div className="flex flex-col gap-2">
        <span className="text-black font-semibold">
          Bem-vindo de volta
        </span>
        <p className="text-gray-500">
          Entre com suas credenciais para acessar o sistema
        </p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-black font-medium text-sm">E-mail</label>
            <Input
              className="border-0 bg-gray-50 focus:border placeholder:text-gray-500 placeholder:text-sm transition-colors"
              placeholder="seu@email.com" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-black font-medium text-sm">Senha</label>
            <Input
              className="border-0 bg-gray-50 focus:border placeholder:text-gray-500 placeholder:text-sm transition-colors"
              placeholder="******"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Lembrar-me</span>
          <Link 
            className="text-blue"
            href='/'>
            Esqueceu a senha?
          </Link>
        </div>

        <Button className="bg-blue py-4.5">Entrar</Button>

        <div className="flex justify-center gap-2">
          <p className="text-gray-500 text-sm">Não tem uma conta?</p>
          <Link 
            className="text-blue text-sm"
            href='/'>
            Entre em contato
          </Link>
        </div>
      </form>
    </div>
  )
}