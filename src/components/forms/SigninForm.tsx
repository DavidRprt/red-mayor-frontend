"use client"

import Link from "next/link"
import { useActionState } from "react"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { StrapiErrors } from "./StrapiErrors"
import { SubmitButton } from "./SubmitButton"
import { ZodErrors } from "@/components/forms/ZodErrors"
import { useRouter } from "next/navigation"
import { loginUserAction } from "@/data/actions/auth-actions"

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
}

export function SigninForm() {
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE)

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
                defaultValue={formState?.data?.identifier || ""}
              />
              {formState?.zodErrors?.identifier && (
                <p className="text-red-500 text-sm">
                  {formState.zodErrors.identifier[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="contraseña"
                defaultValue={formState?.data?.password || ""}
              />
              {formState?.zodErrors?.password && (
                <p className="text-red-500 text-sm">
                  {formState.zodErrors.password[0]}
                </p>
              )}
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
