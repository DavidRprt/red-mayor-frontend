"use client"

import { useParams } from "next/navigation"
import { useGetProductsByBrand } from "@/services/useGetProductsByBrand"
import ProductList from "@/components/products/ProductList"
import Image from "next/image"
import { featuredBrands } from "@/constants"

const BrandProductsPage = () => {

  const { slug } = useParams()
  const { products, loading, error } = useGetProductsByBrand(slug as string)
  const currentBrand = featuredBrands.find((brand) => brand.slug === slug)
  const backgroundImage = currentBrand?.image || null

  return (
    <section className="flex items-center flex-col justify-center">
      {/* Banner para marcas destacadas */}
      <div
        className={`relative w-full ${
          backgroundImage
            ? "h-[250px] md:h-[550px] mb-8 flex flex-col items-start justify-start py-8 px-14"
            : "mb-6"
        }`}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {/* Overlay Oscuro */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/50"></div>
        )}

        {/* Contenido */}
        {currentBrand && (
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              {`Productos de ${currentBrand.title}`}
            </h1>
            <p className="text-lg text-white mt-2 max-w-2xl">
              {currentBrand.description}
            </p>
          </div>
        )}

        {!currentBrand && (
          <h1 className="text-3xl font-bold text-gray-900 px-8 py-6">
            {`Productos de ${
              typeof slug === "string" && slug.length > 0
                ? slug.charAt(0).toUpperCase() + slug.slice(1)
                : "Productos"
            }`}
          </h1>
        )}
      </div>

      {/* Lista de productos */}
      <ProductList
        products={products || []}
        loading={loading}
        error={error}
        categories={[]}
        categoriesLoading={false}
        onRetry={() => window.location.reload()}
      />
    </section>
  )
}

export default BrandProductsPage

