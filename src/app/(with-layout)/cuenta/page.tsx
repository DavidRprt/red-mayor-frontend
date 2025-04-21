"use client"

import { useEffect, useState } from "react"
import { AddAddressPopover } from "@/components/checkout/addAddressPopover"
import { Button } from "@/components/ui/button"

const Page = () => {
  const [userDetails, setUserDetails] = useState<any>(null)
  const [selectedAddressAction, setSelectedAddressAction] = useState<
    number | null
  >(null)
  const [error, setError] = useState<string | null>(null)

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/api/get-user-details", {
        method: "GET",
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || "Error al obtener los datos del usuario.")
        return
      }

      const rawData = await response.json()
      const userData = rawData?.data?.data

      if (!userData) {
        throw new Error("La estructura de datos no es válida")
      }

      const transformedUserDetails = {
        type: userData.tipoUsuario || "",
        cuit: userData.CUIT || "",
        email: userData.email || "",
        phone: userData.telefono || "",
        razonSocial: userData.razonSocial || "",
        username: userData.username || "",
        addresses: Array.isArray(userData.direcciones)
          ? userData.direcciones.map((direccion: any) => ({
              id: direccion.id || 0,
              direccion: direccion.direccion || "",
              ciudad: direccion.ciudad || "",
              provincia: direccion.provincia || "",
              codigoPostal: direccion.codigoPostal || "",
              referencias: direccion.referencias || null,
            }))
          : [],
      }

      setUserDetails(transformedUserDetails)
      if (transformedUserDetails.addresses.length > 0) {
        setSelectedAddressAction(
          transformedUserDetails.addresses[
            transformedUserDetails.addresses.length - 1
          ].id
        )
      }
    } catch (err) {
      console.error("Error al obtener los detalles del usuario:", err)
      setError("Error al procesar la solicitud.")
    }
  }

  useEffect(() => {
    fetchUserDetails() 
  }, [])

  return (
    <div className="sm:px-24 py-6">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
        Detalles del Usuario
      </h1>

      {error && (
        <div className="text-red-500 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {!error && userDetails ? (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700">
            Tipo de Usuario:{" "}
            <span className="font-normal">{userDetails.type}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            CUIT: <span className="font-normal">{userDetails.cuit}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Email: <span className="font-normal">{userDetails.email}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Teléfono: <span className="font-normal">{userDetails.phone}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Razón Social:{" "}
            <span className="font-normal">{userDetails.razonSocial}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Username:{" "}
            <span className="font-normal">{userDetails.username}</span>
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Direcciones</h2>
            {userDetails.addresses.length > 0 ? (
              <ul className="divide-y divide-gray-200 mt-4">
                {userDetails.addresses.map((address: any) => (
                  <li key={address.id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">
                          {address.direccion}, {address.ciudad},{" "}
                          {address.provincia}
                        </p>
                        <p className="text-sm text-gray-500">
                          CP: {address.codigoPostal}
                        </p>
                        <p className="text-sm text-gray-500">
                          Referencias: {address.referencias || "N/A"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-red-500">
                No se encontraron direcciones.
              </p>
            )}
          </div>

          <div className="mt-6">
            <AddAddressPopover />
          </div>
        </div>
      ) : (
        !error && (
          <p className="mt-6 text-gray-600">Cargando datos del usuario...</p>
        )
      )}
    </div>
  )
}

export default Page