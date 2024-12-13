import { getStrapiURL } from "@/lib/utils"

interface RegisterUserProps {
  username: string
  password: string
  email: string
}

interface LoginUserProps {
  identifier: string
  password: string
}

interface UserDetailsProps {
  user: number
  razonSocial: string
  telefono: string
  CUIT: string
  tipoUsuario: string
}

const baseUrl = getStrapiURL()

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", baseUrl)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    })

    return response.json()
  } catch (error) {
    console.error("Registration Service Error:", error)
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    })

    return response.json()
  } catch (error) {
    console.error("Login Service Error:", error)
    throw error
  }
}

export async function createUserDetailsService(userDetails: UserDetailsProps) {
  const url = new URL("/api/user-detalles", baseUrl)


  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: userDetails }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("UserDetails Service Error:", errorData)
      return null
    }

    return response.json()
  } catch (error) {
    console.error("UserDetails Service Error:", error)
    return null
  }
}