import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { CategoryType } from "@/types/category"
import { ProductType } from "@/types/product"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { LOCAL_BRANDS } from "@/constants/brands"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  categories: CategoryType[]
  products: ProductType[]
  onFilterChange: (selectedFilters: {
    subcategories: number[]
    brands: string[]
  }) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  categories,
  products,
  onFilterChange,
}) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>(
    []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const brands = LOCAL_BRANDS
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // 🔹 Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // 🔹 Ocultar el scroll del body en móvil cuando el filtro está abierto
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, isMobile])

  // 🔹 Filtrar categorías y subcategorías con productos disponibles
  const filteredCategories = categories
    .map((category) => {
      if (!category.subcategorias || category.subcategorias.length === 0) {
        return null
      }
      const filteredSubcategories = category.subcategorias.filter(
        (subcategory) => {
          const matches = products.some((product) => {
            const productSubcatId =
              typeof product.subcategoria === "object"
                ? product.subcategoria?.id
                : product.subcategoria

            return String(productSubcatId) === String(subcategory.id)
          })

     

          return matches
        }
      )

      return filteredSubcategories.length > 0
        ? { ...category, subcategorias: filteredSubcategories }
        : null
    })
    .filter(Boolean) as CategoryType[]

  // 🔹 Filtrar marcas con productos disponibles
  const availableBrands = brands.filter((brand) =>
    products.some((product) => product.marca?.slug === brand.slug)
  )
  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandSlug)
        ? prev.filter((slug) => slug !== brandSlug)
        : [...prev, brandSlug]
    )
  }

  const handleSubcategoryChange = (subcategoryId: number) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    )
  }

  const clearFilters = () => {
    setSelectedSubcategories([])
    setSelectedBrands([])
  }

  const clearFiltersMobile = () => {
    setSelectedSubcategories([])
    setSelectedBrands([])
    onClose()
  }

  useEffect(() => {
    onFilterChange({
      subcategories: selectedSubcategories,
      brands: selectedBrands,
    })
  }, [selectedSubcategories, selectedBrands, onFilterChange])

  return (
    <div
      className={`fixed top-0 ${
        isOpen ? "right-0" : "-right-full"
      } h-full w-80 bg-white z-50 sm:z-0 shadow-lg transition-transform duration-300 ease-in-out md:static md:w-64 md:h-auto sm:rounded-md border sm:mr-6`}
    >
      {/* 🔹 Header para móviles con botón de cierre */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <Button onClick={onClose} className="p-2" variant="outline">
            <X className="w-6 h-6" />
          </Button>
        </div>
      )}
      {/* 🔹 Header para escritorio con botón "Limpiar Filtros" */}
      {!isMobile && (
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button
            onClick={clearFilters}
            className="text-sm underline text-gray-600 hover:text-gray-800 bg-white"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
      <div className="p-4">
        {/* 🔹 Filtro por Subcategorías (agrupadas en Categorías) */}
        {filteredCategories.length > 0 && (
          <>
            <ul>
              {filteredCategories.map((category) => (
                <li key={category.id} className="mb-2">
                  <h4 className="text-md font-semibold text-gray-800 mb-1">
                    {category.nombreCategoria}
                  </h4>
                  <ul className="pl-4 py-1">
                    {category.subcategorias?.map((subcategory) => (
                      <li key={subcategory.id} className="py-1">
                        <label className="flex items-center space-x-2">
                          <Checkbox
                            id={`subcategory-${subcategory.id}`}
                            checked={selectedSubcategories.includes(
                              subcategory.id
                            )}
                            onCheckedChange={() =>
                              handleSubcategoryChange(subcategory.id)
                            }
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {subcategory.nombreSubcategoria}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
        {/* 🔹 Filtro por Marcas */}
        <h3 className="text-md font-semibold mb-2 mt-4">Marcas</h3>
        <ul>
          {availableBrands.map((brand) => (
            <li key={brand.slug} className="mb-2 pl-4">
              <label className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.slug}`}
                  checked={selectedBrands.includes(brand.slug)}
                  onCheckedChange={() => handleBrandChange(brand.slug)}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {brand.nombreMarca}
                </span>
              </label>
            </li>
          ))}
        </ul>
        {/* 🔹 Botones en móviles */}
        {isMobile && (
          <div className="flex sm:hidden gap-3 w-full mx-auto py-6">
            <Button onClick={onClose} variant="default">
              Aplicar Filtros
            </Button>
            <Button onClick={clearFiltersMobile} variant="secondary">
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar
