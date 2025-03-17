"use client"

import Link from "next/link"
import Button from "../layout/Button"

const SellWithUsBanner = () => {
  return (
    <section className="max-md:mt-10 sm:p-24 text-center px-6">
      <h2 className="uppercase font-black text-2xl text-primary">
        ¿Quieres vender en nuestra plataforma?
      </h2>
      <h3 className="mt-3 text-gray-700 md:text-lg">
        Súmate como proveedor a Red X Mayor. Déjanos tus datos y nos pondremos
        en contacto contigo a la brevedad. ¡Gracias!
      </h3>

      <div className="max-w-md mx-auto flex justify-center md:gap-8 gap-3 mt-5">
        <Button
          label="Contacto para Proveedores"
          href="/vender"
          isOutline={false}
          bgColor="bg-black"
          textColor="text-white"
          w="w-70"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Completa el formulario y nuestro equipo te contactará con más
        información.
      </p>
    </section>
  )
}

export default SellWithUsBanner
