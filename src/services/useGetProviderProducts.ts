import { useEffect, useState } from "react"
import { ProductType } from "../types/product"

export function useGetProviderProducts(providerSlug: string) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[subcategoria][categoria][proveedor][slug][$eq]=${providerSlug}&populate=*&pagination[pageSize]=9999`

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(url)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        setProducts(json.data || [])
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, products, error }
}
