import { useEffect, useState } from "react"
import { ProductType } from "../types/product"

export function useGetProductsBySubcategory(subcategorySlug: string) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const allProducts: ProductType[] = []
        let page = 1
        let hasMore = true

        while (hasMore) {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[subcategoria][slug][$eq]=${subcategorySlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=100`
          const res = await fetch(url)
          const json = await res.json()

          if (!res.ok) {
            throw new Error(json.error?.message || "Error en la solicitud")
          }

          const data = json.data || []
          allProducts.push(...data)

          const meta = json.meta?.pagination
          hasMore = meta && meta.page < meta.pageCount
          page++
        }

        setProducts(allProducts.filter((p) => p.activo === true))
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    if (subcategorySlug) {
      fetchProducts()
    }
  }, [subcategorySlug])

  return { products, loading, error }
}
