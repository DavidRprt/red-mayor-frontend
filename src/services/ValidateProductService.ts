import { getStrapiURL } from "@/lib/utils"
import { CartItemType } from "@/types/cartItemType"

export async function validateAndCheckProducts(items: CartItemType[]) {
  const baseUrl = getStrapiURL()
  const url = new URL("/api/products/validate-check", baseUrl)

  // Transformar los items para incluir solo 'id' y 'quantity'
  const transformedItems = items.map((item) => ({
    id: item.product.documentId,
    quantity: item.cantidad,
  }))


  try {
  const response = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: transformedItems,
    }),
  })


    const data = await response.json()
    if (!response.ok || data.error) {
      return {
        ok: false,
        data: null,
        error: data.error || { message: "Error desconocido" },
      }
    }

    return { ok: true, data, error: null }
  } catch (error) {
    console.error("Error en el servicio:", error)
    return {
      ok: false,
      data: null,
      error: { message: "Error de conexión", details: error },
    }
  }
}
