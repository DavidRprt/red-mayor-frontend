"use client"

import { useParams } from "next/navigation"
import useGetProductBySlug from "@/api/useGetProductBySlug"
import SkeletonProduct from "@/components/SkeletonProduct"
import Image from "next/image"
import ProductDetails from "@/components/products/ProductDetails"
import { Button } from "@/components/ui/button"
import SimilarProductsCarousel from "@/components/products/SimilarProductsCarousel"

const ProductPage = () => {
  const { slug } = useParams()

  const { product, loading, error } = useGetProductBySlug(slug as string)

  if (loading) return <SkeletonProduct />
  if (error) return <p>Error: {error}</p>
  if (!product) return <p>Producto no encontrado</p>

  // Obtenemos la URL de la imagen
  const imageUrl = product.imagenes?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${product.imagenes[0].url}`
    : "/placeholder.jpg"

  // Texto alternativo para la imagen
  const altText = `Imagen de ${product.nombreProducto || "Producto"}`

  return (
    <>
      <div className="p-6 flex flex-col sm:flex-row sm:px-40 gap-8 ">
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
          <Button className="py-3 sm:my-4 sm:w-64 w-full">
            Inicie sesión para ver el precio
          </Button>
          <ProductDetails />
        </div>
      </div>
      {/* Invocación del carousel de productos similares */}
      <SimilarProductsCarousel
        subcategorySlug={product.subcategoria.slug}
        currentProductSlug={product.slug}
      />
    </>
  )
}

export default ProductPage
