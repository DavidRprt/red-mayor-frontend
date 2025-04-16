"use client"
import React from "react"
import { useGetAllProducts } from "@/services/useGetAllProducts"
import useGetAllCategories from "@/services/useGetAllCategories"
import ProductList from "@/components/products/ProductList"

const ProductsPage = () => {
  const { products, loading, error } = useGetAllProducts()

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategories()

  return (
    <section className="flex items-center flex-col justify-center">
      <h1 className="text-3xl font-bold text-gray-900 px-8 py-6">
        Todos los Productos
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

export default ProductsPage

