"use client"

import React from "react"
import { useGetProviderProducts } from "@/api/useGetProviderProducts"
import ProductCard from "@/components/products/ProductCard"
import { useParams } from "next/navigation"
import SkeletonSchema from "@/components/ScheletonSchema"
import FilterBox from "@/components/products/FilterBox"

// Función para capitalizar la primera letra
const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1)

const ProviderPage = () => {
  const { slug } = useParams()

  // Validación del parámetro slug
  if (!slug || typeof slug !== "string") {
    return <p>Error: Parámetro inválido</p>
  }

  const { loading, products, error } = useGetProviderProducts(slug)

  // Número de skeletons a mostrar
  const skeletonCount = loading ? 4 : products.length

  return (
    <div className="container mx-auto px-4">
      {/* Encabezado */}
      <div className="flex justify-between items-center py-5">
        <h1 className="text-2xl font-bold mb-4">
          Productos de {capitalizeFirstLetter(slug)}
        </h1>
        <FilterBox />
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Skeletons mientras carga */}
        {loading && <SkeletonSchema grid={skeletonCount} />}

        {/* Productos o mensaje de error */}
        {!loading && error && <p>Error al cargar productos: {error}</p>}
        {!loading &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        {!loading && products.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default ProviderPage
