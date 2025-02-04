"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { useAuthStore } from "@/store/authStore"

const DiscountBanner = () => {
  const { isLoggedIn } = useAuthStore()

  return (
    <section className="p-5 sm:p-20 text-center">
      {isLoggedIn ? (
        <>
          <h2 className="uppercase font-black text-2xl text-primary">
            Consigue 10% de descuento
          </h2>
          <h3 className="mt-3 font-semibold">
            Al comprar productos seleccionados en grandes cantidades
          </h3>
          <div className="max-w-md mx-auto flex justify-center md:gap-8 gap-3 mt-5">
            <Link href="/productos" className={buttonVariants()}>
              Comprar
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className="uppercase font-black text-2xl text-primary">
            Descuentos exclusivos al registrarte
          </h2>
          <h3 className="mt-3 font-semibold">
            Únete ahora y disfruta de ofertas especiales en tus compras
          </h3>
          <div className="max-w-md mx-auto flex justify-center mt-5">
            <Link href="/signup" className={buttonVariants()}>
              Registrate
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export default DiscountBanner
