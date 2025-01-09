"use client"

import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-background dark text-foreground py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo y descripción */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Red X Mayor</h2>
            <p className="text-sm text-muted-foreground">
              Tu mejor opción en productos por mayor
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link
              href="/quienes-somos"
              className="text-muted-foreground hover:text-primary"
            >
              Quiénes Somos
            </Link>
            <Link
              href="/contacto"
              className="text-muted-foreground hover:text-primary"
            >
              Contáctanos
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="text-muted-foreground hover:text-primary"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>

        {/* Derechos reservados */}
        <div className="mt-4 text-center text-muted-foreground text-sm">
          &copy; 2024 Red X Mayor. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
