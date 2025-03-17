import { useState, useEffect } from "react"

export type BrandType = {
  id: number
  nombreMarca: string
  slug: string
}

export function useGetAllBrands() {
  const [brands, setBrands] = useState<BrandType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrands = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/marcas?populate=*`

      try {
        setLoading(true)
        const res = await fetch(url)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }
        console.log(json.data)

        setBrands(
          json.data.map((item: any) => ({
            id: item.id,
            nombreMarca: item.nombreMarca,
            slug: item.slug,
          }))
        )
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  return { brands, loading, error }
}

export default useGetAllBrands
