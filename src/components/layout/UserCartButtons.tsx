"use client"

import { useRouter } from "next/navigation"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/hooks/useCart"

const UserCartButtons = () => {
  const router = useRouter()
  const { totalItems } = useCart() 

  return (
    <div className="flex flex-row w-full items-center justify-center sm:gap-4">
      {/* Botón de Cuenta */}
      <div
        className="relative group cursor-pointer"
        onClick={() => router.push("/cuenta")}
      >
        <div className="p-2 rounded-full transition-colors group-hover:bg-gray-200">
          <User size={24} className="text-white group-hover:text-black" />
        </div>
      </div>

      {/* Botón del Carrito */}
      <div
        className="relative group cursor-pointer"
        onClick={() => router.push("/carrito")}
      >
        <div className="p-2 rounded-full transition-colors group-hover:bg-gray-200">
          <ShoppingCart
            size={24}
            className="text-white group-hover:text-black"
          />
        </div>
        {totalItems > 0 && ( // Mostrar solo si hay ítems en el carrito
          <span className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full px-2 text-[10px] font-medium shadow-md">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  )
}

export default UserCartButtons
