"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <span className="sr-only">Odontología Integral Especializada</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M19 10v2a7 7 0 0 1-14 0v-2m14 0V8a7 7 0 0 0-14 0v2m14 0H5" />
                <path d="M8 19v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
              </svg>
            </Link>
            <span className="ml-3 hidden text-xl font-semibold text-blue-800 md:block">
              Odontología Integral Especializada
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="#inicio" className="text-blue-900 transition-colors hover:text-blue-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-blue-900 transition-colors hover:text-blue-600">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-blue-900 transition-colors hover:text-blue-600">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#citas" className="text-blue-900 transition-colors hover:text-blue-600">
                  Citas
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-blue-900 transition-colors hover:text-blue-600">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="block text-blue-900 md:hidden" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-4 pb-4">
              <li>
                <Link
                  href="#inicio"
                  className="block text-blue-900 transition-colors hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#nosotros"
                  className="block text-blue-900 transition-colors hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#servicios"
                  className="block text-blue-900 transition-colors hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#citas"
                  className="block text-blue-900 transition-colors hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Citas
                </Link>
              </li>
              <li>
                <Link
                  href="#contacto"
                  className="block text-blue-900 transition-colors hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

