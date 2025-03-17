"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import AuthButtons from "./AuthButtons"
import { menuConfig } from "@/constants" // Importa el objeto de configuración

const MenuListMobile = () => {
  const router = useRouter()

  return (
    <div className="w-full flex flex-col gap-4 bg-background text-foreground p-4">
      {/* Links de navegación - Solo categorías */}
      {menuConfig.categories.items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {item.title}
        </Link>
      ))}

      {/* Enlaces adicionales (Ofertas, Quienes Somos, Contacto) */}
      {menuConfig.otherLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {item.title}
        </Link>
      ))}

      {/* Separator */}
      <div className="border-t border-border my-4 w-full"></div>

      {/* Botones de sesión */}
      <div className="flex flex-col gap-4">
        <AuthButtons />
      </div>
    </div>
  )
}

export default MenuListMobile
