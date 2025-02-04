"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { formatPrice } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cartStore"
import { Textarea } from "@/components/ui/textarea"
import { CouponInput } from "./CouponInput"

interface ValidatedProduct {
  id: string
  documentId: string
  requestedStock: number
  stockInOrder: number
  discountedPrice: number
  basePrice: number
}

interface CartItemType {
  product: {
    id: number
    documentId: string
    nombreProducto: string
    imagenes?: { url: string }[]
  }
  cantidad: number
}
interface OrderSummaryProps {
  validatedProducts: ValidatedProduct[]
  items: CartItemType[]
  totalPrice: number
  selectedAddress: number | null
  observaciones?: string
  appliedCoupon?: string 
}
export const OrderSummary = ({
  validatedProducts,
  items,
  totalPrice,
  selectedAddress,
}: OrderSummaryProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [observaciones, setObservaciones] = useState<string>("")
  const [discountPercentage, setDiscountPercentage] = useState<number>(0)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleApplyDiscount = (percentage: number, couponCode: string) => {
    setDiscountPercentage(percentage)
    setAppliedCoupon(couponCode)
    // Aplicar descuento solo a productos sin descuento
    validatedProducts.forEach((product) => {
      if (product.discountedPrice === product.basePrice) {
        product.discountedPrice = product.basePrice * (1 - percentage / 100)
      }
    })
  }

  const handleCheckout = async () => {
    if (!selectedAddress || !paymentMethod) {
      setError("Por favor selecciona una dirección y un método de pago.")
      return
    }

    const orderSummary = {
      metodoPago: paymentMethod,
      direccion: selectedAddress,
      productos: validatedProducts.map((product) => ({
        id: product.id,
        cantidad: product.stockInOrder,
      })),
      observaciones: observaciones,
      cupon: appliedCoupon,
    }

    console.log(orderSummary)
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/ordenes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderSummary),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error al enviar la orden:", errorData)
        setError(errorData.error || "Error al enviar la orden.")
        return
      }
      useCartStore.getState().clearCart()
      console.log("Orden creada con éxito")
      setError(null)

      // Redirigir a la página de compra exitosa
      router.push("/compra-exitosa")
    } catch (error) {
      console.error("Error durante la solicitud:", error)
      setError("Error durante la solicitud.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="col-span-2 bg-white rounded-lg shadow p-6 space-y-2 w-full">
      <h2 className="text-xl font-semibold text-gray-800">Tu Pedido</h2>
      <div className="divide-y divide-gray-200">
        {validatedProducts.map((product) => {
          const cartItem = items.find(
            (item) => item.product.documentId === product.documentId
          )

          if (!cartItem) {
            return null
          }

          const { product: prodDetails } = cartItem
          const imageUrl = prodDetails.imagenes?.[0]?.url || "/placeholder.jpg"

          const stockChanged = product.requestedStock !== product.stockInOrder
          const hasDiscount = product.discountedPrice < product.basePrice

          return (
            <div key={product.id} className="flex items-center py-4 space-x-6">
              <Image
                src={imageUrl}
                alt={prodDetails.nombreProducto}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {prodDetails.nombreProducto}
                </h3>
                <p className="text-sm text-gray-500">
                  Precio:{" "}
                  {hasDiscount ? (
                    <>
                      <span className="text-sm line-through text-red-400">
                        {formatPrice(product.basePrice)}
                      </span>{" "}
                      <span className="text-base font-semibold text-green-600">
                        {formatPrice(product.discountedPrice)}
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-semibold text-gray-800">
                      {formatPrice(product.basePrice)}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  Cantidad: {product.stockInOrder}
                </p>
                {hasDiscount && (
                  <p className="text-sm text-green-500 mt-1">
                    * Este producto tiene descuento aplicado.
                  </p>
                )}
                {stockChanged && (
                  <p className="text-sm text-red-500 mt-1">
                    * El stock fue ajustado por disponibilidad.
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="space-y-1 py-1">
        <h3 className="text-md font-semibold text-gray-800">Método de Pago</h3>
        <div className="">
          <div className="flex flex-row gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="transferencia"
                checked={paymentMethod === "Transferencia"}
                onCheckedChange={() => setPaymentMethod("Transferencia")}
              />
              <label htmlFor="transferencia" className="text-gray-700">
                Transferencia
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="Convenir"
                checked={paymentMethod === "Convenir"}
                onCheckedChange={() => setPaymentMethod("Convenir")}
              />
              <label htmlFor="Convenir" className="text-gray-700">
                A convenir
              </label>
            </div>
          </div>

          <div className="space-y-1 py-2">
            <h3 className="text-md font-semibold text-gray-800">
              Observaciones
            </h3>
            <Textarea
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
      </div>
      <CouponInput
        onApplyAction={(percentage, code) =>
          handleApplyDiscount(percentage, code)
        }
        disabled={!!appliedCoupon}
      />
      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Total:</h3>
        <p className="text-xl font-bold text-gray-900">
          {formatPrice(totalPrice)}
        </p>
      </div>

      <Button
        className="w-full"
        onClick={handleCheckout}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Procesando..." : "Finalizar pedido"}
      </Button>
    </div>
  )
}
