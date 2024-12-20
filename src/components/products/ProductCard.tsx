"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { ProductType } from "@/types/product"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    nombreProducto,
    slug,
    descripcion = "Sin descripción",
    precioBase,
    subcategoria,
    imagenes,
    descuentoPorMayor,
    cantidadPorCaja,
    descripcionCantidad,
  } = product

  const router = useRouter()
  const { isLoggedIn } = useAuthStore()

  const imageUrl = imagenes?.[0]?.url
    ? imagenes[0].url.startsWith("http")
      ? imagenes[0].url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${imagenes[0].url}`
    : "/placeholder.jpg"

  const altText = `Imagen de ${nombreProducto}`

  // Cálculo del precio unitario si estamos logueados y hay cantidad por caja
  const precioUnitario =
    isLoggedIn && cantidadPorCaja
      ? (precioBase / cantidadPorCaja).toFixed(2)
      : null

  return (
    <Card className="sm:w-[280px] pt-3 w-full bg-white relative">
      {/* Descuento en la esquina superior */}
      {descuentoPorMayor?.activo && (
        <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold text-center">
          <div>{descuentoPorMayor.porcentajeDescuento}% OFF</div>
          <div className="text-[10px] font-normal mt-0.5">
            Desde {descuentoPorMayor.cantidadMinima} unidades
          </div>
        </div>
      )}

      <CardContent>
        <Link href={`/producto/${slug}`} passHref>
          <Image
            src={imageUrl}
            alt={altText}
            width={300}
            height={300}
            className="rounded-lg cursor-pointer"
          />
        </Link>
      </CardContent>

      <CardHeader>
        <CardTitle>{nombreProducto}</CardTitle>
        <p className="text-sm text-gray-700">
          {subcategoria?.nombreSubcategoria}
        </p>

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
      </CardHeader>

      <CardFooter>
        {isLoggedIn ? (
          <Button className="w-full">
            ${precioBase} <ShoppingCart className="mr-2" />
          </Button>
        ) : (
          <Button className="w-full" onClick={() => router.push("/signin")}>
            Inicie sesión para ver el precio
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
