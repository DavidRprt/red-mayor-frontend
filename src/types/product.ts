export type ProductType = {
  id: number // ID del producto
  nombreProducto: string // Nombre del producto
  slug: string // Slug del producto
  descripcion?: string | null // Descripción del producto (opcional o null)
  stock: number // Stock disponible
  precioBase: number // Precio del producto
  imagenes?: {
    id: number // ID de la imagen
    url: string // URL de la imagen
  }[] // Arreglo de imágenes
  activo: boolean // Si el producto está activo
  homepage: boolean // Si aparece en la homepage
  createdAt: string // Fecha de creación del producto
  updatedAt: string // Fecha de última actualización
  publishedAt?: string // Fecha de publicación (opcional)
  documentId: string // ID del documento asociado al producto
  subcategoria: {
    id: number // ID de la subcategoría
    slug: string // Slug de la subcategoría
    nombreSubcategoria: string // Nombre de la subcategoría
    createdAt?: string // Fecha de creación de la subcategoría (opcional)
    documentId?: string // ID del documento de la subcategoría (opcional)
  }
  descuentoPorMayor?: {
    cantidadMinima: number // Cantidad mínima para aplicar el descuento
    porcentajeDescuento: number // Porcentaje del descuento
    activo: boolean // Si el descuento está activo
  } | null // Puede ser null si no hay descuento
}
