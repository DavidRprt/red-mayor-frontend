import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: 1,
    attributes: {
      name: "Energizer",
      slug: "energizer",
      image: "/images/Energizer-logo.jpg",
    },
  },
  {
    id: 2,
    attributes: {
      name: "Contigo",
      slug: "contigo",
      image: "/images/contigo-logo.png",
    },
  },
  {
    id: 3,
    attributes: {
      name: "Sharpie",
      slug: "sharpie",
      image: "/images/sharpie-logo.svg.png",
    },
  },
  {
    id: 4,
    attributes: {
      name: "Elmer's",
      slug: "elmers",
      image: "/images/brand-logo.png",
    },
  },
  {
    id: 5,
    attributes: {
      name: "Paper-Mate",
      slug: "paper-mate",
      image: "/images/paper-mate6125.logowik.com.jpg",
    },
  },
]

const CategoryCards = () => {
  return (
    <section className="w-full py-4 sm:py-8 sm:px-24 flex items-center flex-col md:items-start">
      <h3 className="px-6 text-3xl sm:pb-2">Nuestras marcas</h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full mt-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/productos/categoria/${category.attributes.slug}`}
            className="flex items-center justify-center w-[400px] h-[170px] bg-white mx-auto overflow-hidden rounded-lg transform transition duration-300 hover:scale-105 shadow-lg border border-gray-300 hover:border-gray-500"
          >
            <div className="relative w-[300px] h-[140px]">
              <Image
                src={category.attributes.image}
                alt={category.attributes.name}
                fill
                sizes="(max-width: 768px) 100vw, 
                       (max-width: 1200px) 50vw, 
                       33vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryCards
