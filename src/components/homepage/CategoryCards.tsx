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
            className="flex items-center justify-center w-full h-[170px] bg-white overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl border border-gray-200 hover:border-gray-400 group"
          >
            <div className="flex items-center justify-center w-full h-[140px] group-hover:scale-110 transition-transform duration-300">
              <Image
                src={brand.logo}
                alt={brand.nombreMarca}
                height={120}
                width={300}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="px-5 max-md:py-3 object-contain filter group-hover:brightness-110 transition-all duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryCards
