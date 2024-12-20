import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductDetailsProps {
  detalles?: string | null
}

const ProductDetails = ({ detalles }: ProductDetailsProps) => {
  const formattedDetails = detalles
    ? detalles.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))
    : "No hay detalles disponibles para este producto."

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Disponibilidad</AccordionTrigger>
        <AccordionContent>En stock y listo para enviar.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Detalles del producto</AccordionTrigger>
        <AccordionContent>{formattedDetails}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductDetails
