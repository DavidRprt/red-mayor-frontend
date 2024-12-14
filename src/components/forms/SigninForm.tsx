"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useEffect } from "react"
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

  useEffect(() => {
    if (formState.success && formState.username && formState.expiresAt) {
      setUser(formState.username, formState.expiresAt)
      router.push("/")
    }
  }, [formState, setUser, router])

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
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="contraseña"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Iniciar sesión"
              loadingText="Cargando..."
            />
            <StrapiErrors error={formState?.strapiErrors} />
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
