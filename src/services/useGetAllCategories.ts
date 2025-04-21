import { useState, useEffect } from "react"
import { CategoryType } from "../types/category"

export function useGetAllCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories?populate[subcategorias][populate]=*`

      try {
        setLoading(true)
        const res = await fetch(url)
        const json = await res.json()



        if (!res.ok) {
          console.error("❌ Error status in response:", res.status)
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        if (!Array.isArray(json.data)) {
          console.warn("⚠️ 'data' is not an array:", json.data)
        }

        const categories: CategoryType[] = json.data.map((item: any) => {
          const subcategorias =
            item.subcategorias?.map((sub: any) => ({
              id: sub.id,
              slug: sub.slug,
              nombreSubcategoria: sub.nombreSubcategoria,
            })) || []

          return {
            id: item.id,
            nombreCategoria: item.nombreCategoria,
            slug: item.slug,
            proveedor: item.proveedor
              ? {
                  id: item.proveedor.id,
                  nombre: item.proveedor.nombre,
                }
              : null,
            subcategorias,
          }
        })

        setCategories(categories)
      } catch (err: any) {
        console.error("🚨 Exception caught while fetching categories:", err)
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
