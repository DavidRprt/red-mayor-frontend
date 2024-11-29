export type ProductType = {
  id: number
  nombreProducto: string // Nombre del producto
  slug: string // Slug del producto
  descripcion?: string // Descripción del producto (opcional)
  stock: number // Stock disponible
  precioBase: number // Precio del producto
  imagenes?: {
    id: number // ID de la imagen
    url: string // URL de la imagen
  }[] // Arreglo de imágenes
  activo: boolean // Si el producto está activo
  homepage: boolean // Si aparece en la homepage
  subcategoria: {
    id: number // ID de la categoría
    slug: string // Slug de la categoría
    nombreSubcategoria: string // Nombre de la categoría
  }
  descuentoPorMayor?: {
    cantidadMinima: number // Cantidad mínima para aplicar el descuento
    porcentajeDescuento: number // Porcentaje del descuento
    activo: boolean // Si el descuento está activo
  } | null // Puede ser null si no hay descuento
}
