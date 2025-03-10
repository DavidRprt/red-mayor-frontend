import { useEffect, useState } from "react"
import { ProductType } from "../types/product"

export function useGetProductsBySubcategory(subcategorySlug: string) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  // Construcción del endpoint con filtro por subcategoría
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[subcategoria][slug][$eq]=${subcategorySlug}&populate=*`

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(url)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        // Asignar productos obtenidos de la respuesta
        setProducts(json.data || [])
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    if (subcategorySlug) {
      fetchProducts()
    }
  }, [subcategorySlug, url])

  return { products, loading, error }
}

export default useGetProductsBySubcategory
