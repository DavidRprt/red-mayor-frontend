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
import { Tag, ShoppingCart, Package, Boxes, DollarSign } from "lucide-react"
import DiscountBadge from "./DiscountBagde"
import { Ban } from "lucide-react"

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
    imagenes = [],
    descuentoPorMayor,
    cantidadPorCaja,
    descripcionCantidad,
    marca,
  } = product

  const router = useRouter()
  const { isLoggedIn } = useAuthStore()

const imageUrl =
  Array.isArray(imagenes) && imagenes[0]?.url
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
    <Card className="sm:w-[280px] pt-2 w-full bg-white relative flex flex-col min-h-[600px] max-h-[600px] rounded-lg shadow-lg border border-gray-200">
      <div className="absolute top-2 right-3 z-10">
        {descuentoPorMayor?.activo && (
          <DiscountBadge
            porcentajeDescuento={descuentoPorMayor.porcentajeDescuento}
            cantidadMinima={descuentoPorMayor.cantidadMinima}
          />
        )}
      </div>

      <CardContent className="flex items-center justify-center">
        <Link href={`/productos/${slug}`} passHref>
          <div className="relative w-[250px] h-[250px] mt-5 bg-white flex items-center justify-center overflow-hidden border border-gray-200">
            {imageUrl === "/placeholder.jpg" ? (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Ban className="w-12 h-12 mb-2" />
                <p className="text-sm">Imagen no disponible</p>
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt={altText}
                fill
                sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 50vw, 
             33vw"
                style={{ objectFit: "contain" }}
                className="p-2"
              />
            )}
          </div>
        </Link>
      </CardContent>

      {/* Header con estructura mejorada */}
      <CardHeader className="px-4 space-y-2">
        <CardTitle className="text-gray-900 text-sm font-semibold min-h-[50px] max-h-[60px] overflow-hidden leading-tight">
          {nombreProducto}
        </CardTitle>

        {/* Subcategoría */}
        {subcategoria?.nombreSubcategoria && (
          <div className="flex items-center text-sm text-gray-600">
            <Boxes className="w-4 h-4 mr-2 text-gray-500" />
            <p className="min-h-[20px] max-h-[20px] overflow-hidden">
              {subcategoria.nombreSubcategoria}
            </p>
          </div>
        )}

        {/* Marca */}
        {marca?.nombreMarca && (
          <div className="flex items-center text-sm text-gray-600">
            <Package className="w-4 h-4 mr-2 text-gray-500" />
            <p className="min-h-[20px] max-h-[20px] overflow-hidden">
              {marca.nombreMarca}
            </p>
          </div>
        )}

        {/* Precio unitario si está logueado */}
        {isLoggedIn && cantidadPorCaja && (
          <div className=" text-sm text-gray-700 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
              <p className="min-h-[20px] max-h-[20px] overflow-hidden">
                Precio Unitario:{" "}
                <span className="text-black font-bold">${precioUnitario}</span>
              </p>
            </div>
            {descripcionCantidad && (
              <p className="text-xs text-gray-600 min-h-[30px] max-h-[30px]">
                {descripcionCantidad}
              </p>
            )}
          </div>
        )}

        {/* SKU */}
        <div className="flex items-center text-xs text-gray-500">
          <p>SKU: {slug}</p>
        </div>
      </CardHeader>

      {/* Footer con botón refinado */}
      <CardFooter className="mt-auto px-4 pb-4">
        {isLoggedIn ? (
          <AddToCart product={product} />
        ) : (
          <Button
            className="w-full bg-gray-900 text-white hover:bg-gray-700 transition-all duration-300"
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
