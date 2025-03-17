import { ResponseType } from "@/types/response"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import SkeletonSchema from "../SkeletonSchema"
import { useGetHomepageItems } from "@/services/useGetHomepageProducts"
import ProductCard from "../products/ProductCard"
import { ProductType } from "@/types/product"

const HomepageProducts = () => {
  const { result, loading }: ResponseType = useGetHomepageItems()

  return (
    <section className="w-full py-6 sm:py-10 sm:px-24 flex flex-col items-center md:items-start">
      {/* Título estilizado */}
      <h3 className="px-6 text-3xl font-bold text-gray-900 sm:pb-4">
        Productos Destacados
      </h3>

      {/* Contenedor del carrusel */}
      <Carousel className="w-full px-6 mt-5">
        <CarouselContent className="md:-ml-4">
          {/* Skeleton mientras carga */}
          <div className="hidden md:flex gap-4 animate-pulse">
            {loading && <SkeletonSchema grid={4} />}
          </div>
          <div className="block md:hidden w-full animate-pulse">
            {loading && <SkeletonSchema grid={1} />}
          </div>

          {/* Renderización de productos */}
          {Array.isArray(result) && result.length > 0
            ? result.map((product: ProductType) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/4 w-full "
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))
            : !loading && (
                <p className="text-gray-600 text-lg mt-6">
                  No hay productos disponibles.
                </p>
              )}
        </CarouselContent>

        {/* Botones de navegación visibles en pantallas grandes */}
        <div className="hidden md:flex gap-4 mt-4 justify-center">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  )
}

export default HomepageProducts
