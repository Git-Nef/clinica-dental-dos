import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Appointment from "@/components/appointment"
import Technology from "@/components/technology"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Appointment />
      <Technology />
      <Contact />
      <Footer />
    </main>
  )
}

