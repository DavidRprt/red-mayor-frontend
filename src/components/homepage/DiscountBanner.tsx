"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { useAuthStore } from "@/store/authStore"
import Button from "../layout/Button"

const DiscountBanner = () => {
  const { isLoggedIn } = useAuthStore()

  return (
    <section
      id="discount-banner"
      className="max-md:mt-10 sm:p-24 text-center px-6"
    >
      {isLoggedIn ? (
        <>
          <h2 className="uppercase font-black text-2xl text-primary">
            Consigue 10% de descuento
          </h2>
          <h3 className="mt-3 text-gray-700 md:text-lg">
            Disfruta de descuentos exclusivos en productos seleccionados al
            comprar en grandes cantidades.
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Accede a beneficios exclusivos como ofertas especiales y envíos más
            rápidos. Aprovecha esta oportunidad única.
          </p>
          <div className="max-w-md mx-auto flex justify-center md:gap-8 gap-3 mt-5">
            <Button
              label="Comprar"
              href="/productos"
              isOutline={false}
              bgColor="bg-black"
              textColor="text-white"
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="uppercase font-black text-2xl text-primary">
            Descuentos exclusivos al registrarte
          </h2>
          <h3 className="mt-3 text-gray-700 md:text-lg">
            ¡Únete hoy y accede a promociones especiales, envíos rápidos y
            descuentos exclusivos!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Regístrate gratis y comienza a disfrutar de los mejores beneficios
            para tus compras al por mayor.
          </p>
          <div className="max-w-md mx-auto flex justify-center mt-5">
            <Button
              label="Registrate"
              href="/signup"
              isOutline={false}
              bgColor="bg-black"
              textColor="text-white"
            />
          </div>
        </>
      )}
    </section>
  )
}

export default DiscountBanner
