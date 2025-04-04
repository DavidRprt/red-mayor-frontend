import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getStrapiURL } from "@/lib/utils"

export async function GET() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("jwt")?.value

  if (!authToken) {
    return NextResponse.json(
      { error: "Usuario no autenticado." },
      { status: 401 }
    )
  }

  const baseUrl = getStrapiURL()
  const url = new URL("/api/user-detalle/by-user", baseUrl)

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message || "Error desconocido." },
        { status: response.status }
      )
    }

    const userDetails = await response.json()

    return NextResponse.json({ data: userDetails })
  } catch (error) {
    console.error("Error al obtener los detalles del usuario:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud." },
      { status: 500 }
    )
  }
}
