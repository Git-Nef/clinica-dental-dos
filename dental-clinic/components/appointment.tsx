"use client"
import { useSubmitCita } from "@/hooks/use-submit-cita"
import type React from "react"
import SuccessModal from '@/components/ui/SuccessModal'

import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  "Restauración de amalgama",
  "Incrustaciones e.max o metálicas",
  "Coronas de metal porcelana",
  "Extracciones",
  "Endopostes",
  "Coronas libres de metal y carillas e.max",
]

const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]

export default function Appointment() {
  const [date, setDate] = useState<Date>()
  const [showModal, setShowModal] = useState(false)
  
  const { submitCita } = useSubmitCita()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.currentTarget

  const datos = {
    nombreCompleto: (form.elements.namedItem("name") as HTMLInputElement).value,
    telefono: (form.elements.namedItem("phone") as HTMLInputElement).value,
    correo: (form.elements.namedItem("email") as HTMLInputElement).value,
    tratamiento: (form.elements.namedItem("service") as HTMLSelectElement).value,
    fecha: date ? date.toISOString().split("T")[0] : "",
    hora: (form.elements.namedItem("time") as HTMLSelectElement).value,
    metodoPago: (form.elements.namedItem("payment") as HTMLSelectElement).value,
  }

  const res = await submitCita(datos)

  if (res.success) {
    setShowModal(true)
    form.reset()
    setDate(undefined)
  } else {
    alert("Error al registrar la cita. Intenta de nuevo.")
  }
}


  return (
    <section id="citas" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">Agende su Cita</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-700">
            Complete el formulario a continuación para solicitar una cita. Nos pondremos en contacto con usted para
            confirmar la fecha y hora.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="mx-auto max-w-3xl rounded-lg bg-blue-50 p-6 shadow-lg md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Ingrese su nombre completo"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Ingrese su número telefónico"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su correo electrónico"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                Tratamiento
              </label>
              <select
                id="service"
                name="service"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccione un tratamiento</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={es}
                      disabled={(date) => {
                        const day = date.getDay()
                        // Disable Sundays (0) and past dates
                        return day === 0 || date < new Date()
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Hora
                </label>
                <select
                  id="time"
                  name="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Seleccione una hora</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
                Método de Pago
              </label>
              <select
                id="payment"
                name="payment"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccione un método de pago</option>
                <option value="card">Tarjeta de Crédito/Débito</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Solicitar Cita
            </Button>
          </form>
        </div>
      </div>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  )
}

