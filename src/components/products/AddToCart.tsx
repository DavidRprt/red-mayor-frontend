"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { ProductType } from "@/types/product"

interface AddToCartProps {
  product: ProductType
}

const AddToCart = ({ product }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  // Formatear precios
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(price)
  }

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addItem(product, quantity)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0 && value <= product.stock) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const isOutOfStock =
    product.stock === 0 || product.stock === null || product.stock === undefined

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={decrementQuantity}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-l-lg hover:bg-gray-200 transition-all duration-200 font-medium"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={product.stock}
          className="w-12 text-center border-0 focus:ring-0 focus:outline-none font-medium bg-white"
        />
        <button
          onClick={incrementQuantity}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-r-lg hover:bg-gray-200 transition-all duration-200 font-medium"
        >
          +
        </button>
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`flex-1 transition-all duration-300 shadow-md hover:shadow-lg ${
          isOutOfStock 
            ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
        }`}
      >
        {isOutOfStock ? (
          "No disponible"
        ) : (
          <div className="flex items-center justify-center gap-2">
            {formatPrice(product.precioBase)} <ShoppingCart className="ml-2" />
          </div>
        )}
      </Button>
    </div>
  )
}

export default AddToCart
