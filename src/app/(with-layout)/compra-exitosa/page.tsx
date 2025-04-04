"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const CompraExitosa = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center sm:min-h-[68vh] bg-gray-50 text-center px-6 max-h-[calc(100vh-160px)]">
      <CheckCircle className=" mb-6" size={80} />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Tu pedido se ha realizado con éxito. Te enviaremos un correo con los
        detalles de tu compra en breve.
      </p>
      <Button
        onClick={() => router.push("/")}
        className="px-6 py-3 transition duration-300"
      >
        Seguir Comprando
      </Button>
    </div>
  )
}

export default CompraExitosa
