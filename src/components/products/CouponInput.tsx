"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CouponInputProps {
  onApply: (couponCode: string) => void
}

export const CouponInput = () => {
  const [couponCode, setCouponCode] = useState<string>("")

  const handleApply = () => {
    if (couponCode.trim() === "") {
      return alert("Por favor ingresa un código de descuento válido.")
    }
    setCouponCode("") // Limpia el campo después de aplicar
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Cupón de Descuento
      </h3>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Ingresa tu código"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="default"
          className="bg-black text-white"
          onClick={handleApply}
        >
          Aplicar
        </Button>
      </div>
    </div>
  )
}
