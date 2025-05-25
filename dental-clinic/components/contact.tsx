import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  return (
    <section id="contacto" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">Contacto y Ubicación</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-700">
            Estamos aquí para atenderle. No dude en contactarnos para cualquier consulta o para agendar una cita.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="rounded-lg bg-blue-50 p-6 shadow-md">
            <h3 className="mb-6 text-2xl font-bold text-blue-800">Información de Contacto</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Dirección</h4>
                  <p className="text-gray-700">Ana Leyva 204, 3er Piso, Plaza Las Torres</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Teléfono</h4>
                  <p className="text-gray-700">8175260 / 6181453676</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Correo Electrónico</h4>
                  <p className="text-gray-700">ssilvav@hotmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Horario de Atención</h4>
                  <p className="text-gray-700">
                    Lunes - Viernes: 11:00 AM - 1:00 PM & 4:00 PM - 7:30 PM
                    <br />
                    Sábado: 11:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.0304947633017!2d-104.65079162559897!3d24.029989777987073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb7dcc3ed9a21%3A0xfbac8d5db7cbf8c4!2sPlaza%20Las%20Torres%20Durango!5e0!3m2!1ses!2smx!4v1748205550878!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ubicación de Odontología Integral Especializada"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

