import { useState, useEffect } from "react"

export const useGetProductsByBrand = (brandSlug?: string) => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!brandSlug) return

    const fetchProductsByBrand = async () => {
      try {
        setLoading(true)
        const allProducts: any[] = []
        let page = 1
        let hasMore = true

        while (hasMore) {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[marca][slug][$eq]=${brandSlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=100`
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
      } catch (error: any) {
        console.error("Error al obtener los productos de la marca:", error)
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchProductsByBrand()
  }, [brandSlug])

  return { products, loading, error }
}
