"use client"

import { useCartStore } from "@/store/cartStore"
import { useEffect, useState } from "react"
import { validateAndCheckProducts } from "@/services/ValidateProductService"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { BillingDetails } from "@/components/checkout/BillingDetails"
import { OrderSummary } from "@/components/checkout/OrderSummary"

interface Address {
  id: number
  direccion: string
  ciudad: string
  provincia: string
  codigoPostal: string
  referencias?: string
}

const CheckoutPage = () => {
  const { items } = useCartStore()
  const [validatedProducts, setValidatedProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [userDetails, setUserDetails] = useState<{
    type: string
    cuit: string
    email: string
    phone: string
    razonSocial: string
    username: string
    addresses: Address[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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
    console.log("Datos crudos del backend:", rawData.data.data)

    // Accede al objeto dentro de data
    const userData = rawData?.data.data

    if (!userData) {
      throw new Error("La estructura de datos no es válida")
    }

    // Transformar los datos del usuario
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

    console.log("Detalles transformados del usuario:", transformedUserDetails)

    setUserDetails(transformedUserDetails)
  } catch (err) {
    console.error("Error al obtener los detalles del usuario:", err)
    setError("Error al procesar la solicitud.")
  }
}



  const fetchValidation = async () => {
    if (!items || items.length === 0) {
      setLoading(false)
      return
    }

    try {
      const response = await validateAndCheckProducts(items)

      if (!response.ok) {
        setError(
          response.error?.message || "Error desconocido al validar productos."
        )
        return
      }

      const { validatedProducts, totalDiscountedPrice } = response.data
      setValidatedProducts(validatedProducts)
      setTotalPrice(totalDiscountedPrice)
    } catch (err) {
      console.error("Error al validar productos:", err)
      setError("Error al procesar la solicitud.")
    }
  }

  useEffect(() => {
    const initializePage = async () => {
      setLoading(true)
      await fetchUserDetails()
      await fetchValidation()
      setLoading(false)
    }

    initializePage()
  }, [items])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-gray-500 text-lg font-semibold">
          Tu carrito está vacío.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Volver a la tienda
        </button>
      </div>
    )
  }

  const defaultUser = {
    type: "",
    cuit: "",
    email: "",
    phone: "",
    razonSocial: "",
    username: "",
    addresses: [],
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-10">
      <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
      <div className="flex flex-col sm:flex-row w-full justify-between gap-10">
        <BillingDetails
          user={userDetails || defaultUser}
          addresses={userDetails?.addresses || []}
        />
        <OrderSummary
          validatedProducts={validatedProducts}
          items={items}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  )
}

export default CheckoutPage
