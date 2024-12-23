import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/cartStore"
import { ProductType } from "@/types/product"

export const useCart = () => {
  const { toast } = useToast()
  const { items, addItem, updateQuantity, removeItem, clearCart } =
    useCartStore()

  const handleAddItem = (product: ProductType, cantidad: number) => {
    addItem(product, cantidad)
    toast({
      title: "Producto añadido",
      description: `${product.nombreProducto} ha sido añadido al carrito.`,
    })
  }

  // Calcular el precio con descuento por producto
  const calculateDiscountedPrice = (item: (typeof items)[number]) => {
    const { descuentoPorMayor, precioBase } = item.product

    if (
      descuentoPorMayor?.activo &&
      item.cantidad >= descuentoPorMayor.cantidadMinima
    ) {
      const descuento =
        precioBase * (descuentoPorMayor.porcentajeDescuento / 100)
      return precioBase - descuento
    }

    return precioBase
  }

  // Calcular el precio total del carrito
  const totalPrice = items.reduce((sum, item) => {
    const precioConDescuento = calculateDiscountedPrice(item)
    return sum + item.cantidad * precioConDescuento
  }, 0)

  return {
    items,
    totalItems: items.reduce((sum, item) => sum + item.cantidad, 0),
    totalPrice,
    addItem: handleAddItem,
    updateQuantity,
    removeItem,
    clearCart,
    calculateDiscountedPrice, 
  }
}