"use client"

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { Card, CardContent } from "../ui/card"
import Autoplay from "embla-carousel-autoplay"

export const dataCarousel = [
  {
    id: "1",
    title: "Envíos a Todo el País",
    description: "Llevamos tus pedidos hasta donde estés, rápido y seguro.",
  },
  {
    id: "2",
    title: "Descuentos por Mayor",
    description: "Compra por cantidad y obtén precios especiales.",
  },
  {
    id: "3",
    title: "Calidad Garantizada",
    description:
      "Nuestros productos están seleccionados para ofrecerte lo mejor.",
  },
  {
    id: "4",
    title: "Atención Personalizada",
    description:
      "Te asesoramos para que encuentres lo que necesitas al mejor precio.",
  },
]

const CarouselBanner = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:bg-primary md:h-[80px] flex items-center shadow-inner">
      <Carousel
        className="w-full max-w-4xl mx-auto"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {dataCarousel.map((item) => (
            <CarouselItem key={item.id} className="px-4 py-1">
              <div>
                <Card className="shadow-none border-none bg-transparent hover:bg-white/20 transition-colors duration-300 rounded-lg">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="sm:text-lg text-wrap dark:text-secondary font-semibold">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-wrap dark:text-secondary opacity-90">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CarouselBanner
