"use client"
import CategoryCards from "@/components/homepage/CategoryCards"
import DiscountBanner from "@/components/homepage/DiscountBanner"
import HomepageProducts from "@/components/homepage/HomepageProducts"
import Hero from "@/components/homepage/Hero"
import { ContactForm } from "@/components/homepage/ContactForm"
import WhatsAppButton from "@/components/homepage/WhatsappButton"
import VendorBanner from "@/components/homepage/VenderBanner"

export default function Home() {
  return (
    <>
      <Hero />
      <HomepageProducts />
      <DiscountBanner />
      <CategoryCards />
      <VendorBanner />
      <ContactForm />
      <WhatsAppButton />
    </>
  )
}
