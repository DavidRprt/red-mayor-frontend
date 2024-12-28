"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import { useState } from "react"

// Schema de validación para la nueva dirección
const NewAddressSchema = z.object({
  direccion: z.string().min(1, "La dirección es obligatoria"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  provincia: z.string().min(1, "La provincia es obligatoria"),
  codigoPostal: z.string().min(4, "El código postal es obligatorio"),
  referencias: z.string().optional(),
})

type NewAddress = z.infer<typeof NewAddressSchema>

const provinces = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
]

export const AddAddressPopover = () => {
  const [newAddress, setNewAddress] = useState<NewAddress>({
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    referencias: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddAddress = async (address: NewAddress) => {
    try {
      const response = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al agregar la dirección.")
      }

      window.location.reload()
    } catch (error) {
      console.error("Error al agregar la dirección:", error)
      throw error
    }
  }

  const handleSubmit = async () => {
    const parsed = NewAddressSchema.safeParse(newAddress)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await handleAddAddress(parsed.data)

      // Resetear formulario
      setNewAddress({
        direccion: "",
        ciudad: "",
        provincia: "",
        codigoPostal: "",
        referencias: "",
      })
      setIsPopoverOpen(false)
    } catch (error) {
      console.error("Error al enviar la dirección:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          Agregar Nueva Dirección
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Nueva Dirección</h4>
            <p className="text-sm text-muted-foreground">
              Completa los campos para agregar una nueva dirección.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={newAddress.direccion}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, direccion: e.target.value })
                }
                className="col-span-2 h-8"
                placeholder="Ej: Av. Siempre Viva 742"
              />
              {errors.direccion && (
                <p className="text-sm text-red-500 col-span-3">
                  {errors.direccion}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                value={newAddress.ciudad}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, ciudad: e.target.value })
                }
                className="col-span-2 h-8"
                placeholder="Ej: Buenos Aires"
              />
              {errors.ciudad && (
                <p className="text-sm text-red-500 col-span-3">
                  {errors.ciudad}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="provincia">Provincia</Label>
              <Select
                onValueChange={(value) =>
                  setNewAddress({ ...newAddress, provincia: value })
                }
              >
                <SelectTrigger className="col-span-2 h-8">
                  <SelectValue
                    placeholder={
                      newAddress.provincia || "Selecciona una provincia"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((provincia) => (
                    <SelectItem key={provincia} value={provincia}>
                      {provincia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.provincia && (
                <p className="text-sm text-red-500 col-span-3">
                  {errors.provincia}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal"
                value={newAddress.codigoPostal}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    codigoPostal: e.target.value,
                  })
                }
                className="col-span-2 h-8"
                placeholder="Ej: 1000"
              />
              {errors.codigoPostal && (
                <p className="text-sm text-red-500 col-span-3">
                  {errors.codigoPostal}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 items-start gap-4">
              <Label htmlFor="referencias">Referencias</Label>
              <textarea
                id="referencias"
                value={newAddress.referencias || ""}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    referencias: e.target.value,
                  })
                }
                className="col-span-2 h-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Cerca de la plaza (opcional)"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Guardando..." : "Guardar Dirección"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
