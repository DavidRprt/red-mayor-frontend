"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error?.message || "Error al enviar el correo")
      }

      setMessage(
        "Se ha enviado un email con las instrucciones para restablecer tu contraseña."
      )

      // Opcional: Redirigir a la página de inicio de sesión
      setTimeout(() => {
        router.push("/signin")
      }, 5000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleForgotPassword} className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Recuperar contraseña
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tu correo electrónico para recibir un enlace de
              recuperación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSending}>
              {isSending ? "Enviando..." : "Recuperar contraseña"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/signin")}
            >
              Volver al inicio de sesión
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
