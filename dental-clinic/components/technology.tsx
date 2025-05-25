import { CheckCircle } from "lucide-react"

export default function Technology() {
  return (
    <section className="bg-blue-600 py-16 text-white md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tecnología y Equipamiento</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Utilizamos tecnología de vanguardia para proporcionar diagnósticos precisos y tratamientos eficaces.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-white"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex items-center justify-center">
            <img
              src="/img/equipo1.jpg?height=400&width=600"
              alt="Radiovisiografo para radiografías digitales"
              className="rounded-lg shadow-lg"
              width={600}
              height={400}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold">Equipamiento Avanzado para su Cuidado Dental</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-blue-200" />
                <div>
                  <h4 className="text-xl font-semibold">Radiovisiografo</h4>
                  <p className="text-blue-100">
                    Tecnología de radiografía digital instantánea que reduce significativamente la exposición a la
                    radiación y proporciona imágenes de alta resolución para diagnósticos precisos.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-blue-200" />
                <div>
                  <h4 className="text-xl font-semibold">Equipos de Esterilización Avanzados</h4>
                  <p className="text-blue-100">
                    Utilizamos los más altos estándares de esterilización para garantizar su seguridad y bienestar
                    durante todos los procedimientos.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-blue-200" />
                <div>
                  <h4 className="text-xl font-semibold">Materiales de Primera Calidad</h4>
                  <p className="text-blue-100">
                    Trabajamos exclusivamente con materiales dentales de la más alta calidad para garantizar resultados
                    duraderos y estéticamente superiores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

