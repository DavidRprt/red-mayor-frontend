import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import { CategoryType } from "@/types/category"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  categories: CategoryType[]
  onFilterChange: (selectedFilters: {
    categories: number[]
    subcategories: number[]
  }) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  categories,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>(
    []
  )
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Verificar si el ancho de la ventana es de móvil
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

  const handleCategoryChange = (
    categoryId: number,
    subcategories: number[]
  ) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
      setSelectedSubcategories((prev) =>
        prev.filter((id) => !subcategories.includes(id))
      )
    } else {
      setSelectedCategories((prev) => [...prev, categoryId])
      setSelectedSubcategories((prev) => [...prev, ...subcategories])
    }
  }

  const handleSubcategoryChange = (subcategoryId: number) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories((prev) =>
        prev.filter((id) => id !== subcategoryId)
      )
    } else {
      setSelectedSubcategories((prev) => [...prev, subcategoryId])
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
  }

  const clearFiltersMobile = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
    onClose()
  }

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      subcategories: selectedSubcategories,
    })
  }, [selectedCategories, selectedSubcategories, onFilterChange])

  return (
    <div
      className={`fixed top-0 ${
        isOpen ? "right-0" : "-right-full"
      } h-full w-80 bg-white z-50 sm:z-0 shadow-lg transition-transform duration-300 ease-in-out md:static md:w-64 md:h-auto sm:rounded-md border sm:mr-6`}
    >
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <Button onClick={onClose} className="p-2" variant="outline">
            <X className="w-6 h-6" />
          </Button>
        </div>
      )}
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
        <h3 className="text-lg font-bold mb-4">Categorías</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <label className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() =>
                    handleCategoryChange(
                      category.id,
                      category.subcategorias
                        ? category.subcategorias.map((sub) => sub.id)
                        : []
                    )
                  }
                />
                <span className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category.nombreCategoria}
                </span>
              </label>
              {category.subcategorias && (
                <ul className="pl-4 py-3">
                  {category.subcategorias.map((subcategory) => (
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
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {subcategory.nombreSubcategoria}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="flex sm:hidden gap-3 w-full mx-auto py-6">
          <Button onClick={onClose} variant="default">
            Aplicar Filtros
          </Button>
          <Button onClick={clearFiltersMobile} variant="secondary">
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
