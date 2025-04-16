import { useState, useEffect } from "react"

const DEBUG = true

export const useGetAllProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts: any[] = []
        let page = 1
        let hasMore = true

        while (hasMore) {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=100`
          const res = await fetch(url)
          const json = await res.json()

          if (!res.ok) {
            throw new Error(json.error?.message || "Error en la solicitud")
          }

          const data = json.data || []
          allProducts.push(...data)

          const meta = json.meta?.pagination
          if (!meta || meta.page >= meta.pageCount) {
            hasMore = false
          } else {
            page++
          }
        }

        if (DEBUG) {
          const activos = allProducts.filter((p) => p.activo === true)
          const inactivos = allProducts.filter((p) => p.activo !== true)
          const activosSinFotos = activos.filter(
            (p) => !Array.isArray(p.imagenes) || p.imagenes.length === 0
          )
          const inactivosConFotos = inactivos.filter(
            (p) => Array.isArray(p.imagenes) && p.imagenes.length > 0
          )
          const conPrecioCeroONull = allProducts.filter(
            (p) => !p.precioBase || p.precioBase === 0
          )
          const conStockCero = allProducts.filter((p) => p.stock === 0)
          const conStockNull = allProducts.filter(
            (p) => p.stock === null || p.stock === undefined
          )
          const otrosCamposNull = allProducts.filter((p) => {
            const ignorar = [
              "slug",
              "publishedAt",
              "id",
              "homepage",
              "createdAt",
              "descuentoPorMayor",
              "descripcion",
              "descripcionCantidad",
              "detalles",
              "cantidadPorCaja",
            ]
            return Object.entries(p).some(
              ([key, value]) => !ignorar.includes(key) && value === null
            )
          })

          console.log({
            total: allProducts.length,
            activos: activos.length,
            inactivos: inactivos.length,
            activosSinFotos: activosSinFotos.length,
            inactivosConFotos: inactivosConFotos.length,
            conPrecioCeroONull: conPrecioCeroONull.length,
            conStockCero: conStockCero.length,
            conStockNull: conStockNull.length,
            conOtrosCamposNull: otrosCamposNull.length,
          })
        }

        setProducts(allProducts)
      } catch (error: any) {
        console.error("Error al obtener los productos:", error)
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, [])

  return { products, loading, error }
}
