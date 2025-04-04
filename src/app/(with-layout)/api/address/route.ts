import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getStrapiURL } from "@/lib/utils"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  id: number
}

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

  let userId: number
  try {
    // Decodificar el token para obtener el ID del usuario
    const decoded: JwtPayload = jwtDecode(authToken)
    userId = decoded.id
  } catch (error) {
    console.error("Error al decodificar el token:", error)
    return NextResponse.json(
      { error: "Token inválido o mal formado." },
      { status: 400 }
    )
  }

  const baseUrl = getStrapiURL()
  const url = new URL("/api/direcciones", baseUrl)

  try {
    // Parsear el cuerpo de la solicitud
    const body = await req.json()

    // Validar campos requeridos
    const { direccion, ciudad, provincia, codigoPostal, referencias } = body
    if (!direccion || !ciudad || !provincia || !codigoPostal) {
      return NextResponse.json(
        { error: "Todos los campos requeridos deben completarse." },
        { status: 400 }
      )
    }

    // Enviar solicitud al endpoint de Strapi
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          users_permissions_user: userId,
          direccion,
          ciudad,
          provincia,
          codigoPostal,
          referencias,
        },
      }),
    })

    // Manejar errores de Strapi
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error en la API de Strapi:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Error al crear la dirección." },
        { status: response.status }
      )
    }

    // Respuesta exitosa
    const createdAddress = await response.json()
    return NextResponse.json({ data: createdAddress }, { status: 201 })
  } catch (error) {
    console.error("Error al procesar la solicitud:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud." },
      { status: 500 }
    )
  }
}
