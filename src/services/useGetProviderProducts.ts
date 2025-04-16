import { useEffect, useState } from "react"
import { ProductType } from "../types/product"

export function useGetProviderProducts(providerSlug: string) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (!providerSlug) return

    const fetchAllProviderProducts = async () => {
      try {
        setLoading(true)
        const allProducts: ProductType[] = []
        let page = 1
        let hasMore = true

        while (hasMore) {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[subcategoria][categoria][proveedor][slug][$eq]=${providerSlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=100`
          const res = await fetch(url)
          const json = await res.json()

          if (!res.ok) {
            throw new Error(json.error?.message || "Error en la solicitud")
          }

          allProducts.push(...(json.data || []))

          const meta = json.meta?.pagination
          hasMore = meta && meta.page < meta.pageCount
          page++
        }

        setProducts(allProducts)
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchAllProviderProducts()
  }, [providerSlug])

  return { loading, products, error }
}
