"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import Image from "next/image"
import Link from "next/link"

export default function PromoPopup() {
  const [visible, setVisible] = useState(true)
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popup_shown")
    if (alreadyShown) {
      setVisible(false)
    } else {
      sessionStorage.setItem("popup_shown", "true")
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center max-sm:px-6">
      <div className="relative bg-white w-full max-w-4xl flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden">
        {/* Botón cerrar */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-black text-2xl z-10"
        >
          &times;
        </button>

        {/* Columna derecha: logo (arriba en mobile, derecha en desktop) */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8 order-1 md:order-2">
          <Image
            src="/red-mayor-logo.svg"
            alt="Red x Mayor"
            width={500}
            height={250}
            className="object-contain max-w-full h-auto"
            priority
          />
        </div>

        {/* Columna izquierda: texto */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          {isLoggedIn ? (
            <>
              <p className="text-cyan-600 font-semibold uppercase mb-2">
                ¡Descuentos por Mayor!
              </p>
              <h2 className="text-3xl font-bold mb-4">
                Aprovechá precios exclusivos
              </h2>
              <p className="text-gray-700 mb-6">
                Cada producto tiene su propio precio mayorista. Accedé a
                descuentos especiales al comprar más unidades.
              </p>
              <Link
                href="/productos/ofertas"
                className="bg-cyan-600 text-white px-6 py-3 rounded-md text-center hover:bg-cyan-700 transition"
              >
                Ver ofertas
              </Link>
            </>
          ) : (
            <>
              <p className="font-semibold uppercase mb-2">
                <span className="text-primary">¡Bienvenido a </span>
                <span className="text-cyan-700">Red x Mayor</span>
                <span className="text-primary">!</span>
              </p>
              <h2 className="text-3xl font-bold mb-4">
                10% OFF en tu primera compra
              </h2>
              <p className="text-gray-700 mb-6">
                Registrate y usá el código <strong>FIRST10</strong> en tu compra
                inicial.
              </p>
              <Link
                href="/signup"
                className="bg-cyan-600 text-white px-6 py-3 rounded-md text-center hover:bg-cyan-700 transition"
              >
                Registrate ahora
              </Link>
              <p className="text-xs text-gray-500 mt-4">
                *Aplican términos y condiciones
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
