import React, { useState, useEffect, useCallback } from "react"
import SkeletonSchema from "@/components/SkeletonSchema"
import ProductCard from "@/components/products/ProductCard"
import FilterSidebar from "@/components/products/FilterSidebar"
import FilterBox from "@/components/products/FilterBox"
import { Button } from "@/components/ui/button"
import NoResults from "./NoResults"
import Head from "next/head"
import { SlidersHorizontal, Search } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductType } from "@/types/product"
import { CategoryType } from "@/types/category"
import { useParams } from "next/navigation"

interface ProductListProps {
  products: ProductType[]
  loading: boolean
  error: string | null
  categories: CategoryType[]
  categoriesLoading: boolean
  onRetry: () => void
}

const ITEMS_PER_PAGE = 12

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  categories,
  categoriesLoading,
  onRetry,
}) => {
  const [sortValue, setSortValue] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<{
    subcategories: number[]
    brands: string[]
  }>({
    subcategories: [],
    brands: [],
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { slug } = useParams()

  const totalPages = Math.ceil(visibleProducts.length / ITEMS_PER_PAGE)
  const getPaginationRange = (current: number, total: number) => {
    const delta = 1
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []
let l: number | null = null

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === 2 ||
        i === total ||
        i === total - 1 ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (Number(i) - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (Number(i) - l > 2) {
          rangeWithDots.push("…")
        }
      }
      rangeWithDots.push(i)
      l = Number(i)
    }

    return rangeWithDots
  }

  const handleFilterChange = useCallback(
    (selectedFilters: { subcategories: number[]; brands: string[] }) => {
      setFilters(selectedFilters)
      setCurrentPage(1)
    },
    []
  )

  const sortProducts = useCallback(
    (productsToSort: ProductType[], sortKey: string): ProductType[] => {
      if (!productsToSort) return []

      switch (sortKey) {
        case "cheapest":
          return [...productsToSort].sort((a, b) => a.precioBase - b.precioBase)
        case "most_expensive":
          return [...productsToSort].sort((a, b) => b.precioBase - a.precioBase)
        case "newest":
          return [...productsToSort].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case "oldest":
          return [...productsToSort].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        default:
          return productsToSort
      }
    },
    []
  )

  useEffect(() => {
    if (!loading && products) {
      const filtered = products.filter((product) => {
        const matchesSubcategory =
          filters.subcategories.length === 0 ||
          filters.subcategories.includes(product.subcategoria?.id || 0)

        const matchesSearchTerm = product.nombreProducto
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

        const matchesBrand =
          filters.brands.length === 0 ||
          (product.marca && filters.brands.includes(product.marca.slug))

        return matchesSubcategory && matchesSearchTerm && matchesBrand
      })

      setVisibleProducts(sortProducts(filtered, sortValue))
    }
  }, [filters, products, loading, sortValue, sortProducts, searchTerm])

  const paginatedProducts = visibleProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const productStructuredData = paginatedProducts.map((product) => ({
    "@type": "Product",
    name: product.nombreProducto,
    image: product.imagenes?.[0]?.url || "",
    description: product.descripcion || "Sin descripción",
    sku: product.id.toString(),
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.precioBase.toFixed(2),
      availability: product.stock > 0 ? "InStock" : "OutOfStock",
    },
  }))

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: productStructuredData.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: product,
    })),
    numberOfItems: paginatedProducts.length,
    numberOfPages: totalPages,
    currentPage: currentPage,
  }

  return (
    <div className="w-screen px-8 pb-6">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageStructuredData),
          }}
        />
      </Head>
      <div className="justify-between items-center hidden sm:flex py-4">
        <div className="flex items-center gap-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-96 border border-gray-300 px-3 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500" />
          </div>
        </div>

        <FilterBox onSortChange={setSortValue} />
      </div>
      <div className="flex flex-col w-full items-start justify-start mb-4 border-b pb-2 gap-4 sm:hidden">
        <div className="flex flex-row items-start justify-start gap-2 w-full">
          <FilterBox onSortChange={setSortValue} />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSidebarOpen(true)}
          >
            <SlidersHorizontal /> Filtrar
          </Button>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full border border-gray-300 px-3 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="flex">
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
          onFilterChange={handleFilterChange}
          products={products}
        />
        <div className="flex-1 ">
          <div className="flex flex-wrap justify-between gap-4">
            {loading && <SkeletonSchema grid={12} />}

            {!loading &&
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            {!loading && paginatedProducts.length === 0 && (
              <div className="flex items-center justify-center w-full">
                <NoResults />
              </div>
            )}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {getPaginationRange(currentPage, totalPages).map(
                  (page, index) => (
                    <PaginationItem key={index}>
                      {page === "..." ? (
                        <span className="px-2 text-gray-400">...</span>
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={() => handlePageChange(Number(page))}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
