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
    <section className="container mx-auto px-4 py-8">
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
