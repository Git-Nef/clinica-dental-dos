import mongoose, { Schema } from "mongoose";

const CitaSchema = new Schema({
  nombre: String,
  telefono: String,
  email: String,
  servicio: String,
  fecha: String,
  hora: String,
  metodoPago: String,
  creada: { type: Date, default: Date.now },
});

// Evita registrar el modelo más de una vez
export default mongoose.models.Cita || mongoose.model("Cita", CitaSchema);
