"use client"
import React from "react"
import { useGetProviderProducts } from "@/services/useGetProviderProducts"
import useGetCategories from "@/services/useGetCategories"
import { useParams } from "next/navigation"
import ProductList from "@/components/products/ProductList"

const ProviderPage = () => {
  const { slug } = useParams()

  if (!slug || typeof slug !== "string") {
    return <p>Error: Parámetro inválido</p>
  }

  const { loading, products, error } = useGetProviderProducts(slug)
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategories(slug)

  return (
    <section className="flex items-center flex-col justify-center">
      <h1 className="text-3xl font-bold text-gray-900 px-8 py-6">
        Productos de{" "}
        {typeof slug === "string" && slug.length > 0
          ? slug
              .replace(/-/g, " ")
          : "Productos"}
      </h1>
      <ProductList
        products={products || []}
        loading={loading}
        error={error}
        categories={categories || []}
        categoriesLoading={categoriesLoading}
        onRetry={() => window.location.reload()}
      />
    </section>
  )
}

export default ProviderPage

