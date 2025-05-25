"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  const [citas, setCitas] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("");

  const cargarCitas = async () => {
    const res = await fetch("/api/cita");
    const data = await res.json();
    setCitas(data.citas);
  };

  const eliminarCita = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar esta cita?")) return;
    const res = await fetch(`/api/cita/${id}`, { method: "DELETE" });
    if (res.ok) cargarCitas();
  };

  const toggleEstado = async (id: string, estadoActual: string) => {
    const nuevoEstado = estadoActual === "atendida" ? "pendiente" : "atendida";
    const res = await fetch(`/api/cita/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    if (res.ok) cargarCitas();
  };

  useEffect(() => {
    const interval = setInterval(cargarCitas, 3000); // Actualiza cada 3 segundos
    cargarCitas();
    return () => clearInterval(interval);
  }, []);

  const citasFiltradas = citas.filter((cita) => {
    const texto = filtro.toLowerCase();
    return (
      cita.nombre?.toLowerCase().includes(texto) ||
      cita.telefono?.includes(texto) ||
      cita.email?.toLowerCase().includes(texto) ||
      cita.servicio?.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-blue-900">
        Citas Registradas
      </h1>

      <div className="mb-6 max-w-md">
        <Input
          type="text"
          placeholder="Buscar por nombre, teléfono, correo o tratamiento"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200 shadow">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Tratamiento</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Pago</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map((cita) => (
              <tr key={cita._id} className="odd:bg-white even:bg-blue-50">
                <td className="border px-4 py-2">{cita.nombre}</td>
                <td className="border px-4 py-2">{cita.telefono}</td>
                <td className="border px-4 py-2">{cita.email}</td>
                <td className="border px-4 py-2">{cita.servicio}</td>
                <td className="border px-4 py-2">
                  {cita.fecha?.split("T")[0]}
                </td>
                <td className="border px-4 py-2">{cita.hora}</td>
                <td className="border px-4 py-2">{cita.metodoPago}</td>
                <td className="border px-4 py-2">
                  {cita.estado || "pendiente"}
                </td>
                <td className="border px-4 py-2 space-y-1 flex flex-col">
                  <button
                    onClick={() => toggleEstado(cita._id, cita.estado)}
                    className="text-blue-600 hover:underline"
                  >
                    {cita.estado === "atendida"
                      ? "Marcar pendiente"
                      : "Marcar atendida"}
                  </button>
                  <button
                    onClick={() => eliminarCita(cita._id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
