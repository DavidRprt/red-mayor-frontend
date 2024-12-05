import { useState, useEffect } from "react"
import { ProductType } from "../types/product" 

export function useGetProductBySlug(productSlug: string) {
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[slug][$eq]=${productSlug}&populate=*`

      try {
        setLoading(true)
        const res = await fetch(url)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        if (json.data?.length > 0) {
          setProduct(json.data[0]) 
        } else {
          setProduct(null)
        }
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    if (productSlug) {
      fetchProduct()
    }
  }, [productSlug])

  return { product, loading, error }
}

export default useGetProductBySlug
