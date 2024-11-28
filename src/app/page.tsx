"use client"

import CarouselBanner from "@/components/homepage/CarouselBanner"
import HomepageProducts from "@/components/homepage/HomepageProducts"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <CarouselBanner />
      <HomepageProducts />
    </>
  )
}
