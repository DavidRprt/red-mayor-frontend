"use client"

import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AddAddressPopover } from "@/components/checkout/addAddressPopover"

// Schema de validación para la nueva dirección
const NewAddressSchema = z.object({
  direccion: z.string().min(1, "La dirección es obligatoria"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  provincia: z.string().min(1, "La provincia es obligatoria"),
  codigoPostal: z.string().min(4, "El código postal es obligatorio"),
  referencias: z.string().optional(),
})

type NewAddress = z.infer<typeof NewAddressSchema>

interface Address {
  id: number
  direccion: string
  ciudad: string
  provincia: string
  codigoPostal: string
  referencias?: string
}

interface BillingDetailsProps {
  user: {
    type: string
    cuit: string
    email: string
    phone: string
    razonSocial: string
    username: string
  }
  addresses: Address[]
}

export const BillingDetails = ({ user, addresses }: BillingDetailsProps) => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)

  // Función para filtrar direcciones duplicadas
  const filterUniqueAddresses = (addresses: Address[]) => {
    const seen = new Set()
    return addresses.filter((address) => {
      const key = `${address.direccion}-${address.ciudad}-${
        address.provincia
      }-${address.codigoPostal}-${address.referencias || ""}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  // Filtra las direcciones al inicio
  const uniqueAddresses = filterUniqueAddresses(addresses)

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    const match = cleaned.match(/^(\+?54)?(\d{3})(\d{4})(\d{4})$/)
    if (match) {
      return `+54 (${match[2]}) ${match[3]}-${match[4]}`
    }
    return phone
  }

  // Selecciona automáticamente la última dirección única si hay direcciones disponibles
  useEffect(() => {
    if (uniqueAddresses.length > 0) {
      setSelectedAddress(uniqueAddresses[uniqueAddresses.length - 1].id)
    }
  }, [uniqueAddresses])

  return (
    <div className="col-span-1 bg-gray-50 rounded-lg shadow p-6 space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800">
        Detalles de Facturación
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">
            Nombre del Negocio
          </label>
          <Input
            value={user.username}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 border-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Razón Social</label>
          <Input
            value={user.razonSocial}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 border-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Tipo de Factura</label>
          <Input
            value={user.type}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 border-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">CUIT</label>
          <Input
            value={user.cuit}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 border-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">
            Correo Electrónico
          </label>
          <Input
            value={user.email}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 border-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Teléfono</label>
          <Input
            value={formatPhoneNumber(user.phone)}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-default focus:outline-none focus:ring-0 border-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Direcciones</h3>
        {uniqueAddresses.length > 0 && (
          <Select
            onValueChange={(value) => setSelectedAddress(Number(value))}
            value={selectedAddress ? String(selectedAddress) : undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una dirección" />
            </SelectTrigger>
            <SelectContent>
              {uniqueAddresses.map((address) => (
                <SelectItem key={address.id} value={String(address.id)}>
                  {address.direccion}, {address.ciudad}, {address.provincia}, CP{" "}
                  {address.codigoPostal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="mt-4">
          <AddAddressPopover />
        </div>
      </div>
    </div>
  )
}
