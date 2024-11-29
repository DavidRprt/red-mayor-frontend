import Link from "next/link"
import { buttonVariants } from "../ui/button"

const DiscountBanner = () => {
  return (
    <div className="p-5 sm:p-20 text-center">
      <h2 className="uppercase font-black text-2xl text-primary">
        Consigue 10% de descuento
      </h2>
      <h3 className="mt-3 font-semibold">
        Al comprar seleccionados productos en grandes cantidades
      </h3>
      <div className="max-w-md mx-auto flex justify-center md:gap-8 gap-3 mt-5">
        <Link href="#" className={buttonVariants()}>
          Comprar
        </Link>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>
          Más información
        </Link>
      </div>
    </div>
  )
}

export default DiscountBanner
