import React from "react"
import  Button  from "@/components/layout/Button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

interface NoResultsProps {
  message?: string
  buttonText?: string
  buttonHref?: string
}

const NoResults: React.FC<NoResultsProps> = ({
  message = "No hay productos disponibles para los filtros seleccionados.",
  buttonText = "Volver a la tienda",
  buttonHref = "/",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-6">
      <AlertTriangle className="w-12 h-12 text-gray-400" />
      <p className="text-lg text-gray-600 max-w-md">{message}</p>
      <Button
        href={buttonHref}
        isOutline={false}
        bgColor="bg-black"
        textColor="text-white"
        className="px-6 py-3"
        label={buttonText}
      >
      </Button>
    </div>
  )
}

export default NoResults
