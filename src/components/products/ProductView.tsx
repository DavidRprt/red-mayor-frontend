"use client"

import Image from "next/image"
import { ProductType } from "@/types/product"
import { useAuthStore } from "@/store/authStore"
import ProductDetails from "@/components/products/ProductDetails"
import AddToCart from "@/components/products/AddToCart"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductViewProps {
  product: ProductType
}

const ProductView = ({ product }: ProductViewProps) => {
  const {
    nombreProducto,
    slug,
    descripcion = "Sin descripción",
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
      ? (product.precioBase / cantidadPorCaja).toFixed(2)
      : null

  return (
    <div className="container mx-auto px-6 py-16 flex flex-col sm:flex-row items-start gap-12">
      {/* Imagen del Producto */}
      <div className="w-full sm:w-1/2">
        <Carousel className="w-full rounded-lg overflow-hidden">
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
                <div className="h-[500px] w-[500px] bg-gray-100 flex items-center justify-center">
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

          {/* Botones de navegación */}
          {imagenes.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 hover:bg-gray-800 transition-all" />
              <CarouselNext className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 hover:bg-gray-800 transition-all" />
            </>
          )}
        </Carousel>
      </div>

      {/* Información del Producto */}
      <div className="w-full sm:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-gray-900">{nombreProducto}</h1>
        <h4 className="text-lg text-gray-500">
          {subcategoria?.nombreSubcategoria}
        </h4>
        <p className="text-gray-700 text-lg">{descripcion}</p>

        {/* Precio Unitario y Detalles por Caja */}
        {isLoggedIn && cantidadPorCaja && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-600">
              <span className="font-semibold">Precio Unitario:</span> $
              {precioUnitario}
            </p>
            {descripcionCantidad && (
              <p className="text-gray-500 text-sm mt-1">
                {descripcionCantidad}
              </p>
            )}
          </div>
        )}
        <p className="text-gray-500 text-sm">SKU: {slug}</p>

        {/* Botón AddToCart */}
        {isLoggedIn ? (
          <AddToCart product={product} />
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Inicie sesión para ver el precio
          </button>
        )}

        {/* Detalles Adicionales */}
        {detalles && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Detalles del Producto
            </h2>
            <ProductDetails detalles={detalles} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductView
