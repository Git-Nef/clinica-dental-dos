import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    id: 1,
    name: "Restauración de amalgama",
    price: "$600",
    description: "Restauraciones duraderas para dientes posteriores",
  },
  {
    id: 2,
    name: "Incrustaciones e.max o metálicas",
    price: "$2,000",
    description: "Restauraciones indirectas de alta calidad y precisión",
  },
  {
    id: 3,
    name: "Coronas de metal porcelana",
    price: "$3,500",
    description: "Combinación de resistencia y estética para restauraciones completas",
  },
  {
    id: 4,
    name: "Extracciones",
    price: "$1,000",
    description: "Procedimiento para remover dientes dañados o problemáticos",
  },
  {
    id: 5,
    name: "Endopostes",
    price: "$1,300",
    description: "Reconstrucción de dientes tratados endodónticamente",
  },
  {
    id: 6,
    name: "Coronas libres de metal y carillas e.max",
    price: "$4,500",
    description: "Soluciones estéticas de alta calidad para una sonrisa perfecta",
  },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">Nuestros Servicios</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-700">
            Ofrecemos una amplia gama de tratamientos dentales para satisfacer todas sus necesidades de salud bucal.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-2xl font-bold text-blue-900">{service.price}</p>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

