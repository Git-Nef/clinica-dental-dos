export default function About() {
  return (
    <section id="nosotros" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">Conozca a Nuestro Especialista</h2>
          <div className="mx-auto h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex items-center justify-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Dr. Cristobal Silva Vázquez"
              className="rounded-full shadow-lg"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-2xl font-bold text-blue-800">Dr. Cristobal Silva Vázquez</h3>
            <p className="mb-4 text-blue-600">Cirujano Dentista - Especialista en Ortodoncia y Ortopedia Dentofacial</p>
            <div className="mb-6 h-1 w-16 bg-blue-600"></div>
            <p className="mb-4 text-gray-700">
              Con más de 40 años de experiencia en el campo de la odontología, el Dr. Cristobal Silva Vázquez ha
              dedicado su carrera profesional a brindar atención dental de la más alta calidad a sus pacientes.
            </p>
            <p className="mb-4 text-gray-700">
              Graduado con un título en Cirugía Dental y con una especialización de postgrado en Ortodoncia y Ortopedia
              Dentofacial, el Dr. Silva combina su amplio conocimiento teórico con una vasta experiencia práctica para
              ofrecer tratamientos personalizados y efectivos.
            </p>
            <p className="text-gray-700">
              Su compromiso con la excelencia y la atención centrada en el paciente lo ha convertido en uno de los
              dentistas más respetados y confiables de la región.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

