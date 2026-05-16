import { Footer } from "./components/footer"
import { Header } from "./components/header"
import Scheduling from "./components/scheduling"

export default function Home() {
  return (
   <div className="bg-gray-50">
    <Header />
    <Scheduling />
    <Footer />
   </div>
  )
}
