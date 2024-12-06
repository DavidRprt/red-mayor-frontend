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
import { Button } from "../ui/button"
import { ZodErrors } from "@/components/forms/ZodErrors"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useActionState } from "react"
import { registerUserAction } from "@/app/actions/auth-actions"

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

  console.log(formState)

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
                  <Label htmlFor="businessName">Nombre del negocio</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Nombre del negocio"
                  />
                  {formState?.zodErrors?.businessName && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.businessName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalName">Razón social</Label>
                  <Input
                    id="legalName"
                    name="legalName"
                    type="text"
                    placeholder="Razón social"
                  />
                  {formState?.zodErrors?.legalName && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.legalName[0]}
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
                  />
                  {formState?.zodErrors?.email && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.email[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Número de teléfono"
                  />
                  {formState?.zodErrors?.phone && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.phone[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Segunda columna */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cuit">CUIT</Label>
                  <Input id="cuit" name="cuit" type="text" placeholder="CUIT" />
                  {formState?.zodErrors?.cuit && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.cuit[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userType">Tipo de usuario</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="persona_fisica">
                        Persona Física (Monotributo)
                      </SelectItem>
                      <SelectItem value="sociedad">Sociedad</SelectItem>
                      <SelectItem value="responsable_inscripto">
                        Responsable Inscripto
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formState?.zodErrors?.userType && (
                    <p className="text-red-500 text-sm">
                      {formState.zodErrors.userType[0]}
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
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
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
