import * as React from "react"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="w-full py-4 sm:py-8 sm:px-24 flex items-center justify-center">
      {/* Imagen para escritorio */}
      <div className="hidden md:block w-full">
        <Image
          src="/images/BANNER.png"
          alt="Banner de escritorio"
          width={1920}
          height={700}
          priority
          className="w-full object-cover"
        />
      </div>

      {/* Imagen para móvil */}
      <div className="block md:hidden w-full px-8">
        <Image
          src="/images/BANNERMOBILE.png"
          alt="Banner de móvil"
          width={750}
          height={1200}
          priority
          className="w-full object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
