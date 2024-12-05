import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ProductDetails = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Disponibilidad</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          tempora ea repellat porro exercitationem quam corrupti molestiae
          obcaecati nobis consequatur, maxime, fuga officiis? Esse eligendi
          accusamus beatae, iure excepturi reprehenderit?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Detalles del producto</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem itaque,
          aperiam nisi animi dolorum accusamus sit nostrum distinctio, unde
          dicta sapiente vel, similique est impedit delectus perspiciatis ex
          voluptate laudantium.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductDetails
