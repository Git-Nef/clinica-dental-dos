"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Search, Calendar, Clock, Phone, User, Mail, Filter, Trash2, Check, Edit, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Componente de selector de reloj
const ClockPicker = ({
  value,
  onChange,
  onClose,
}: { value: string; onChange: (time: string) => void; onClose: () => void }) => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)
  const [isSelectingMinutes, setIsSelectingMinutes] = useState(false)

  const hours = [9, 10, 11, 12, 13, 16, 17, 18, 19]
  const minutes = [0, 15, 30, 45]

  useEffect(() => {
    if (value && value.includes(":")) {
      const [hour, minute] = value.split(":").map(Number)
      setSelectedHour(hour)
      setSelectedMinute(minute)
    }
  }, [value])

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour)
    setIsSelectingMinutes(true)
  }

  const handleMinuteSelect = (minute: number) => {
    setSelectedMinute(minute)
    if (selectedHour !== null) {
      const timeString = `${selectedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      onChange(timeString)
      onClose()
    }
  }

  const getHourPosition = (hour: number, index: number) => {
    const angle = index * 40 - 90 // Distribuir las horas disponibles
    const radius = 80
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = Math.sin((angle * Math.PI) / 180) * radius
    return { x: x + 100, y: y + 100 }
  }

  const getMinutePosition = (minute: number, index: number) => {
    const angle = index * 90 - 90 // 4 posiciones para los minutos
    const radius = 60
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = Math.sin((angle * Math.PI) / 180) * radius
    return { x: x + 100, y: y + 100 }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {isSelectingMinutes ? "Seleccionar Minutos" : "Seleccionar Hora"}
          </h3>
          {selectedHour !== null && (
            <p className="text-sm text-gray-600">
              {isSelectingMinutes
                ? `${selectedHour}:${selectedMinute !== null ? selectedMinute.toString().padStart(2, "0") : "__"}`
                : `${selectedHour}:__`}
            </p>
          )}
        </div>

        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Círculo del reloj */}
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>

          {/* Centro del reloj */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>

          {!isSelectingMinutes
            ? // Mostrar horas
              hours.map((hour, index) => {
                const position = getHourPosition(hour, index)
                const isSelected = selectedHour === hour
                return (
                  <button
                    key={hour}
                    onClick={() => handleHourSelect(hour)}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-600 text-white scale-110"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105"
                    }`}
                    style={{ left: position.x, top: position.y }}
                  >
                    {hour}
                  </button>
                )
              })
            : // Mostrar minutos
              minutes.map((minute, index) => {
                const position = getMinutePosition(minute, index)
                const isSelected = selectedMinute === minute
                return (
                  <button
                    key={minute}
                    onClick={() => handleMinuteSelect(minute)}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-600 text-white scale-110"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105"
                    }`}
                    style={{ left: position.x, top: position.y }}
                  >
                    {minute.toString().padStart(2, "0")}
                  </button>
                )
              })}
        </div>

        <div className="flex justify-center space-x-2">
          {isSelectingMinutes && (
            <Button variant="outline" onClick={() => setIsSelectingMinutes(false)} className="text-sm">
              Volver a Horas
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="text-sm">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}

type Cita = {
  id: string
  nombreCompleto: string
  telefono: string
  correo: string
  tratamiento: string
  fecha: string
  hora: string
  metodoPago: string
  estado?: string
}

export default function AdminDashboard() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [timeFilter, setTimeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [filteredCitas, setFilteredCitas] = useState<Cita[]>([])
  const [editingCita, setEditingCita] = useState<Cita | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<Cita>({
    id: "",
    nombreCompleto: "",
    telefono: "",
    correo: "",
    tratamiento: "",
    fecha: "",
    hora: "",
    metodoPago: "",
    estado: "",
  })

  const [showClockPicker, setShowClockPicker] = useState(false)

  const fetchCitas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "citas"))
      const data: Cita[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cita[]
      setCitas(data)
    } catch (error) {
      console.error("Error fetching citas:", error)
    }
  }

  const eliminarCita = async (id: string) => {
    if (confirm("¿Estás seguro que quieres eliminar esta cita?")) {
      try {
        await deleteDoc(doc(db, "citas", id))
        fetchCitas()
      } catch (error) {
        console.error("Error deleting cita:", error)
      }
    }
  }

  const marcarAtendida = async (id: string) => {
    try {
      await updateDoc(doc(db, "citas", id), {
        estado: "atendida",
      })
      fetchCitas()
    } catch (error) {
      console.error("Error updating cita:", error)
    }
  }

  const abrirModalEdicion = (cita: Cita) => {
    setEditingCita(cita)
    setEditForm({ ...cita })
    setIsEditModalOpen(true)
  }

  const cerrarModalEdicion = () => {
    setEditingCita(null)
    setIsEditModalOpen(false)
    setEditForm({
      id: "",
      nombreCompleto: "",
      telefono: "",
      correo: "",
      tratamiento: "",
      fecha: "",
      hora: "",
      metodoPago: "",
      estado: "",
    })
  }

  const guardarCambios = async () => {
    if (!editingCita) return

    try {
      const citaRef = doc(db, "citas", editingCita.id)
      const updateData = {
        nombreCompleto: editForm.nombreCompleto,
        telefono: editForm.telefono,
        correo: editForm.correo,
        tratamiento: editForm.tratamiento,
        fecha: editForm.fecha,
        hora: editForm.hora,
        metodoPago: editForm.metodoPago,
        estado: editForm.estado || "pendiente",
      }

      await updateDoc(citaRef, updateData)
      await fetchCitas()
      cerrarModalEdicion()
      alert("Cita actualizada exitosamente")
    } catch (error) {
      console.error("Error updating cita:", error)
      alert("Error al actualizar la cita")
    }
  }

  const handleInputChange = (field: keyof Cita, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Función para formatear la fecha correctamente
  const formatDateForComparison = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "T00:00:00")
    return date.toISOString().split("T")[0]
  }

  // Función para formatear la hora con estilo de reloj
  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return ""

    // Si la hora ya tiene formato HH:MM, la usamos directamente
    if (timeString.includes(":")) {
      const [hours, minutes] = timeString.split(":")
      const hour24 = Number.parseInt(hours)
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
      const ampm = hour24 >= 12 ? "PM" : "AM"

      return {
        time: `${hour12.toString().padStart(2, "0")}:${minutes}`,
        period: ampm,
        hour24: timeString,
      }
    }

    return {
      time: timeString,
      period: "",
      hour24: timeString,
    }
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  useEffect(() => {
    let filtered = citas

    // Filtrar por búsqueda (nombre o teléfono)
    if (searchTerm) {
      filtered = filtered.filter(
        (cita) =>
          cita.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || cita.telefono.includes(searchTerm),
      )
    }

    // Filtrar por fecha - mejorado
    if (dateFilter) {
      filtered = filtered.filter((cita) => {
        const citaDate = formatDateForComparison(cita.fecha)
        return citaDate === dateFilter
      })
    }

    // Filtrar por hora - mejorado
    if (timeFilter) {
      filtered = filtered.filter((cita) => {
        if (!cita.hora) return false

        // Si la hora incluye ":", extraemos solo la hora
        if (cita.hora.includes(":")) {
          const citaHour = cita.hora.split(":")[0]
          return citaHour === timeFilter
        }

        // Si no, comparamos directamente
        return cita.hora.startsWith(timeFilter)
      })
    }

    // Filtrar por estado
    if (statusFilter) {
      const estado = statusFilter === "pendiente" ? undefined : statusFilter
      filtered = filtered.filter((cita) => (cita.estado ?? "pendiente") === (estado ?? "pendiente"))
    }

    setFilteredCitas(filtered)
  }, [searchTerm, dateFilter, timeFilter, statusFilter, citas])

  const getStatusColor = (status?: string) => {
    const estado = status ?? "pendiente"
    switch (estado) {
      case "atendida":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const tratamientos = [
    "Limpieza dental",
    "Blanqueamiento",
    "Ortodoncia",
    "Endodoncia",
    "Extracción",
    "Implante dental",
    "Corona dental",
    "Puente dental",
    "Prótesis",
    "Consulta general",
  ]

  const metodosPago = ["efectivo", "tarjeta", "transferencia", "seguro"]

  const horasDisponibles = ["09:00", "10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"]

  // Opciones para el filtro de hora
  const opcionesHora = [
    { value: "09", label: "9:00 AM" },
    { value: "10", label: "10:00 AM" },
    { value: "11", label: "11:00 AM" },
    { value: "12", label: "12:00 PM" },
    { value: "13", label: "1:00 PM" },
    { value: "16", label: "4:00 PM" },
    { value: "17", label: "5:00 PM" },
    { value: "18", label: "6:00 PM" },
    { value: "19", label: "7:00 PM" },
  ]

  return (
    <section className="min-h-screen bg-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 md:text-4xl">Panel de Administración</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-700">
            Gestión de citas y pacientes de Odontología Integral Especializada
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-blue-600"></div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Búsqueda */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-semibold text-blue-900 mb-2">
                Buscar por nombre o teléfono
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                <input
                  id="search"
                  type="text"
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Filtro por fecha */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-blue-900 mb-2">
                Filtrar por fecha
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                <input
                  id="date"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Filtro por hora */}
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-blue-900 mb-2">
                Filtrar por hora
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                <select
                  id="time"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700"
                >
                  <option value="">Todas las horas</option>
                  {opcionesHora.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro por estado */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-blue-900 mb-2">
                Estado
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600" />
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700"
                >
                  <option value="">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="atendida">Atendida</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de citas */}
        <div className="rounded-lg bg-white shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <h3 className="text-xl font-bold">Citas Registradas</h3>
            <p className="text-blue-100">Total: {filteredCitas.length} citas</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Paciente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Contacto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Fecha y Hora</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Tratamiento</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Método de Pago</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCitas.map((cita) => {
                  const timeDisplay = formatTimeDisplay(cita.hora)
                  return (
                    <tr key={cita.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 mr-3">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{cita.nombreCompleto}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-blue-600" />
                            {cita.telefono}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-blue-600" />
                            {cita.correo}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                            {new Date(cita.fecha + "T00:00:00").toLocaleDateString("es-ES", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">{timeDisplay.time}</span>
                              {timeDisplay.period && (
                                <span className="text-xs text-blue-600 font-medium">{timeDisplay.period}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{cita.tratamiento}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">{cita.metodoPago}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cita.estado)}`}
                        >
                          {(cita.estado ?? "pendiente").charAt(0).toUpperCase() + (cita.estado ?? "pendiente").slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => abrirModalEdicion(cita)}
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            title="Editar cita"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </button>
                          {(cita.estado ?? "pendiente") !== "atendida" && (
                            <button
                              onClick={() => marcarAtendida(cita.id)}
                              className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                              title="Marcar como atendida"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Atender
                            </button>
                          )}
                          <button
                            onClick={() => eliminarCita(cita.id)}
                            className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                            title="Eliminar cita"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredCitas.length === 0 && (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron citas</h3>
              <p className="text-gray-600">
                {citas.length === 0
                  ? "No hay citas registradas en el sistema"
                  : "Intenta ajustar los filtros de búsqueda"}
              </p>
            </div>
          )}
        </div>

        {/* Modal de edición */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-900">
                Editar Cita - {editingCita?.nombreCompleto}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Información del paciente */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Información del Paciente</h3>

                <div className="grid gap-2">
                  <Label htmlFor="edit-nombre">Nombre Completo</Label>
                  <Input
                    id="edit-nombre"
                    value={editForm.nombreCompleto}
                    onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
                    placeholder="Nombre completo del paciente"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-telefono">Teléfono</Label>
                    <Input
                      id="edit-telefono"
                      value={editForm.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="Número de teléfono"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-correo">Correo Electrónico</Label>
                    <Input
                      id="edit-correo"
                      type="email"
                      value={editForm.correo}
                      onChange={(e) => handleInputChange("correo", e.target.value)}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
              </div>

              {/* Información de la cita */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-2">Información de la Cita</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-fecha">Fecha</Label>
                    <Input
                      id="edit-fecha"
                      type="date"
                      value={editForm.fecha}
                      onChange={(e) => handleInputChange("fecha", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-hora">Hora</Label>
                    <div className="relative">
                      <Button
                        variant="outline"
                        onClick={() => setShowClockPicker(true)}
                        className="w-full justify-start text-left font-normal"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {editForm.hora || "Seleccionar hora"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-tratamiento">Tratamiento</Label>
                  <Select
                    value={editForm.tratamiento}
                    onValueChange={(value) => handleInputChange("tratamiento", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tratamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {tratamientos.map((tratamiento) => (
                        <SelectItem key={tratamiento} value={tratamiento}>
                          {tratamiento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-metodoPago">Método de Pago</Label>
                    <Select
                      value={editForm.metodoPago}
                      onValueChange={(value) => handleInputChange("metodoPago", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        {metodosPago.map((metodo) => (
                          <SelectItem key={metodo} value={metodo}>
                            {metodo.charAt(0).toUpperCase() + metodo.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-estado">Estado</Label>
                    <Select
                      value={editForm.estado || "pendiente"}
                      onValueChange={(value) => handleInputChange("estado", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="atendida">Atendida</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={cerrarModalEdicion}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={guardarCambios} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
            {showClockPicker && (
              <ClockPicker
                value={editForm.hora}
                onChange={(time) => {
                  handleInputChange("hora", time)
                  setShowClockPicker(false)
                }}
                onClose={() => setShowClockPicker(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
