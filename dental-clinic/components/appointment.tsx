"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  "Restauración de amalgama",
  "Incrustaciones e.max o metálicas",
  "Coronas de metal porcelana",
  "Extracciones",
  "Endopostes",
  "Coronas libres de metal y carillas e.max",
];

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
];

export default function Appointment() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const paymentRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [date, setDate] = useState<Date>();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setMensaje("Por favor seleccione una fecha.");
      setOpen(true);
      return;
    }

    const data = {
      nombre: nameRef.current?.value || "",
      telefono: phoneRef.current?.value || "",
      email: emailRef.current?.value || "",
      servicio: serviceRef.current?.value || "",
      fecha: date.toISOString(),
      hora: timeRef.current?.value || "",
      metodoPago: paymentRef.current?.value || "",
    };

    try {
      const res = await fetch("/api/cita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.ok) {
        setMensaje("Cita guardada con éxito 🦷");
        setOpen(true);
        formRef.current?.reset();
        setDate(undefined);
      } else {
        setMensaje("Error al guardar la cita 😵");
        setOpen(true);
        console.error(result.error);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor 😓");
      setOpen(true);
      console.error("Error de red:", error);
    }
  };

  return (
    <section id="citas" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">
            Agende su Cita
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-700">
            Complete el formulario a continuación para solicitar una cita. Nos
            pondremos en contacto con usted para confirmar la fecha y hora.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="mx-auto max-w-3xl rounded-lg bg-blue-50 p-6 shadow-lg md:p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Completo
                </label>
                <input
                  id="name"
                  ref={nameRef}
                  placeholder="Ingrese su nombre completo"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  ref={phoneRef}
                  type="tel"
                  placeholder="Ingrese su número telefónico"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                ref={emailRef}
                type="email"
                placeholder="Ingrese su correo electrónico"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700"
              >
                Tratamiento
              </label>
              <select
                id="service"
                ref={serviceRef}
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
                <label className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={es}
                      disabled={(date) => {
                        const day = date.getDay();
                        return day === 0 || date < new Date();
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora
                </label>
                <select
                  id="time"
                  ref={timeRef}
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
              <label
                htmlFor="payment"
                className="block text-sm font-medium text-gray-700"
              >
                Método de Pago
              </label>
              <select
                id="payment"
                ref={paymentRef}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccione un método de pago</option>
                <option value="card">Tarjeta de Crédito/Débito</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Solicitar Cita
            </Button>
          </form>
        </div>
      </div>

      {/* Modal visual */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-green-700 text-lg">
              ✅ ¡Listo!
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-700">{mensaje}</p>
          <div className="mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
