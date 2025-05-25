'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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

export default function AdminPage() {
  const [citas, setCitas] = useState<Cita[]>([])

  const fetchCitas = async () => {
    const querySnapshot = await getDocs(collection(db, 'citas'))
    const data: Cita[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Cita[]
    setCitas(data)
  }

  const eliminarCita = async (id: string) => {
    if (confirm('¿Estás seguro que quieres eliminar esta cita?')) {
      await deleteDoc(doc(db, 'citas', id))
      fetchCitas()
    }
  }

  const marcarAtendida = async (id: string) => {
    await updateDoc(doc(db, 'citas', id), {
      estado: 'atendida',
    })
    fetchCitas()
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Citas Registradas</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Tratamiento</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Pago</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id} className="border-b hover:bg-blue-50">
                <td className="px-4 py-2">{cita.nombreCompleto}</td>
                <td className="px-4 py-2">{cita.telefono}</td>
                <td className="px-4 py-2">{cita.correo}</td>
                <td className="px-4 py-2">{cita.tratamiento}</td>
                <td className="px-4 py-2">{cita.fecha}</td>
                <td className="px-4 py-2">{cita.hora}</td>
                <td className="px-4 py-2 capitalize">{cita.metodoPago}</td>
                <td className="px-4 py-2">{cita.estado ?? 'pendiente'}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => eliminarCita(cita.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                  {cita.estado !== 'atendida' && (
                    <button
                      onClick={() => marcarAtendida(cita.id)}
                      className="text-green-600 hover:underline"
                    >
                      Marcar atendida
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
