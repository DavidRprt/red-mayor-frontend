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
        <div className="p-2 rounded-full transition-all duration-300 group-hover:bg-gray-200 group-hover:scale-110">
          <User size={24} className="text-white group-hover:text-black transition-colors duration-300" />
        </div>
      </div>

      {/* Botón del Carrito */}
      <div
        className="relative group cursor-pointer"
        onClick={() => router.push("/carrito")}
      >
        <div className="p-2 rounded-full transition-all duration-300 group-hover:bg-gray-200 group-hover:scale-110">
          <ShoppingCart
            size={24}
            className="text-white group-hover:text-black transition-colors duration-300"
          />
        </div>
        {totalItems > 0 && ( // Mostrar solo si hay ítems en el carrito
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-[10px] font-bold shadow-lg animate-pulse">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  )
}

export default UserCartButtons
