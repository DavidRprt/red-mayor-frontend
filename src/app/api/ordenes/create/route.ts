import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getStrapiURL } from "@/lib/utils"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("jwt")?.value

  // Validación de autenticación
  if (!authToken) {
    return NextResponse.json(
      { error: "Usuario no autenticado." },
      { status: 401 }
    )
  }

  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json()
    const { metodoPago, direccion, productos, observaciones } = body

    // Validar campos requeridos
    if (!metodoPago || !direccion || !productos || productos.length === 0) {
      return NextResponse.json(
        { error: "Todos los campos requeridos deben completarse." },
        { status: 400 }
      )
    }

    // URL del endpoint de Strapi
    const baseUrl = getStrapiURL()
    const url = new URL("/api/ordenes/create-with-products", baseUrl)

    // Enviar la solicitud al endpoint de Strapi
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        metodoPago,
        direccion,
        productos,
        observaciones
      }),
    })

    // Manejar errores de Strapi
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error en la API de Strapi:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Error al crear la orden." },
        { status: response.status }
      )
    }

    // Respuesta exitosa
    const createdOrder = await response.json()
    return NextResponse.json({ data: createdOrder }, { status: 201 })
  } catch (error) {
    console.error("Error al procesar la solicitud:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud." },
      { status: 500 }
    )
  }
}
