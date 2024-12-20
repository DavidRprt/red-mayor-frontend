export type ProductType = {
  id: number // ID del producto
  documentId: string // ID del documento asociado al producto
  nombreProducto: string // Nombre del producto
  slug: string // Slug del producto
  descripcion?: string | null // Descripción del producto (opcional o null)
  stock: number // Stock disponible
  precioBase: number // Precio base del producto
  cantidadPorCaja?: number | null // Cantidad por caja (opcional o null)
  descripcionCantidad?: string | null // Descripción de la cantidad por caja (opcional o null)
  detalles?: string | null // Detalles adicionales del producto (opcional o null)
  activo: boolean // Si el producto está activo
  homepage: boolean // Si aparece en la homepage
  createdAt: string // Fecha de creación del producto
  updatedAt: string // Fecha de última actualización
  publishedAt?: string // Fecha de publicación (opcional)

  imagenes?: {
    id: number // ID de la imagen
    url: string // URL de la imagen
    name?: string // Nombre de la imagen (opcional)
    width?: number // Ancho de la imagen (opcional)
    height?: number // Alto de la imagen (opcional)
    formats?: {
      small?: {
        url: string // URL de la imagen pequeña
        width: number // Ancho de la imagen pequeña
        height: number // Alto de la imagen pequeña
      }
      medium?: {
        url: string // URL de la imagen mediana
        width: number // Ancho de la imagen mediana
        height: number // Alto de la imagen mediana
      }
      thumbnail?: {
        url: string // URL del thumbnail
        width: number // Ancho del thumbnail
        height: number // Alto del thumbnail
      }
    } | null // Formatos de imagen disponibles (opcional o null)
  }[] // Arreglo de imágenes (opcional)

  descuentoPorMayor?: {
    cantidadMinima: number // Cantidad mínima para aplicar el descuento
    porcentajeDescuento: number // Porcentaje del descuento
    activo: boolean // Si el descuento está activo
  } | null // Descuento por mayor (opcional o null)

  subcategoria: {
    id: number // ID de la subcategoría
    documentId?: string // ID del documento de la subcategoría (opcional)
    slug: string // Slug de la subcategoría
    nombreSubcategoria: string // Nombre de la subcategoría
    createdAt?: string // Fecha de creación de la subcategoría (opcional)
    updatedAt?: string // Fecha de última actualización de la subcategoría (opcional)
    publishedAt?: string // Fecha de publicación de la subcategoría (opcional)
  } | null // Subcategoría del producto (opcional o null)
}
