// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      ok: true,
      message: "Conexión a MongoDB exitosa 🎉",
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    return NextResponse.json(
      { ok: false, error: "Error al conectar con la base de datos 😵‍💫" },
      { status: 500 }
    );
  }
}
