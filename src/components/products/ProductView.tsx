"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductType } from "@/types/product"
import { useAuthStore } from "@/store/authStore"
import ProductDetails from "@/components/products/ProductDetails"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductViewProps {
  product: ProductType
}

const ProductView = ({ product }: ProductViewProps) => {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()

  const imageUrl = product.imagenes?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.imagenes[0].url}`
    : "/placeholder.jpg"

  const altText = `Imagen de ${product.nombreProducto || "Producto"}`

  return (
    <div className="p-6 flex flex-col sm:flex-row sm:px-40 gap-8">
      <Image
        src={imageUrl}
        alt={altText}
        width={550}
        height={550}
        className="rounded-lg cursor-pointer"
        unoptimized={true}
      />
      <div className="py-6 flex flex-col gap-2 w-full">
        <h1 className="text-3xl font-bold mt-4">{product.nombreProducto}</h1>
        <h4>{product.subcategoria.nombreSubcategoria}</h4>
        <p className="text-gray-700 my-2">{product.descripcion}</p>
        {isLoggedIn ? (
          <Button className="py-3 sm:my-4 sm:w-64 w-full">
            ${product.precioBase} <ShoppingCart />
          </Button>
        ) : (
          <Button
            className="py-3 sm:my-4 sm:w-64 w-full"
            onClick={() => router.push("/signin")}
          >
            Inicie sesión para ver el precio
          </Button>
        )}
        <ProductDetails />
      </div>
    </div>
  )
}

export default ProductView
