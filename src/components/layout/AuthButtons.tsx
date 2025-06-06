"use client"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { User } from "lucide-react"
import UserCartButtons from "./UserCartButtons"

interface AuthButtonsProps {
  onAction?: () => void
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onAction }) => {
  const { username, isLoggedIn, logout } = useAuthStore()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const response = await fetch("https://www.redxmayor.com", {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        logout()
        router.refresh()
        onAction?.()
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
          <Button
            onClick={() => {
              router.push("/signin")
              onAction?.()
            }}
          >
            Iniciar sesión
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              router.push("/signup")
              onAction?.()
            }}
          >
            Registrarse
          </Button>
        </div>
      )}

      {isLoggedIn && (
        <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-4">
          <div className="hidden sm:block">
            <UserCartButtons />
          </div>

          <Button
            variant="destructive"
            className="text-white"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      )}
    </>
  )
}

export default AuthButtons
