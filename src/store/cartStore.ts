import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { CartItemType } from "@/types/cartItemType"

interface CartStore {
  items: CartItemType[]
  addItem: (product: CartItemType["product"], cantidad: number) => void
  updateQuantity: (id: number, cantidad: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (product, cantidad) => {
        const currentItems = get().items
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        )

        if (existingItem) {
          // Incrementar cantidad si el producto ya existe
          set({
            items: currentItems.map((item) =>
              item.product.id === product.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            ),
          })
        } else {
          // Agregar nuevo producto al carrito
          set({
            items: [...currentItems, { product, cantidad }],
          })
        }
      },
      updateQuantity: (id, cantidad) => {
        const currentItems = get().items
        set({
          items: currentItems.map((item) =>
            item.product.id === id ? { ...item, cantidad } : item
          ),
        })
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.product.id !== id),
        })
      },
      clearCart: () => {
        set({ items: [] })
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
