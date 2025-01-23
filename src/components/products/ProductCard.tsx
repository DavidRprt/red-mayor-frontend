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
import AddToCart from "./AddToCart"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

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
    <Card className="sm:w-[280px] pt-3 w-full bg-white relative flex flex-col min-h-[550px] max-h-[550px]">
      {/* Descuento en la esquina superior */}
      {descuentoPorMayor?.activo && (
        <div className="absolute z-10 top-3 right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold text-center">
          <div>{descuentoPorMayor.porcentajeDescuento}% OFF</div>
          <div className="text-[10px] font-normal mt-0.5">
            Desde {descuentoPorMayor.cantidadMinima} unidades
          </div>
        </div>
      )}

      <CardContent className=" flex items-center justify-center">
        <Link href={`/productos/${slug}`} passHref>
          <div className="relative w-[250px] h-[250px] bg-white flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={altText}
              layout="fill"
              objectFit="contain"
              className="p-2"
            />
          </div>
        </Link>
      </CardContent>

      <CardHeader>
        <CardTitle className="text-gray-900 text-sm font-semibold min-h-[50px] max-h-[60px] overflow-hidden">
          {nombreProducto}
        </CardTitle>
        <p className="text-sm text-gray-700 min-h-[20px] max-h-[20px] overflow-hidden">
          {subcategoria?.nombreSubcategoria}
        </p>

        {/* Mostrar precio unitario y descripción por cantidad si estamos logueados */}
        {isLoggedIn && cantidadPorCaja && (
          <div>
            <p className="text-xs text-gray-700">
              PRECIO UNITARIO: ${precioUnitario}
            </p>
            {descripcionCantidad && (
              <p className="text-xs text-gray-700 min-h-[30px] max-h-[30px]">
                {descripcionCantidad}
              </p>
            )}
          </div>
        )}
        <p className="text-sm text-gray-700">SKU: {slug}</p>
      </CardHeader>

      <CardFooter >
        {isLoggedIn ? (
          <AddToCart product={product} />
        ) : (
          <Button
            className="w-full mt-auto"
            onClick={() => router.push("/signin")}
          >
            Inicie sesión para ver el precio
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
