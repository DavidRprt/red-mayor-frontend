"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"

const VendorBanner = () => {
  return (
    <section className="p-5 sm:p-20 text-center">
      <h2 className="uppercase font-black text-2xl text-primary">
        Expande tu negocio con nosotros
      </h2>
      <h3 className="mt-3 font-semibold">
        Vende tus productos al por mayor en nuestra plataforma y llega a más
        clientes
      </h3>
      <div className="max-w-md mx-auto flex justify-center md:gap-8 gap-3 mt-5">
        <Link href="/vender" className={buttonVariants()}>
          Empezar a vender
        </Link>
      </div>
    </section>
  )
}

export default VendorBanner
