// hooks/use-submit-cita.ts
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useSubmitCita = () => {
  const submitCita = async (datos: {
    nombreCompleto: string
    telefono: string
    correo: string
    tratamiento: string
    fecha: string
    hora: string
    metodoPago: string
  }) => {
    try {
      await addDoc(collection(db, 'citas'), {
        ...datos,
        fechaCreacion: Timestamp.now(),
      })
      await fetch('http://localhost:5001/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(datos),
})

      return { success: true }
    } catch (error) {
      console.error('Error al guardar la cita:', error)
      return { success: false, error }
    }
  }

  return { submitCita }
}
