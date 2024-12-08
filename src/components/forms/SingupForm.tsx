"use client"

import Link from "next/link"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"
import { ZodErrors } from "@/components/forms/ZodErrors"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { StrapiErrors } from "./StrapiErrors"
import { SubmitButton } from "./SubmitButton"

import { useActionState } from "react"
import { registerUserAction } from "@/data/actions/auth-actions"

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
}

export function SignupForm() {
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE
  )
  console.log("Form State:", formState)
  return (
    <div className="w-full max-w-2xl sm:py-0">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Registrarse</CardTitle>
            <CardDescription>
              Ingresa tus datos para crear una nueva cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Grid layout for desktop */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Primera columna */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre del negocio</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Nombre del negocio"
                    defaultValue={formState?.data?.username || ""}
                  />
                  {formState?.zodErrors?.username && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.username[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razonSocial">Razón social</Label>
                  <Input
                    id="razonSocial"
                    name="razonSocial"
                    type="text"
                    placeholder="Razón social"
                    defaultValue={formState?.data?.razonSocial || ""}
                  />
                  {formState?.zodErrors?.razonSocial && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.razonSocial[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    defaultValue={formState?.data?.email || ""}
                  />
                  {formState?.zodErrors?.email && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.email[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="text"
                    placeholder="Número de teléfono"
                    defaultValue={formState?.data?.telefono || ""}
                  />
                  {formState?.zodErrors?.telefono && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.telefono[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Segunda columna */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cuit">CUIT</Label>
                  <Input
                    id="cuit"
                    name="cuit"
                    type="text"
                    placeholder="CUIT"
                    defaultValue={formState?.data?.cuit || ""}
                  />
                  {formState?.zodErrors?.cuit && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.cuit[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoUsuario">Tipo de usuario</Label>
                  <Select
                    name="tipoUsuario"
                    defaultValue={
                      formState?.data?.tipoUsuario ||
                      "Persona Física (Monotributo)"
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Persona Física (Monotributo)">
                        Persona Física (Monotributo)
                      </SelectItem>
                      <SelectItem value="Responsable Inscripto">
                        Responsable Inscripto
                      </SelectItem>
                      <SelectItem value="Sociedad">Sociedad</SelectItem>
                    </SelectContent>
                  </Select>
                  {formState?.zodErrors?.tipoUsuario && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.tipoUsuario[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    defaultValue={formState?.data?.password || ""}
                  />
                  {formState?.zodErrors?.password && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.password[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Verificar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    defaultValue={formState?.data?.confirmPassword || ""}
                  />
                  {formState?.zodErrors?.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.confirmPassword[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Registrarse"
              loadingText="Cargando"
            ></SubmitButton>
            <StrapiErrors error={formState.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?
          <Link className="underline ml-2" href="signin">
            Iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  )
}
