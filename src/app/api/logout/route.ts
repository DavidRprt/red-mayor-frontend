import { NextResponse } from "next/server"

export async function GET() {
  const response = NextResponse.redirect("http://localhost:3000")

  // Eliminar cookies 
  response.cookies.set("jwt", "", {
    path: "/",
    domain: ".localhost",
    expires: new Date(0),
    httpOnly: true,
  })
  response.cookies.set("username", "", {
    path: "/",
    domain: ".localhost",
    expires: new Date(0),
  })
  response.cookies.set("isLoggedIn", "", {
    path: "/",
    domain: ".localhost",
    expires: new Date(0),
  })

  return response
}
