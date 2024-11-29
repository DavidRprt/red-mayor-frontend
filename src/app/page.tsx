"use client"

import CarouselBanner from "@/components/homepage/CarouselBanner"
import CategoryCards from "@/components/homepage/CategoryCards"
import DiscountBanner from "@/components/homepage/DiscountBanner"
import HomepageProducts from "@/components/homepage/HomepageProducts"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <CarouselBanner />
      <HomepageProducts />
      <DiscountBanner />
      <CategoryCards />
    </>
  )
}
