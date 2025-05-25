'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { auth } from '@/lib/auth'
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
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [citas, setCitas] = useState<Cita[]>([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const fetchCitas = async () => {
    const querySnapshot = await getDocs(collection(db, 'citas'))
    const data: Cita[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Cita[]
    setCitas(data)
  }

  const eliminarCita = async (id: string) => {
    if (confirm('¿Eliminar esta cita?')) {
      await deleteDoc(doc(db, 'citas', id))
      fetchCitas()
    }
  }

  const marcarAtendida = async (id: string) => {
    await updateDoc(doc(db, 'citas', id), { estado: 'atendida' })
    fetchCitas()
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  const citasFiltradas = citas.filter((cita) =>
    cita.nombreCompleto.toLowerCase().includes(filtro.toLowerCase()) ||
    cita.fecha.includes(filtro)
  )

  if (loading) return <p className="p-4">Cargando...</p>
  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    }
    return null
  }

  return (
    <section className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">Citas Registradas</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o fecha (YYYY-MM-DD)"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={() => signOut(auth).then(() => window.location.href = '/admin/login')}
          className="text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>

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
            {citasFiltradas.map((cita) => (
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
