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

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center border rounded-lg">
        <button
          onClick={decrementQuantity}
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300 transition-all"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={product.stock}
          className="w-12 text-center border-0 focus:ring-0 focus:outline-none"
        />
        <button
          onClick={incrementQuantity}
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 transition-all"
        >
          +
        </button>
      </div>
      <Button onClick={handleAddToCart} className="flex-1">
        {formatPrice(product.precioBase)} <ShoppingCart className="ml-2" />
      </Button>
    </div>
  )
}

export default AddToCart
