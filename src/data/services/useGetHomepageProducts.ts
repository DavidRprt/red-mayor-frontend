import { useEffect, useState } from "react"

export function useGetHomepageItems() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[homepage][$eq]=true&populate=*`

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(url)

        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error?.message || "Error en la solicitud")
        }

        setResult(json.data || [])
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}