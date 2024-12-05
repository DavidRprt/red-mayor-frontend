"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useGetProviderProducts } from "@/api/useGetProviderProducts"
import useGetCategories from "@/api/useGetCategories"
import ProductCard from "@/components/products/ProductCard"
import { useParams } from "next/navigation"
import SkeletonSchema from "@/components/SkeletonSchema"
import FilterSidebar from "@/components/products/FilterSidebar"
import FilterBox from "@/components/products/FilterBox"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { ProductType } from "@/types/product"

const ProviderPage = () => {
  const { slug } = useParams()
  const [sortValue, setSortValue] = useState("")

  if (!slug || typeof slug !== "string") {
    return <p>Error: Parámetro inválido</p>
  }

  const { loading, products, error } = useGetProviderProducts(slug)
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategories(slug)
  console.log(products)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<{
    categories: number[]
    subcategories: number[]
  }>({
    categories: [],
    subcategories: [],
  })

  const [visibleProducts, setVisibleProducts] = useState(products || [])

  // Callback para manejar cambios en los filtros
  const handleFilterChange = useCallback(
    (selectedFilters: { categories: number[]; subcategories: number[] }) => {
      setFilters(selectedFilters)
    },
    []
  )

  const sortProducts = useCallback(
    (productsToSort: ProductType[], sortKey: string): ProductType[] => {
      if (!productsToSort) return []

      switch (sortKey) {
        case "cheapest":
          return [...productsToSort].sort((a, b) => a.precioBase - b.precioBase)
        case "most_expensive":
          return [...productsToSort].sort((a, b) => b.precioBase - a.precioBase)
        case "newest":
          return [...productsToSort].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case "oldest":
          return [...productsToSort].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        default:
          return productsToSort
      }
    },
    []
  )

  // Filtrar productos cuando los filtros o los productos cambian
  useEffect(() => {
    if (!loading && products) {
      const filtered = products.filter((product) => {
        const matchesSubcategory =
          filters.subcategories.length === 0 ||
          filters.subcategories.includes(product.subcategoria.id)
        return matchesSubcategory
      })
      setVisibleProducts(sortProducts(filtered, sortValue))
    }
  }, [filters, products, loading, sortValue, sortProducts])

  const skeletonCount = loading ? 4 : products?.length || 0

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="justify-between items-center hidden sm:flex">
        <h1 className="text-2xl font-bold mb-4 pt-5">
          Productos de {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h1>
        <FilterBox onSortChange={setSortValue} />
      </div>

      <div className="flex items-center justify-between mb-4 border-b pb-2 gap-2 pt-3 sm:hidden">
        <h1 className="text-2xl font-bold">
          {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h1>
        <FilterBox onSortChange={setSortValue} />
        <Button
          variant="outline"
          className="w-[80px]"
          onClick={() => setIsSidebarOpen(true)}
        >
          <SlidersHorizontal /> Filtrar
        </Button>
      </div>
      <div className="flex">
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
        <div className="flex-1">
          <div className="flex flex-wrap justify-between gap-4">
            {loading && <SkeletonSchema grid={skeletonCount} />}
            {!loading && error && (
              <p className="w-full text-center">
                Error al cargar productos: {error}
              </p>
            )}
            {!loading &&
              visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            {!loading && visibleProducts.length === 0 && (
              <p className="w-full text-center">
                No hay productos disponibles para los filtros seleccionados.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProviderPage
