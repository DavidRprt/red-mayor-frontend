"use client"

import { useParams } from "next/navigation"
import useGetProductBySlug from "@/services/useGetProductBySlug"
import SkeletonProduct from "@/components/SkeletonProduct"
import ProductView from "@/components/products/ProductView"
import SimilarProductsCarousel from "@/components/products/SimilarProductsCarousel"

const ProductPage = () => {
  const { slug } = useParams()
  const { product, loading, error } = useGetProductBySlug(slug as string)

  if (loading) return <SkeletonProduct />
  if (error) return <p>Error: {error}</p>
  if (!product) return <p>Producto no encontrado</p>

  return (
    <>
      <ProductView product={product} />
      <SimilarProductsCarousel
        subcategorySlug={product.subcategoria.slug}
        currentProductSlug={product.slug}
      />
    </>
  )
}

export default ProductPage
