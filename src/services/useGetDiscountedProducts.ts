import { useState, useEffect } from "react"

export const useGetDiscountedProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[descuentoPorMayor][activo][$eq]=true&filters[activo][$eq]=true&populate=*`
        const res = await fetch(url)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        setProducts(json.data || [])
      } catch (error: any) {
        console.error("Error al obtener los productos con descuento:", error)
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useGetDiscountedProducts
