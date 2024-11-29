import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ProductType } from "@/types/product"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"

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
  } = product

  const imageUrl = imagenes?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${imagenes[0].url}`
    : "/placeholder.jpg"

  const altText = `Imagen de ${nombreProducto}`

  return (
    <Card className="sm:w-[280px] pt-3 w-full bg-white">
      <CardContent>
        <Image
          src={imageUrl}
          alt={altText}
          width={300}
          height={300}
          className="rounded-lg"
          unoptimized={true}
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{nombreProducto}</CardTitle>
        <CardDescription>{subcategoria?.nombreSubcategoria}</CardDescription>
        <p className="text-sm text-gray-500 mt-4">SKU: MTL73LE/A</p>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <ShoppingCart className="hidden"/> Inicie sesión para ver el precio
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
