"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

interface ValidatedProduct {
  id: number
  requestedStock: number
  stockInOrder: number
  discountedPrice: number
}

interface CartItemType {
  product: {
    id: number
    nombreProducto: string
    imagenes?: { url: string }[]
  }
  cantidad: number
}

interface OrderSummaryProps {
  validatedProducts: ValidatedProduct[]
  items: CartItemType[]
  totalPrice: number
}

export const OrderSummary = ({
  validatedProducts,
  items,
  totalPrice,
}: OrderSummaryProps) => {
  return (
    <div className="col-span-2 bg-white rounded-lg shadow p-6 space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800">Tu Pedido</h2>
      <div className="divide-y divide-gray-200">
        {validatedProducts.map((product) => {
          const cartItem = items.find((item) => item.product.id === product.id)

          if (!cartItem) return null

          const { product: prodDetails } = cartItem
          const imageUrl = prodDetails.imagenes?.[0]?.url || "/placeholder.jpg"
          const stockChanged = product.requestedStock !== product.stockInOrder

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
                  Precio unitario:{" "}
                  <span className="text-base font-semibold text-gray-800">
                    {formatPrice(product.discountedPrice)}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Cantidad: {product.stockInOrder}
                </p>
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
      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Total:</h3>
        <p className="text-xl font-bold text-gray-900">
          {formatPrice(totalPrice)}
        </p>
      </div>
      <Button className="w-full ">
        Proceder al Pago
      </Button>
    </div>
  )
}
