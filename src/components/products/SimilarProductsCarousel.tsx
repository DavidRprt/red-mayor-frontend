import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import SkeletonSchema from "../SkeletonSchema"
import { useGetProductsBySubcategory } from "@/services/useGetProductsBySubcategory"
import ProductCard from "../products/ProductCard"
import { ProductType } from "@/types/product"

interface ProductsBySubcategoryProps {
  subcategorySlug: string
  currentProductSlug: string
}

const SimilarProductsCarousel = ({
  subcategorySlug,
  currentProductSlug,
}: ProductsBySubcategoryProps) => {
  const { products, loading, error } =
    useGetProductsBySubcategory(subcategorySlug)

  // Filtrar productos para excluir el producto actual
  const filteredProducts = products.filter(
    (product) => product.slug !== currentProductSlug
  )

  // Si no hay productos similares y no está cargando, no renderizar el componente
  if (!loading && filteredProducts.length === 0) {
    return null
  }

  return (
    <div className="w-full py-4 sm:py-8 sm:px-40 flex items-center flex-col md:items-start">
      <h3 className="px-6 text-3xl sm:pb-2">Productos similares</h3>
      <Carousel className="w-full px-6 mt-3">
        <CarouselContent className="md:-ml-4">
          {/* Skeleton mientras carga */}
          <div className="hidden md:flex gap-3">
            {loading && <SkeletonSchema grid={4} />}
          </div>
          <div className="block md:hidden w-full">
            {loading && <SkeletonSchema grid={1} />}
          </div>

          {/* Renderización de productos */}
          {filteredProducts.map((product: ProductType) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 group w-full"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

export default SimilarProductsCarousel
