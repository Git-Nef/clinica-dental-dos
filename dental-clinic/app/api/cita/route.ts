import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cita from "@/models/Cita";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const nuevaCita = await Cita.create(body);
    return NextResponse.json({ ok: true, cita: nuevaCita });
  } catch (error) {
    console.error("Error al guardar cita:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const citas = await Cita.find().sort({ creada: -1 }).lean();
    return NextResponse.json({ citas });
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return NextResponse.json({ citas: [] }, { status: 500 });
  }
}
