"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CouponInputProps {
  onApplyAction: (discountPercentage: number, couponCode: string) => void
  disabled: boolean // Prop para desactivar el input y botón cuando el cupón esté aplicado
}

export const CouponInput = ({ onApplyAction, disabled }: CouponInputProps) => {
  const [couponCode, setCouponCode] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleApply = async () => {
    if (couponCode.trim() === "") {
      setError("Por favor ingresa un código de descuento válido.")
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cupones/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigo: couponCode }),
        }
      )

      if (!response.ok) {
        try {
          const data = await response.json()
          setError(data.message || "Cupón no válido.")
        } catch {
          setError("Cupón no válido.")
        }
        return
      }

      const { porcentajeDescuento } = await response.json()
      onApplyAction(porcentajeDescuento, couponCode)
      setCouponCode("") // Limpia el campo
      setError(null)
    } catch (error) {
      console.error("Error al validar el cupón:", error)
      setError("Hubo un error al validar el cupón. Inténtalo más tarde.")
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-md font-semibold text-gray-800">
        Cupón de Descuento
      </h3>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Ingresa tu código"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1"
          disabled={disabled}
        />
        <Button
          variant="default"
          className="bg-black text-white"
          onClick={handleApply}
          disabled={disabled}
        >
          Aplicar
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-sm text-gray-500">
        * Los descuentos no son acumulables.
      </p>
    </div>
  )
}
