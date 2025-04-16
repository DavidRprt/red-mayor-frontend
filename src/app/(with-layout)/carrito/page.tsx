"use client"

import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"
import Button from "@/components/layout/Button"

const CartPage = () => {
  const {
    items,
    totalPrice,
    updateQuantity,
    removeItem,
    calculateDiscountedPrice,
  } = useCart()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(price)
  }

  const handleRemove = (id: number) => {
    removeItem(id)
  }

  const handleQuantityChange = (
    id: number,
    cantidad: number,
    stock: number
  ) => {
    if (cantidad > 0 && cantidad <= stock) {
      updateQuantity(id, cantidad)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8 min-h-[calc(100vh-160px)] flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Mi Orden</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow gap-2">
          <p className="text-lg text-gray-500">Tu carrito está vacío.</p>
          <Button
            label="← Volver a la tienda"
            href="/"
            isOutline={false}
            bgColor="bg-black"
            textColor="text-white"
            w="w-52"
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 flex-grow">
          {/* Lista de Productos */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const precioConDescuento = calculateDiscountedPrice(item)
              const tieneDescuento =
                precioConDescuento < item.product.precioBase

              return (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-md rounded-lg p-4 gap-4"
                >
                  {/* Imagen + info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto space-x-0 sm:space-x-4 gap-4 sm:gap-0">
                    <Image
                      src={
                        item.product.imagenes?.[0]?.url || "/placeholder.jpg"
                      }
                      alt={item.product.nombreProducto}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">
                        {item.product.nombreProducto}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.product.subcategoria?.nombreSubcategoria ||
                          "Sin categoría"}
                      </p>
                      <div className="mt-2">
                        {tieneDescuento ? (
                          <>
                            <span className="text-sm line-through text-rose-700">
                              {formatPrice(
                                item.product.precioBase * item.cantidad
                              )}
                            </span>{" "}
                            <span className="text-lg font-bold text-emerald-700">
                              {formatPrice(precioConDescuento * item.cantidad)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(
                              item.product.precioBase * item.cantidad
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Controles de cantidad + eliminar */}
                  <div className="flex flex-row items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            Math.max(item.cantidad - 1, 1),
                            item.product.stock
                          )
                        }
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300 transition-all"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product.id,
                            parseInt(e.target.value, 10),
                            item.product.stock
                          )
                        }
                        min={1}
                        max={item.product.stock}
                        className="w-12 text-center border-0 focus:ring-0 focus:outline-none appearance-none"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            Math.min(item.cantidad + 1, item.product.stock),
                            item.product.stock
                          )
                        }
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 transition-all"
                      >
                        +
                      </button>
                    </div>
                    <XCircle
                      size={24}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition-all"
                      onClick={() => handleRemove(item.product.id)}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Resumen del Pedido */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Resumen del Pedido
            </h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-gray-700">Envío:</span>
              <div className="flex flex-col items-end">
                <span className="font-medium text-gray-900">A convenir </span>
                <span className="font-medium text-xs text-gray-900">
                  *Gratis en Santa Fe y Entre Rios
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4 border-t pt-4">
              <span className="text-xl font-bold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <Button
              label="Continuar con el pedido"
              href="/checkout"
              isOutline={false}
              bgColor="bg-black"
              textColor="text-white"
              w="w-70"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
