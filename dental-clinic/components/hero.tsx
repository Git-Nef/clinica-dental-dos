import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-blue-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-blue-900 md:text-5xl">
              Cuidado Dental Integral para Todas las Edades
            </h1>
            <p className="mb-6 text-lg text-blue-700">
              Ofrecemos servicios odontológicos de alta calidad con tecnología avanzada y un equipo profesional
              comprometido con su salud bucal.
            </p>
            <div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="#citas">Agendar una Cita</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/img/principal.jpg?height=400&width=600"
              alt="Paciente sonriente"
              className="rounded-lg shadow-lg"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

