import * as React from "react"
import {
  ShoppingCart,
  HeartPulse,
  Car,
  Brush,
  Home,
  Percent,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Button from "../layout/Button"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import Link from "next/link"


const Hero = () => {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()
  const categories = [
    {
      id: 1,
      name: "Electrónica",
      icon: ShoppingCart,
      href: "/productos/categoria/electronica",
    },
    {
      id: 2,
      name: "Bienestar",
      icon: HeartPulse,
      href: "/productos/categoria/bienestar",
    },
    {
      id: 3,
      name: "Automotor",
      icon: Car,
      href: "/productos/categoria/automotor",
    },
    {
      id: 4,
      name: "Arte y Librería",
      icon: Brush,
      href: "/productos/categoria/arte-y-libreria",
    },
    {
      id: 5,
      name: "Electrodomésticos",
      icon: Home,
      href: "/productos/categoria/electrodomesticos",
    },
    { id: 6, name: "Ofertas", icon: Percent, href: "/productos/ofertas" },
  ]

  const scrollToNextSection = () => {
    const discountBanner = document.getElementById("discount-banner")
    if (discountBanner) {
      const offset = 40
      const targetPosition =
        discountBanner.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }
  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-160px)] flex flex-col justify-between mad-md:items-start px-2 md:px-12 overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src="/hero.jpg"
        alt="Hero Background"
        fill
        className="object-cover object-[center_100%] z-0"
        priority
      />
      {/* Gradiente Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>

      <div className="relative z-10 flex flex-col md:flex-row h-full justify-between">
        <div className="flex flex-col gap-8 mt-6 md:mt-10 py-8 px-4 max-md:w-full">
          <h1 className="text-4xl font-bold text-white">
            Bienvenido a Red X Mayor
          </h1>
          <p className="text-md md:text-lg text-gray-200 md:max-w-[500px] max-w-[250px]">
            Accede a un amplio catálogo de productos al por mayor con precios
            exclusivos para minoristas y negocios. Conectamos a proveedores con
            compradores ofreciendo una experiencia de compra eficiente, segura y
            con las mejores condiciones del mercado.
          </p>
          <div className="flex gap-4 max-md:flex-col">
            {!isLoggedIn && <Button label="Registrate" href="/signup" />}
            {isLoggedIn && (
              <Button label="Explorar Productos" href="/productos" />
            )}
            {isLoggedIn && (
              <Button
                label="Promos Especiales"
                href="/productos/ofertas"
                aria-label="Redireccionar a promos"
                isOutline
              />
            )}
          </div>
        </div>
        <div className="flex self-start py-8 mt-6 justify-between items-center mb-6 md:mb-10">
          {/* Logo */}
          <Image
            src="/red-mayor-logo-white.svg"
            alt="Logo"
            width={200}
            height={75}
            className="w-[100px] md:w-[180px] max-md:hidden"
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20 px-6 max-md:hidden">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group flex flex-col cursor-pointer items-center justify-center w-40 h-40 md:w-44 md:h-44 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-xl transition-all duration-300 transform hover:bg-white/20 hover:scale-110"
          >
            <div className="w-14 h-14 flex items-center justify-center text-gray-200 transition-all duration-300">
              <category.icon className="w-14 h-14" />
            </div>
            <p className="mt-3 text-md font-semibold text-gray-200 text-center leading-tight group-hover:scale-105 transition-all duration-300">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-1 md:bottom-5 left-1/2 transform -translate-x-1/2 text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
        aria-label="Scrollear a homepage"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  )
}

export default Hero
