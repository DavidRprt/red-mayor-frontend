"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { StrapiErrors } from "./StrapiErrors"
import { SubmitButton } from "./SubmitButton"
import { loginUserAction } from "@/data/actions/auth-actions"
import { Eye, EyeOff } from "lucide-react"

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  message: null,
  success: false,
  username: null,
  expiresAt: null,
}

export function SigninForm() {
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE)
  const { setUser } = useAuthStore()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (formState.success && formState.username && formState.expiresAt) {
      setUser(formState.username, formState.expiresAt)
      router.push("/")
    }
  }, [formState, setUser, router])

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus datos para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Correo electrónico o Usuario</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="nombre de usuario o correo"
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="contraseña"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <SubmitButton
              className="w-full"
              text="Iniciar sesión"
              loadingText="Cargando..."
            />
            <StrapiErrors error={formState?.strapiErrors} />
            <div className="mt-4 text-center text-sm">
              <Link className="underline text-primary" href="/forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?
          <Link className="underline ml-2" href="/signup">
            Registrarse
          </Link>
        </div>
      </form>
    </div>
  )
}
