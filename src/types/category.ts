export type CategoryType = {
  id: number // ID de la categoría
  nombreCategoria: string // Nombre de la categoría
  slug: string // Slug único de la categoría
  proveedor?: {
    id: number // ID del proveedor relacionado
    nombre: string // Nombre del proveedor
  } | null // Puede ser null si no hay proveedor
  subcategorias?: {
    id: number // ID de la subcategoría
    slug: string // Slug de la subcategoría
    nombreSubcategoria: string // Nombre de la subcategoría
  }[] // Lista de subcategorías relacionadas
}
