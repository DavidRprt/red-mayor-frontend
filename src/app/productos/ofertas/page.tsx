"use client"
import React from "react"
import useGetDiscountedProducts from "@/services/useGetDiscountedProducts"
import useGetAllCategories from "@/services/useGetAllCategories"
import ProductList from "@/components/products/ProductList"

const ProductsPage = () => {
  const { products, loading, error } = useGetDiscountedProducts()
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategories()

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

export default ProductsPage
