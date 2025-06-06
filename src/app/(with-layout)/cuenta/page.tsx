"use client"

import { useEffect, useState } from "react"
import { AddAddressPopover } from "@/components/checkout/addAddressPopover"

type OrdenProducto = {
  id: number
  cantidad: number
  precioUnidad: number
  precioConDescuento: number
  producto: string 
  orden: {
    id: number
    estado: string
    metodoPago: string
    observaciones?: string
  }
  productoDetails?: {
    nombre: string
    imagen?: string
    [key: string]: any
  }
}

const Page = () => {
  const [userDetails, setUserDetails] = useState<any>(null)
  const [ordenProductos, setOrdenProductos] = useState<OrdenProducto[]>([])
  const [loadingOrdenes, setLoadingOrdenes] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserDetails()
  }, [])

  useEffect(() => {
    if (userDetails?.documentId) {
      fetchOrdenProductos(userDetails.documentId)
    }
  }, [userDetails])

  const fetchUserDetails = async () => {
    try {
      const res = await fetch("/api/get-user-details")
      const json = await res.json()
      const userData = json?.data?.data
      console.log(userData, "USER")

      if (!userData) throw new Error("Estructura inválida")

      const transformed = {
        documentId: userData.documentId,
        type: userData.tipoUsuario || "",
        cuit: userData.CUIT || "",
        email: userData.email || "",
        phone: userData.telefono || "",
        razonSocial: userData.razonSocial || "",
        username: userData.username || "",
        addresses: Array.isArray(userData.direcciones)
          ? userData.direcciones.map((d: any) => ({
              id: d.id || 0,
              direccion: d.direccion || "",
              ciudad: d.ciudad || "",
              provincia: d.provincia || "",
              codigoPostal: d.codigoPostal || "",
              referencias: d.referencias || null,
            }))
          : [],
      }

      setUserDetails(transformed)

    } catch (err) {
      console.error("Error usuario:", err)
      setError("Error al obtener datos del usuario")
    }
  }

  const fetchOrdenProductos = async (userDocumentId: string) => {
    try {
      const resOrden = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orden-productos?populate=orden.user&filters[orden][user][documentId][$eq]=${userDocumentId}&pagination[pageSize]=100`
      )
      const ordenJson = await resOrden.json()
      const ordenesArray = ordenJson.data || []
      console.log(ordenesArray)

      let allProductos: any[] = []
      let page = 1
      let totalPages = 1

      do {
        const resProd = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?pagination[pageSize]=100&pagination[page]=${page}`
        )
        const productosJson = await resProd.json()

        if (page === 1) {
          const total = productosJson.meta?.pagination?.total || 0
          const pageSize = productosJson.meta?.pagination?.pageSize || 100
          totalPages = Math.ceil(total / pageSize)
        }

        allProductos = allProductos.concat(productosJson.data || [])
        page++
      } while (page <= totalPages)

      const productosMap = new Map<string, any>()
      for (const p of allProductos) {
        const docId = p.documentId
        if (!docId) continue

        productosMap.set(docId, {
          nombre: p.nombreProducto || "Producto sin nombre",
          imagen:
            p.imagenes?.[0]?.url ??
            p.imagenes?.[0]?.formats?.thumbnail?.url ??
            null,
          ...p,
        })
      }

      const enriched = ordenesArray.map((item: any) => {
        const productoDetails = productosMap.get(item.producto)

        if (!productoDetails) {
          console.warn(
            "❌ Producto no encontrado en productosMap:",
            item.producto
          )
        } else {
        }

        return {
          ...item,
          productoDetails,
        }
      })

      setOrdenProductos(enriched)
    } catch (err) {
      console.error("❗ Error al obtener las órdenes:", err)
    } finally {
      setLoadingOrdenes(false)
    }
  }

  const ordenesAgrupadas = ordenProductos.reduce((acc, item) => {
    const ordenId = item.orden?.id
    if (!ordenId) return acc

    if (!acc[ordenId]) {
      acc[ordenId] = {
        ...item.orden,
        productos: [],
      }
    }

    acc[ordenId].productos.push(item)
    return acc
  }, {} as Record<number, any>)

  const ordenes = Object.values(ordenesAgrupadas)

  console.log("📦 Órdenes agrupadas completas:", ordenes)
  

  return (
    <div className="w-full px-4 py-8 min-h-[600px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Detalles del Usuario
      </h1>

      {error && (
        <div className="text-red-600 mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {!error && !userDetails ? (
        <div className="flex flex-col items-center justify-center mt-12 space-y-4">
          <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Cargando datos del usuario...</p>
        </div>
      ) : (
        userDetails && (
          <div className="mt-6 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Tipo de Usuario</p>
                <p>{userDetails.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CUIT</p>
                <p>{userDetails.cuit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p>{userDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p>{userDetails.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Razón Social</p>
                <p>{userDetails.razonSocial}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p>{userDetails.username}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Direcciones
              </h2>
              {userDetails.addresses.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userDetails.addresses.map((address: any) => (
                    <li
                      key={address.id}
                      className="p-4 border rounded bg-gray-50"
                    >
                      <p className="font-medium">
                        {address.direccion}, {address.ciudad},{" "}
                        {address.provincia}
                      </p>
                      <p className="text-sm text-gray-600">
                        CP: {address.codigoPostal}
                      </p>
                      <p className="text-sm text-gray-600">
                        Referencias: {address.referencias || "N/A"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-red-500">No se encontraron direcciones.</p>
              )}
            </div>

            <div className="mt-8">
              <AddAddressPopover />
            </div>
          </div>
        )
      )}

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Órdenes</h2>

        {loadingOrdenes ? (
          <p className="text-gray-600">Cargando órdenes...</p>
        ) : ordenes.length === 0 ? (
          <p className="text-gray-600">No tenés órdenes registradas.</p>
        ) : (
          <div className="space-y-10">
            {ordenes.map((orden: any) => {
              const totalOrden = orden.productos.reduce(
                (acc: number, op: OrdenProducto) =>
                  acc + op.precioConDescuento * op.cantidad,
                0
              )

              return (
                <div key={orden.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="mb-4 space-y-1">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-800">
                        Orden #{orden.id}
                      </span>{" "}
                      – Estado:{" "}
                      <span className="font-medium">{orden.estado}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Fecha:{" "}
                      {orden.createdAt
                        ? new Date(orden.createdAt).toLocaleDateString()
                        : "Sin fecha"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Método de pago: {orden.metodoPago}
                    </p>
                    {orden.observaciones && (
                      <p className="text-sm text-gray-500">
                        Observaciones: {orden.observaciones}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-gray-800 pt-2">
                      Total de la orden:{" "}
                      {totalOrden.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Producto
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Cantidad
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Precio
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {orden.productos.map((op: OrdenProducto) => (
                          <tr key={op.id}>
                            <td className="px-4 py-3 flex items-center gap-3">
                              {op.productoDetails?.imagen && (
                                <img
                                  src={op.productoDetails.imagen}
                                  alt={op.productoDetails.nombre}
                                  className="w-12 h-12 object-cover rounded border"
                                />
                              )}
                              <span className="text-sm font-medium text-gray-800">
                                {op.productoDetails?.nombre ||
                                  "Producto desconocido"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {op.cantidad}
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-700">
                              {(
                                op.precioConDescuento * op.cantidad
                              ).toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
