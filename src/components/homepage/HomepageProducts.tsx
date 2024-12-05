import { ResponseType } from "@/types/response"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import SkeletonSchema from "../SkeletonSchema"
import { useGetHomepageItems } from "@/api/useGetHomepageProducts"
import ProductCard from "../products/ProductCard"
import { ProductType } from "@/types/product"

const HomepageProducts = () => {
  const { result, loading }: ResponseType = useGetHomepageItems()

  return (
    <div className="w-full py-4 sm:py-8 sm:px-24 flex items-center flex-col md:items-start">
      <h3 className="px-6 text-3xl sm:pb-2">Productos destacados</h3>
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
          {Array.isArray(result) && result.length > 0
            ? result.map((product: ProductType) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/4 group w-full"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))
            : !loading && <p>No hay productos disponibles.</p>}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

export default HomepageProducts
