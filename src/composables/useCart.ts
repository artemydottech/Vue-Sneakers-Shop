import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface ICartItem {
  id: number
  title: string
  price: number
  imageUrl: string
}

const cart: Ref<ICartItem[]> = ref([])

export const useCart = () => {
  const addToCart = (item: ICartItem) => {
    if (!cart.value.find((cartItem) => cartItem.id === item.id)) {
      cart.value.push(item)
    }
  }

  const removeFromCart = (item: ICartItem) => {
    const index = cart.value.findIndex((cartItem) => cartItem.id === item.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  watch(
    cart,
    (newCart) => {
      localStorage.setItem('cart', JSON.stringify(newCart))
    },
    { deep: true }
  )

  return {
    cart,
    addToCart,
    removeFromCart
  }
}
