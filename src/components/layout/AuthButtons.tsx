"use client"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

const AuthButtons = () => {
  const { username, isLoggedIn, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "GET" })

      if (response.ok) {
        logout()
        router.refresh()
      } else {
        console.error("Error al cerrar sesión:", response.statusText)
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <>
      {!isLoggedIn && (
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <Button variant="default" onClick={() => router.push("/signin")}>
            Iniciar sesión
          </Button>
          <Button variant="secondary" onClick={() => router.push("/signup")}>
            Registrarse
          </Button>
        </div>
      )}

      {isLoggedIn && (
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <Button variant="outline" disabled>
            {username}
          </Button>
          <Button variant="destructive" className="text-white" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      )}
    </>
  )
}

export default AuthButtons
