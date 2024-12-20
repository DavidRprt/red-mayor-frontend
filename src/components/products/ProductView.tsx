"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductType } from "@/types/product"
import { useAuthStore } from "@/store/authStore"
import ProductDetails from "@/components/products/ProductDetails"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface ProductViewProps {
  product: ProductType
}

const ProductView = ({ product }: ProductViewProps) => {
  const {
    nombreProducto,
    slug,
    descripcion = "Sin descripción",
    precioBase,
    subcategoria,
    imagenes = [],
    cantidadPorCaja,
    descripcionCantidad,
    detalles,
  } = product

  const { isLoggedIn } = useAuthStore()
  const router = useRouter()

  // Cálculo del precio unitario
  const precioUnitario =
    isLoggedIn && cantidadPorCaja
      ? (precioBase / cantidadPorCaja).toFixed(2)
      : null

  return (
    <div className="px-6 sm:py-16 flex flex-col sm:flex-row sm:px-40 gap-8">
      <div className="w-full sm:w-[550px] px-12">
        <Carousel className="w-full">
          <CarouselContent>
            {imagenes.length > 0 ? (
              imagenes.map((imagen, index) => (
                <CarouselItem
                  key={imagen.id}
                  className="flex items-center justify-center"
                >
                  <div className="h-[500px] w-[500px] bg-white flex items-center justify-center">
                    <Image
                      src={imagen.url}
                      alt={`Imagen ${index + 1} de ${nombreProducto}`}
                      width={500}
                      height={500}
                      className="object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="h-[500px] w-[500px] bg-gray-50 flex items-center justify-center">
                  <Image
                    src="/placeholder.jpg"
                    alt="Imagen por defecto"
                    width={500}
                    height={500}
                    className="object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>

          {/* Mostrar los botones solo si hay más de una imagen */}
          {imagenes.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </div>

      <div className="sm:py-6 flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-bold">{nombreProducto}</h1>
        <h4 className="text-gray-600">{subcategoria?.nombreSubcategoria}</h4>
        <p className="text-gray-700">{descripcion}</p>

        {/* Mostrar precio unitario y descripción por cantidad si estamos logueados */}
        {isLoggedIn && cantidadPorCaja && (
          <div>
            <p className="text-sm text-gray-700">
              Precio Unitario: ${precioUnitario}
            </p>
            {descripcionCantidad && (
              <p className="text-sm text-gray-700">{descripcionCantidad}</p>
            )}
          </div>
        )}
        <p className="text-sm text-gray-700">SKU: {slug}</p>

        {isLoggedIn ? (
          <Button className="py-3 sm:my-4 sm:w-64 w-full">
            ${precioBase} <ShoppingCart className="ml-2" />
          </Button>
        ) : (
          <Button
            className="py-3 sm:my-4 sm:w-64 w-full"
            onClick={() => router.push("/signin")}
          >
            Inicie sesión para ver el precio
          </Button>
        )}

        {/* Componente de detalles del producto */}
        <ProductDetails detalles={detalles} />
      </div>
    </div>
  )
}

export default ProductView
