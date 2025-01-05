import { useState, useEffect } from "react"
import { CategoryType } from "../types/category"

export function useGetAllCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories?populate=*`

      try {
        setLoading(true)
        const res = await fetch(url)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        setCategories(json.data || [])
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export default useGetAllCategories
