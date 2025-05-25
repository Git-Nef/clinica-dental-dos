import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cita from "@/models/Cita";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Cita.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const cita = await Cita.findByIdAndUpdate(
    params.id,
    { estado: body.estado },
    { new: true }
  );
  return NextResponse.json({ ok: true, cita });
}
