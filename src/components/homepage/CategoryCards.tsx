import Link from "next/link"
import Image from "next/image"
import { LOCAL_BRANDS } from "@/constants/brands"

const CategoryCards = () => {
  return (
    <section className="w-full py-6 sm:py-10 sm:px-24 flex flex-col items-center md:items-start">
      <h3 className="px-6 text-3xl font-bold text-gray-900 sm:pb-4">
        Nuestras Marcas
      </h3>

      <div className="grid gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 w-full mt-3">
        {LOCAL_BRANDS.map((brand) => (
          <Link
            key={brand.slug}
            href={`/productos/marca/${brand.slug}`}
            className="flex items-center justify-center w-full h-[170px] bg-white overflow-hidden rounded-lg transform transition duration-300 hover:scale-105 shadow-lg border border-gray-300 hover:border-gray-500"
          >
            <div className="flex items-center justify-center w-full h-[140px]">
              <Image
                src={brand.logo}
                alt={brand.nombreMarca}
                height={120}
                width={300}
                className="px-5 max-md:py-3 object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryCards
