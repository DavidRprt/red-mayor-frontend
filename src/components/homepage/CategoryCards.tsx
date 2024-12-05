import Link from "next/link"
import Image from "next/image"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

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
]

const CategoryCards = () => {
  return (
    <section className="w-full py-4 sm:py-8 sm:px-24 flex items-center flex-col md:items-start">
      <h3 className="px-6 text-3xl sm:pb-2">Nuestras marcas</h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full mt-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categoria/${category.attributes.slug}`}
            className="relative py-36 px-6 max-w-xs mx-auto overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 shadow-lg border border-gray-300 hover:border-gray-500"
          >
            <div className="relative w-full flex items-center justify-center">
              <Image
                src={category.attributes.image}
                alt={category.attributes.name}
                width={270}
                height={300}
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
