"use client"

import PromoPopup from "@/components/homepage/PromoPopup"
import CategoryCards from "@/components/homepage/CategoryCards"
import DiscountBanner from "@/components/homepage/DiscountBanner"
import HomepageProducts from "@/components/homepage/HomepageProducts"
import Hero from "@/components/homepage/Hero"
import { ContactForm } from "@/components/homepage/ContactForm"
import WhatsAppButton from "@/components/homepage/WhatsappButton"
import SellWithUsBanner from "@/components/homepage/SellWithUsBanner"

export default function Home() {
  return (
    <>
      <Hero />
      <DiscountBanner />
      <HomepageProducts />
      <CategoryCards />
      <SellWithUsBanner />
      <ContactForm />
      <WhatsAppButton />
      <PromoPopup />
    </>
  )
}
