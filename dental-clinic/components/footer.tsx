import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="mb-4 text-xl font-bold">Odontología Integral Especializada</h3>
            <p className="mb-4 text-blue-200">Cuidado dental profesional y especializado para toda la familia.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-blue-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-blue-200 transition-colors hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-blue-200 transition-colors hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-blue-200 transition-colors hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#citas" className="text-blue-200 transition-colors hover:text-white">
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-blue-200 transition-colors hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Contacto</h3>
            <address className="not-italic">
              <p className="mb-2">Ana Leyva 204, 3er Piso</p>
              <p className="mb-2">Plaza Las Torres</p>
              <p className="mb-4">Durango, México</p>
              <p className="mb-2">Teléfono: 8175260 / 6181453676</p>
              <p className="mb-2">Email: ssilvav@hotmail.com</p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-800 pt-8 text-center">
          <p className="text-blue-300">
            &copy; {new Date().getFullYear()} Odontología Integral Especializada. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

