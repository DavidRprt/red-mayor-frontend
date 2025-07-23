import React from "react"
import { Tag } from "lucide-react"

interface DiscountBadgeProps {
  porcentajeDescuento: number
  cantidadMinima: number
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  porcentajeDescuento,
  cantidadMinima,
}) => {
  if (!porcentajeDescuento || cantidadMinima < 1) return null

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-bold flex items-center gap-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse">
      <Tag className="w-4 h-4" />
      <span>{porcentajeDescuento}% OFF</span>
      <span className="text-[10px] font-normal">
        Comprando {cantidadMinima} {cantidadMinima > 1 ? "cajas" : "caja"}
      </span>
    </div>
  )
}

export default DiscountBadge
