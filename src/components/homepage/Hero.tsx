import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Hero = () => {
  const images = ["BANNER1.png", "BANNER2.png"] 

  return (
    <div className="w-full py-4 sm:py-8 sm:px-24 flex items-center ">
      <Carousel className="w-full px-6">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div>
                  <div className="flex items-center justify-center p-6 h-96">
                    <Image
                      src={`/images/${image}`}
                      alt={`Image ${index + 1}`}
                      width={1920}
                      height={700} 
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Hero
