import { NextResponse } from "next/server"

export async function GET() {
  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.redxmayor.com"
      : "http://localhost:3000"

  const response = NextResponse.redirect(redirectUrl)

  // Eliminar cookies
  response.cookies.set("jwt", "", {
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? "https://www.redxmayor.com"
        : "localhost",
    expires: new Date(0), // Expirar inmediatamente
    httpOnly: true,
  })
  response.cookies.set("username", "", {
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? "https://www.redxmayor.com"
        : "localhost",
    expires: new Date(0),
  })
  response.cookies.set("isLoggedIn", "", {
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? "https://www.redxmayor.com"
        : "localhost",
    expires: new Date(0),
  })

  return response
}
