import { Toast } from "@/components/ui/toast"
import { ProductType } from "@/types/product"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CartStore {
  items: ProductType[]
  addItem: (data: ProductType) => void
  removeItem: (id: number) => void
  removeAll: () => void
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
          return Toast({
            title: "El producto ya existe en el carrito.",
            variant: "destructive",
          })
        }

        set({
          items: [...get().items, data],
        })

        Toast({
          title: "Producto añadido al carrito 🎁",
        })
      },
      removeItem: (id: number) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })

        Toast({
          title: "Producto eliminado del carrito 🗑️",
        })
      },
      removeAll: () => {
        set({ items: [] })

        Toast({
          title: "Todos los productos fueron eliminados del carrito 🛒",
        })
      },
    }),
    {
      name: "cart-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
)
