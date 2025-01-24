/* "use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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

const ResetPasswordPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const codeFromParams = searchParams.get("code")
    if (!codeFromParams) {
      setCode(null)
      setError("Código no válido o faltante en la URL.")
    } else {
      setCode(codeFromParams)
    }
  }, [searchParams])

  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) {
      setError("El código es inválido o está ausente.")
      return
    }

    setIsSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            password,
            passwordConfirmation,
          }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.error?.message || "Error al restablecer la contraseña"
        )
      }

      setMessage("Tu contraseña ha sido restablecida exitosamente.")
      setTimeout(() => {
        router.push("/signin")
      }, 5000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleResetPassword} className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Restablecer contraseña
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tu nueva contraseña para restablecer el acceso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}
            {!error && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordConfirmation">
                    Confirmar nueva contraseña
                  </Label>
                  <Input
                    id="passwordConfirmation"
                    type="password"
                    placeholder="Confirma tu nueva contraseña"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {!error && (
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
              </Button>
            )}
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

export default ResetPasswordPage
 */